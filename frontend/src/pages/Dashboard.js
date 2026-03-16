import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

function Dashboard() {
  const { user } = useAuth();
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/rounds').then(res => {
      setRounds(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const latest = rounds[0];
  const previous = rounds[1];
  const avg = rounds.length ? Math.round(rounds.reduce((s, r) => s + r.grossScore, 0) / rounds.length) : null;
  const trend = latest && previous ? latest.grossScore - previous.grossScore : null;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome back, {user?.name}! 👋</h1>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Rounds</h3>
          <p style={styles.big}>{rounds.length}</p>
        </div>
        <div style={styles.card}>
          <h3>Average Score</h3>
          <p style={styles.big}>{avg ?? '—'}</p>
        </div>
        <div style={styles.card}>
          <h3>Latest Score</h3>
          <p style={styles.big}>{latest?.grossScore ?? '—'}</p>
        </div>
        <div style={styles.card}>
          <h3>Trend vs Previous</h3>
          <p style={styles.big}>
            {trend === null ? '—' : trend < 0 ? `▲ ${Math.abs(trend)} better` : trend > 0 ? `▼ ${trend} worse` : '= Same'}
          </p>
        </div>
      </div>
      <div style={styles.actions}>
        <Link to="/add-round" style={styles.button}>+ Log New Round</Link>
        <Link to="/history" style={styles.buttonOutline}>View History</Link>
        <Link to="/analytics" style={styles.buttonOutline}>Analytics</Link>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '900px', margin: '0 auto' },
  title: { color: '#1a5c2a', marginBottom: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' },
  card: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', textAlign: 'center' },
  big: { fontSize: '2rem', fontWeight: 'bold', color: '#1a5c2a', margin: 0 },
  actions: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  button: { padding: '0.75rem 1.5rem', backgroundColor: '#1a5c2a', color: 'white', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' },
  buttonOutline: { padding: '0.75rem 1.5rem', border: '2px solid #1a5c2a', color: '#1a5c2a', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }
};

export default Dashboard;
