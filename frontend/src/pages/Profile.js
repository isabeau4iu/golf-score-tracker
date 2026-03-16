import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function Profile() {
  const [form, setForm] = useState({ name: '', homeClub: '', handicap: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/profile').then(res => {
      setForm({ name: res.data.name || '', homeClub: res.data.homeClub || '', handicap: res.data.handicap ?? '' });
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', form);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Error updating profile');
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Profile</h1>
      {message && <p style={styles.message}>{message}</p>}
      <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Full Name</label>
          <input style={styles.input} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <label style={styles.label}>Home Golf Club</label>
          <input style={styles.input} placeholder="e.g. Golf Club Lausanne" value={form.homeClub} onChange={e => setForm({ ...form, homeClub: e.target.value })} />
          <label style={styles.label}>Handicap</label>
          <input style={styles.input} type="number" step="0.1" placeholder="e.g. 18.5" value={form.handicap} onChange={e => setForm({ ...form, handicap: e.target.value })} />
          <button style={styles.button} type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '600px', margin: '0 auto' },
  title: { color: '#1a5c2a', marginBottom: '1.5rem' },
  card: { backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  label: { display: 'block', marginBottom: '0.3rem', fontWeight: 'bold', color: '#333' },
  input: { display: 'block', width: '100%', padding: '0.75rem', marginBottom: '1.2rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.75rem', backgroundColor: '#1a5c2a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' },
  message: { backgroundColor: '#d4edda', color: '#155724', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }
};

export default Profile;
