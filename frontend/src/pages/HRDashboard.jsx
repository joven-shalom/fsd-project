import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const HRDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const { data } = await api.get('/api/candidates', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setCandidates(data);
    } catch (err) {
      setError('Failed to fetch candidates');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h2>HR Dashboard</h2>
        <div>
          <span style={{ marginRight: '1rem' }}>Welcome, {user.name}</span>
          <button onClick={logout} className="secondary">Logout</button>
        </div>
      </nav>
      <div className="container">
        <div className="card">
          <h1>Shortlisting Overview</h1>
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Experience</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(c => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.experience}</td>
                  <td>
                    <span className={`status-badge status-${c.status.toLowerCase()}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
