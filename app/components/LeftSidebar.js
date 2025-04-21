import React, { useState } from 'react';

const LeftSidebar = ({ suggestedQuestions, sendMessage }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <aside style={styles.sidebar}>
      {/* White Card Wrapper for the entire content */}
      <div style={styles.card}>
        <h2 style={styles.logo}>Ask Cricket</h2>
        <button style={styles.newChatBtn} onClick={() => sendMessage('')}>
          🧹 New Chat
        </button>

        <div style={styles.history}>
          <h3 style={styles.sectionHeading}>Questions You May Try</h3>
          {suggestedQuestions.map((question, idx) => (
            <button
              key={idx}
              style={{
                ...styles.sidebarQuestion,
                ...(hoveredIdx === idx && styles.sidebarQuestionHover)
              }}
              onClick={() => sendMessage(question)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '300px',
    margin: '10px', // Sidebar margin
    background: '#e5e7eb', // light gray background for sidebar
    boxShadow: 'inset -1px 0 0 #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '20px',
  },
  card: {
    backgroundColor: '#ffffff', // White background for the card wrapping all content
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // Adding spacing between elements inside the card
    margin: '10px', // This ensures 10px margin between card and sidebar
    flex: 1,           // Make each card grow equally to fill height
    display: 'flex',   // To make child content align nicely
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937'
  },
  newChatBtn: {
    backgroundImage: 'linear-gradient(to right, #3b82f6, #06b6d4)', // Blue gradient
    color: '#ffffff',
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px'
  },  
  history: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  sectionHeading: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  },
  sidebarQuestion: {
    background: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    padding: '0.6rem 1rem',
    marginBottom: '0.6rem',
    fontSize: '0.9rem',
    color: '#334155',
    cursor: 'pointer',
    transition: 'background 0.2s ease, transform 0.2s ease'
  },
  sidebarQuestionHover: {
    background: '#e2e8f0',
    transform: 'translateY(-1px)'
  }
};

export default LeftSidebar;
