import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Access the login function from AuthContext to store the token after successful registration
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle form submission by sending registration data to the API and logs the user in on success
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/register', { name, email, password });

      // Store the token and user in AuthContext and localStorage
      // The backend returns a token immediately after registration so the user is logged in straight away
      login(res.data.token, res.data.user);

      // Redirect to the dashboard after successful registration
      navigate('/');
    } catch (err) {
      // Display the server error message or a generic fallback
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>⛳ Golf Tracker</h1>
        <h2 style={styles.subtitle}>Create Account</h2>

        {/* Display error message if registration fails */}
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Full name, email, and password inputs — all required */}
          <input style={styles.input} type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
          <input style={styles.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />

          {/* Password enforces a minimum length of 6 characters */}
          <input style={styles.input} type="password" placeholder="Password (min. 6 characters)" value={password} onChange={e => setPassword(e.target.value)} minLength={6} required />

          {/* Submit button — disabled while the API request is in progress */}
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        {/* Link to the login page for existing users */}
        <p style={styles.link}>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}

// Inline styles for layout and visual consistency
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f4f0' },
  card: { backgroundColor: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  title: { textAlign: 'center', color: '#1a5c2a', marginBottom: '0.5rem' },
  subtitle: { textAlign: 'center', color: '#333', marginBottom: '1.5rem' },
  input: { display: 'block', width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.75rem', backgroundColor: '#1a5c2a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' },
  error: { color: 'red', marginBottom: '1rem', textAlign: 'center' },
  link: { textAlign: 'center', marginTop: '1rem' }
};

export default Register;