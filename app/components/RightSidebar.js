import React, { useState } from 'react';

const RightSidebar = () => {
  const [over, setOver] = useState(19);

  // Stats data
  const statsData = {
    0: { batter: 'CH Gayle', sixes: 14 },
    1: { batter: 'CH Gayle', sixes: 20 },
    2: { batter: 'CH Gayle', sixes: 31 },
    3: { batter: 'CH Gayle', sixes: 30 },
    4: { batter: 'CH Gayle', sixes: 28 },
    5: { batter: 'CH Gayle', sixes: 22 },
    6: { batter: 'CH Gayle', sixes: 22 },
    7: { batter: 'CH Gayle', sixes: 19 },
    8: { batter: 'CH Gayle', sixes: 23 },
    9: { batter: 'V Kohli', sixes: 18 },
    10: { batter: 'CH Gayle', sixes: 20 },
    11: { batter: 'V Kohli', sixes: 18 },
    12: { batter: 'CH Gayle', sixes: 24 },
    13: { batter: 'KA Pollard', sixes: 20 },
    14: { batter: 'AD Russell', sixes: 26 },
    15: { batter: 'AB de Villiers', sixes: 28 },
    16: { batter: 'KA Pollard', sixes: 33 },
    17: { batter: 'MS Dhoni', sixes: 42 },
    18: { batter: 'MS Dhoni', sixes: 43 },
    19: { batter: 'MS Dhoni', sixes: 71 }
  };

  // Expanded player list
  const players = [
    { name: 'David Warner', team: 'Sunrisers Hyderabad' },
    { name: 'Chris Gayle', team: 'Kings XI Punjab' },
    { name: 'Virat Kohli', team: 'RCB' },
    { name: 'AB de Villiers', team: 'RCB' },
    { name: 'Shane Watson', team: 'Chennai Super Kings' },
    { name: 'MS Dhoni', team: 'Chennai Super Kings' },
    { name: 'Hardik Pandya', team: 'Mumbai Indians' },
    { name: 'Rohit Sharma', team: 'Mumbai Indians' },
    { name: 'KL Rahul', team: 'Punjab Kings' },
    { name: 'Sunil Narine', team: 'KKR' },
    { name: 'Ben Stokes', team: 'Rajasthan Royals' },
    { name: 'Jofra Archer', team: 'Rajasthan Royals' },
    { name: 'Shubman Gill', team: 'KKR' },
    { name: 'Prithvi Shaw', team: 'Delhi Capitals' },
    { name: 'Rishabh Pant', team: 'Delhi Capitals' },
    { name: 'Marcus Stoinis', team: 'Delhi Capitals' },
    { name: 'Quinton de Kock', team: 'Mumbai Indians' },
    { name: 'Mitchell Marsh', team: 'Delhi Capitals' },
    { name: 'Ishant Sharma', team: 'Delhi Capitals' },
    { name: 'Pat Cummins', team: 'KKR' },
  ];

  const [randomPlayer, setRandomPlayer] = useState(null);

  const handleSliderChange = (e) => {
    setOver(parseInt(e.target.value));
  };

  const handlePickRandomPlayer = () => {
    const randomIndex = Math.floor(Math.random() * players.length);
    setRandomPlayer(players[randomIndex]);
  };

  const { batter, sixes } = statsData[over];

  return (
    <div style={styles.sidebar}>
      <div style={styles.cardContainer}>
        {/* Card 1 */}
        <div style={styles.card}>
          <h2 style={styles.title}>📊 Stats Overview</h2>

          <div style={styles.section}>
            <p style={styles.label}><strong>Top Batter</strong></p>
            <h1 style={styles.label}>{batter}</h1>
            <p style={styles.label}><strong> Over</strong> <span style={styles.value}>{over + 1}</span></p>
            <h3 style={styles.label}>Sixes: <span style={styles.value}>{sixes}</span></h3>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label htmlFor="over-slider" style={{ fontWeight: 'bold' }}>🎯 Change Over:</label>
            <input
              type="range"
              id="over-slider"
              min="0"
              max="19"
              value={over}
              onChange={handleSliderChange}
              style={styles.slider}
            />
            <p style={{ marginTop: 5, fontWeight: 'bold' }}>Over {over + 1} / 20</p>
          </div>
        </div>

        {/* Card 2: Random Player Picker */}
        <div style={{ ...styles.card, background: 'white', color: '#000' }}>

          <div style={styles.section}>
            {randomPlayer && (
              <div style={styles.section}>
                <h2 style={styles.label}>{randomPlayer.name}</h2>
                <p style={styles.label}>{randomPlayer.team}</p>
              </div>
            )}
            <button onClick={handlePickRandomPlayer} style={styles.button}>🎯 Pick Random Player</button>

          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '300px',
   // height: '100vh', // Full viewport height
    //background: 'linear-gradient(to right, #6ee7b7, #3b82f6)',
    background: '#e5e7eb', // light gray background for sidebar

    boxSizing: 'border-box',
    padding: '10px',
    borderRadius: '20px',
    margin: '10px'
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    height: '100%',     // Makes it stretch to the height of the sidebar
  },  
  
  card: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease-in-out',
    width: '100%',
    boxSizing: 'border-box',
    flex: 1,           // Make each card grow equally to fill height
    display: 'flex',   // To make child content align nicely
    flexDirection: 'column',
    justifyContent: 'space-between' // Keeps internal content spaced
  },  
  
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  section: {
    marginBottom: '10px'
  },
  label: {
    marginBottom: '8px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  value: {
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    marginTop: '8px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#06b6d4',
    color: 'white',
    borderRadius: '10px',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '15px',
    transition: 'background-color 0.3s ease-in-out',
  },
  buttonHover: {
    backgroundColor: '#3b82f6'
  }
};

export default RightSidebar;
