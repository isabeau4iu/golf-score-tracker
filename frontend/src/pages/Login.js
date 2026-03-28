import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Access the log-in function from AuthContext to store the token after successful authentication
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle form submission, sends credentials to the API and logs the user in on success
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });

      // Store the token and user in AuthContext and localStorage
      login(res.data.token, res.data.user);

      // Redirect to the dashboard after successful login
      navigate('/');
    } catch (err) {
      // display the server error message or a generic fallback
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>⛳ Golf Tracker</h1>
        <h2 style={styles.subtitle}>Login</h2>

        {/* Display error message if login fails */}
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email and password inputs — both required */}
          <input style={styles.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />

          {/* Submit button, disabled while the API request is in progress */}
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Link to the registration page for new users */}
        <p style={styles.link}>No account? <Link to="/register">Register here</Link></p>
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

export default Login;