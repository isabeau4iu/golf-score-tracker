import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function History() {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/rounds').then(res => {
      setRounds(res.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this round?')) return;
    await api.delete(`/rounds/${id}`);
    setRounds(rounds.filter(r => r._id !== id));
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Round History</h1>
      {rounds.length === 0 ? (
        <p>No rounds logged yet. <a href="/add-round">Log your first round!</a></p>
      ) : (
        <div style={styles.table}>
          <div style={styles.headerRow}>
            <span>Date</span><span>Course</span><span>Score</span><span>Putts</span><span>FIR</span><span>GIR</span><span></span>
          </div>
          {rounds.map(r => (
            <div key={r._id} style={styles.row}>
              <span>{new Date(r.date).toLocaleDateString()}</span>
              <span>{r.course?.name}</span>
              <span style={styles.score}>{r.grossScore}</span>
              <span>{r.putts ?? '—'}</span>
              <span>{r.fairwaysInRegulation ?? '—'}</span>
              <span>{r.greensInRegulation ?? '—'}</span>
              <button onClick={() => handleDelete(r._id)} style={styles.deleteBtn}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '900px', margin: '0 auto' },
  title: { color: '#1a5c2a', marginBottom: '1.5rem' },
  table: { backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', overflow: 'hidden' },
  headerRow: { display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr 1fr 0.5fr', padding: '1rem', backgroundColor: '#1a5c2a', color: 'white', fontWeight: 'bold', gap: '0.5rem' },
  row: { display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr 1fr 0.5fr', padding: '1rem', borderBottom: '1px solid #eee', alignItems: 'center', gap: '0.5rem' },
  score: { fontWeight: 'bold', color: '#1a5c2a' },
  deleteBtn: { background: 'none', border: 'none', color: '#cc0000', cursor: 'pointer', fontSize: '1rem' }
};

export default History;
