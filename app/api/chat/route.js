import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

// SQL generator using OpenAI
async function generateSQL(userMessage) {
  const prompt = `
You are a PostgreSQL expert helping with a cricket database.

Generate a SELECT SQL query (PostgreSQL format) to answer the following question:
"${userMessage}"

Only use these two tables and their columns:

match_info(
  "match_id", "City", "Venue", "Match Type", "Gender", "Season", "Date", "Balls Per Over", "Teams", "Player of Match",
  "Match Number", "Event Name", "Match Referees", "Reserve Umpires", "TV Umpires", "Umpires", "Toss Winner", 
  "Toss Decision", "Winner", "Win Method", "Win By Wickets"
)

match_innings(
  "match_id", "Inning", "Over", "Ball", "Batter", "Non-striker", "Bowler", "Batter Runs", "Extras", "Total Runs",
  "Extra Types", "Wicket Type", "Player Out", "Fielders"
)

⚠️ Important: 
1. Always quote column and table names with double quotes (e.g. "Bowler", not Bowler).
2. When filtering by player names like "dhoni" or "MS Dhoni", always use: 
   \`"Player Out" ILIKE '%dhoni%'\`
3. If you are aggregating any numeric values, cast using "::int" (e.g., SUM("Batter Runs"::int))
4. Join tables via "match_id" if needed
5. Cast fields like "Over", "Ball", "Batter Runs", etc., to int before comparisons
6. If the over is 20 return as 19, as it is counted from 0 to 19 in the database.
7. Only return valid SQL. No explanations or markdown. Don’t use semicolons.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an expert SQL generator.' },
      { role: 'user', content: prompt },
    ],
  });

  let sqlQuery = response.choices[0].message.content.trim();
  return sqlQuery.replace(/```sql/g, '').replace(/```/g, '').replace(/;$/, '');
}

// HTML table formatter
function formatTable(data) {
  if (!Array.isArray(data) || data.length === 0) return '<p>No data found.</p>';

  const headers = Object.keys(data[0]);
  const headerRow = headers.map(h => `<th>${h}</th>`).join('');
  const bodyRows = data.map(row => {
    return `<tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>`;
  }).join('');

  return `
    <table border="1" cellspacing="0" cellpadding="6">
      <thead><tr>${headerRow}</tr></thead>
      <tbody>${bodyRows}</tbody>
    </table>
  `;
}

export async function POST(req) {
  const { userMessage } = await req.json();

  try {
    const greetings = ['hello', 'good morning', 'good evening', 'hey'];
    const userMessageLower = userMessage.toLowerCase();

    if (greetings.some(greeting => userMessageLower.includes(greeting))) {
      return new Response(JSON.stringify({
        assistantMessage: "Hello! Let's Talk Cricket?",
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("🔍 User Question:", userMessage);

    let sqlQuery;
    let result;
    let lastError;

    // 🔍 Try fuzzy match first
    const { data: fuzzy, error: fuzzyErr } = await supabase
      .rpc('fuzzy_match_sql', { input_question: userMessage });

    if (fuzzy && fuzzy.length > 0) {
      sqlQuery = fuzzy[0].sql;
      console.log('✅ Using fuzzy matched SQL.');
    } else {
      // 🔁 If no similar match, try exact match cache
      const { data: cached, error: cacheError } = await supabase
        .from('sql_cache')
        .select('sql')
        .eq('question', userMessage)
        .maybeSingle();

      if (cached?.sql) {
        console.log('✅ Using exact cached SQL.');
        sqlQuery = cached.sql;
      } else {
        // 🎯 Generate fresh SQL if all cache fails
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            sqlQuery = await generateSQL(userMessage);
            console.log(`🧠 Attempt ${attempt} SQL:\n`, sqlQuery);
            
            // 🔍 Check if it looks like a valid SQL SELECT query
            if (!sqlQuery.toLowerCase().startsWith('select')) {
              sqlQuery = null; // Mark it as invalid
              continue; // Try next attempt if available
            }
            
            // ✅ Save only valid SQL to cache
            await supabase.from('sql_cache').insert([{ question: userMessage, sql: sqlQuery }]);
            break;
            
          } catch (genError) {
            lastError = genError;
            console.warn(`🛑 SQL Generation failed at attempt ${attempt}:`, genError);
          }
        }
      }
    }

    if (!sqlQuery) {
      return new Response(JSON.stringify({
        assistantMessage: "Please ask a valid question.",
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    

    const { data, error } = await supabase.rpc('sql_execute', {
      query: sqlQuery,
    });

    if (error) {
      console.warn("❌ Execution Error:", error);
      return new Response(JSON.stringify({ error: "SQL execution failed.", details: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    result = data?.[0]?.result || [];
    const tableHTML = formatTable(result);

    return new Response(JSON.stringify({
      assistantMessage: result.length ? tableHTML : "No data found for your query.",
      sql: sqlQuery,
      results: result,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("🔥 Server Error:", err);
    return new Response(JSON.stringify({ error: "Unexpected server error.", details: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
