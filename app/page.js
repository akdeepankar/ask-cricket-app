"use client";

import { useState, useMemo } from "react";
import ChatView from "./components/ChatView";
import About from "./components/About";
import Welcome from "./components/Welcome";

import { MessageSquare, BarChart2, Info } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("chat");

  const renderActiveComponent = useMemo(() => {
    switch (activeTab) {
      case "chat":
        return <ChatView />;
      case "stats":
        return <Welcome />;
      case "about":
        return <About />;
      default:
        return <div>Hello World</div>;
    }
  }, [activeTab]);

  const icons = {
    chat: <MessageSquare size={20} />,
    stats: <BarChart2 size={20} />,
    about: <Info size={20} />,
  };

  return (
    <div className="layout">
      <div className="content-area">
        {/* Main Content Area */}
        <main className="main-content">{renderActiveComponent}</main>

                {/* Sidebar */}
                <aside className="sidebar">
          <div className="logo-container">
            <h2 className="logo">Ask Cricket</h2>
          </div>

          <nav className="tab-nav">
            {["chat", "stats", "about"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {icons[tab]}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          <div className="disclaimer-card">
            <p className="disclaimer-text">
              ⚠️ This is a demo of Ask Cricket's chat functionalities. For real data, refer to official cricket sources.
            </p>
          </div>
        </aside>

      </div>

      {/* Floating Footer */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} This project was built by students of the
          BS in Data Science & Applications program at IIT Madras, with generous
          support from the institute. <br /> We are experimenting and may not
          always be accurate or up to date. Please don’t sue our professors or
          IIT Madras for any wrong data 😛.
        </p>
      </footer>

      <style jsx global>{`
        html, body, #__next {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          font-family: 'Inter', sans-serif;
          background: #f5f5f5;
          color: #333;
        }

        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
        }

        .content-area {
          display: flex;
          flex: 1;
          overflow: hidden;
          padding-bottom: 60px;
        }

        .sidebar {
          width: 280px;
          background: linear-gradient(145deg, #f4f5f7, #e9ecef);
          border-right: 1px solid #ddd;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          gap: 1.5rem;
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
          height: 90vh;
          overflow-y: auto;
        }

        .logo-container {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo {
          font-size: 1.75rem;
          font-weight: bold;
          color: #2b2b2b;
        }

        .tab-nav {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 500;
          color: #4a4a4a;
          transition: background 0.2s ease;
          cursor: pointer;
        }

        .tab-btn:hover {
          background-color: #dde1e7;
        }

        .tab-btn.active {
          background-color: #cdd6e0;
          color: #1f1f1f;
        }

        .disclaimer-card {
          background-color: #fff;
          padding: 1rem;
          border-radius: 10px;
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05);
          margin-top: auto;
        }

        .disclaimer-text {
          font-size: 0.875rem;
          color: #6c757d;
          text-align: center;
        }

        main.main-content {
          flex: 1;
          padding: 2rem;
          background-color: #fff;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
          animation: fadeIn 0.3s ease forwards;
          overflow-y: auto;
        }

        .footer {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100%;
          padding: 1rem 2rem;
          background-color: #f4f4f4;
          text-align: center;
          font-size: 0.9rem;
          color: #777;
          border-top: 1px solid #e0e0e0;
          z-index: 10;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
