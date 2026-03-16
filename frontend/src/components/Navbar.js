import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>⛳ Golf Tracker</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/add-round" style={styles.link}>Add Round</Link>
        <Link to="/history" style={styles.link}>History</Link>
        <Link to="/analytics" style={styles.link}>Analytics</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#1a5c2a', color: 'white' },
  brand: { color: 'white', textDecoration: 'none', fontSize: '1.3rem', fontWeight: 'bold' },
  links: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
  link: { color: 'white', textDecoration: 'none', fontSize: '0.95rem' },
  button: { backgroundColor: 'transparent', border: '1px solid white', color: 'white', padding: '0.4rem 0.8rem', cursor: 'pointer', borderRadius: '4px' }
};

export default Navbar;
