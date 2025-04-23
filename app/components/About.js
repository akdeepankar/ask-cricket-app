export default function About() {
    return (
      <main className="main-content flex justify-center items-start px-6 py-10 bg-gray-100">
        <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-5 sm:p-10 h-[72vh] overflow-y-auto space-y-8">
            <div>
              <h1 className="text-xl font-extrabold text-slate-800 mb-3">Meet the Team 👋</h1>
              <p className="text-slate-600 text-md leading-relaxed">
                We’re a bunch of students from the <strong>BS in Data Science program at IIT Madras</strong>.<br />
                After wrapping up our exams, we thought — <em>“Why not build CricketGPT over the holidays?”</em><br />
                <strong>Askcricket.ai</strong> is the result of a 4-day sprint by 3 of us. It’s far from perfect, but it’s our little experiment in learning.
              </p>
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-slate-600 shadow hover:shadow-lg transition-shadow duration-200 border border-slate-200"
                >
                  <div className="w-20 h-20 bg-gray-300 rounded-full mb-3"></div>
                  <div className="text-base font-medium">Team Member {i}</div>
                  <div className="text-sm text-slate-500">Role/Tagline</div>
                </div>
              ))}
            </div>
  
            <div>
              <p className="text-slate-600 text- lmdeading-relaxed">
                <strong>IIT Madras</strong> supported us with cloud credits through a student innovation scholarship —
                that’s how we’re keeping the GPT engine running (for now!).<br /><br />
                Feedback is always welcome — bugs, bloopers, or brilliant ideas — just hit us up.<br />
                <span className="italic">🚧 Expect flaws. We're students, not a startup (yet 😉).</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }
  