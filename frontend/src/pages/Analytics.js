import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../utils/api';

function Analytics() {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all rounds for the authenticated user on component mount
  // Reverse the array so data is displayed in chronological order (i.e., oldest to newest) in the charts
  useEffect(() => {
    api.get('/rounds').then(res => {
      setRounds([...res.data].reverse());
      setLoading(false);
    });
  }, []);

  // Show a loading indicator while the API request is in progress
  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  // Prompt the user to log rounds if no data is available yet
  if (rounds.length === 0) return <div style={{ padding: '2rem' }}>No rounds yet. Log some rounds to see analytics!</div>;

  // Transform round data into the format expected by Recharts
  const chartData = rounds.map(r => ({
    date: new Date(r.date).toLocaleDateString(),
    Score: r.grossScore,
    Putts: r.putts,
    FIR: r.fairwaysInRegulation,
    GIR: r.greensInRegulation
  }));

  // Helper function to calculate the average of a numeric field across all rounds
  // Filters out null/undefined values and returns '—' if no valid data exists
  const avg = (key) => {
    const vals = rounds.filter(r => r[key] != null);
    return vals.length ? (vals.reduce((s, r) => s + r[key], 0) / vals.length).toFixed(1) : '—';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Analytics</h1>

      {/* Summary cards showing averages across all logged rounds */}
      <div style={styles.grid}>
        <div style={styles.card}><h3>Avg Score</h3><p style={styles.big}>{avg('grossScore')}</p></div>
        <div style={styles.card}><h3>Avg Putts</h3><p style={styles.big}>{avg('putts')}</p></div>
        <div style={styles.card}><h3>Avg FIR</h3><p style={styles.big}>{avg('fairwaysInRegulation')}</p></div>
        <div style={styles.card}><h3>Avg GIR</h3><p style={styles.big}>{avg('greensInRegulation')}</p></div>
      </div>

      {/* Line chart showing gross score progression over time */}
      <div style={styles.chartCard}>
        <h2>Score Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Score" stroke="#1a5c2a" strokeWidth={2} dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Line chart showing putts, FIR, and GIR trends over time */}
      <div style={styles.chartCard}>
        <h2>Putts, FIR & GIR Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Putts" stroke="#e67e22" strokeWidth={2} />
            <Line type="monotone" dataKey="FIR" stroke="#2980b9" strokeWidth={2} />
            <Line type="monotone" dataKey="GIR" stroke="#8e44ad" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

// Inline styles for layout and visual consistency
const styles = {
  container: { padding: '2rem', maxWidth: '900px', margin: '0 auto' },
  title: { color: '#1a5c2a', marginBottom: '1.5rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' },
  card: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', textAlign: 'center' },
  big: { fontSize: '2rem', fontWeight: 'bold', color: '#1a5c2a', margin: 0 },
  chartCard: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }
};

export default Analytics;