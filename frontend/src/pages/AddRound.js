import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function AddRound() {
  // State for the list of available golf courses from the API
  const [courses, setCourses] = useState([]);

  // State for all form field values, initialised as empty strings
  const [form, setForm] = useState({
    course: '', date: '', grossScore: '', putts: '',
    fairwaysInRegulation: '', greensInRegulation: '', notes: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch the list of golf courses once when the component mounts
  // Is used to populate the course dropdown in the form
  useEffect(() => {
    api.get('/courses').then(res => setCourses(res.data));
  }, []);

  // Handle form submission, posts the round data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/rounds', form);
      // Redirect to the History Page after a successful save
      navigate('/history');
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving round');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Log New Round</h1>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.card}>
        <form onSubmit={handleSubmit}>

          {/* Course selection dropdown (required field) */}
          <label style={styles.label}>Golf Course *</label>
          <select style={styles.input} value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} required>
            <option value="">Select a course...</option>
            {courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>

          {/* Date of the round (required field) */}
          <label style={styles.label}>Date *</label>
          <input style={styles.input} type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />

          {/* Gross score: total strokes for the round (required field) */}
          <label style={styles.label}>Gross Score *</label>
          <input style={styles.input} type="number" placeholder="e.g. 92" value={form.grossScore} onChange={e => setForm({ ...form, grossScore: e.target.value })} required />

          {/* Optional statistics fields */}
          <label style={styles.label}>Putts</label>
          <input style={styles.input} type="number" placeholder="e.g. 34" value={form.putts} onChange={e => setForm({ ...form, putts: e.target.value })} />

          <label style={styles.label}>Fairways in Regulation (FIR)</label>
          <input style={styles.input} type="number" placeholder="e.g. 8" value={form.fairwaysInRegulation} onChange={e => setForm({ ...form, fairwaysInRegulation: e.target.value })} />

          <label style={styles.label}>Greens in Regulation (GIR)</label>
          <input style={styles.input} type="number" placeholder="e.g. 6" value={form.greensInRegulation} onChange={e => setForm({ ...form, greensInRegulation: e.target.value })} />

          {/* Optional free-text notes about the round */}
          <label style={styles.label}>Notes</label>
          <textarea style={{ ...styles.input, height: '80px', resize: 'vertical' }} placeholder="Any notes about this round..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />

          {/* Submit button, disabled while the API request is in progress */}
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Round'}
          </button>

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
  error: { color: 'red', marginBottom: '1rem' }
};

export default AddRound;