import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function Profile() {
  // State for the editable profile form fields
  const [form, setForm] = useState({ name: '', homeClub: '', handicap: '' });

  // State for success or error feedback message shown after saving
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the current user's profile data on component mount and pre-fill the form
  // fallback to empty strings to avoid uncontrolled input warnings
  useEffect(() => {
    api.get('/users/profile').then(res => {
      setForm({
        name: res.data.name || '',
        homeClub: res.data.homeClub || '',
        handicap: res.data.handicap ?? ''
      });
      setLoading(false);
    });
  }, []);

  // Handle form submission — sends updated profile data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', form);

      // Show a success message and auto-clear it after 3 seconds
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

      {/* Success or error feedback message */}
      {message && <p style={styles.message}>{message}</p>}

      <div style={styles.card}>
        <form onSubmit={handleSubmit}>

          {/* Full name — required field */}
          <label style={styles.label}>Full Name</label>
          <input style={styles.input} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />

          {/* Home golf club — optional field */}
          <label style={styles.label}>Home Golf Club</label>
          <input style={styles.input} placeholder="e.g. Golf Club Lausanne" value={form.homeClub} onChange={e => setForm({ ...form, homeClub: e.target.value })} />

          {/* Handicap — optional numeric field with decimal support */}
          <label style={styles.label}>Handicap</label>
          <input style={styles.input} type="number" step="0.1" placeholder="e.g. 18.5" value={form.handicap} onChange={e => setForm({ ...form, handicap: e.target.value })} />

          <button style={styles.button} type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

// Inline styles for layout and visual consistency
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