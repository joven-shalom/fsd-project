import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const RecruiterDashboard = () => {
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

  const updateStatus = async (id, nextStatus) => {
    try {
      await api.put(`/api/candidates/${id}/status`, 
        { status: nextStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchCandidates();
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Recruiter Dashboard</h2>
        <div>
          <span style={{ marginRight: '1rem' }}>Welcome, {user.name}</span>
          <button onClick={logout} className="secondary">Logout</button>
        </div>
      </nav>
      <div className="container">
        <div className="card">
          <h1>Candidate Applications</h1>
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Education</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(c => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.education}</td>
                  <td>
                    <span className={`status-badge status-${c.status.toLowerCase()}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    {c.status === 'APPLIED' && (
                      <button onClick={() => updateStatus(c._id, 'SHORTLISTED')}>Shortlist</button>
                    )}
                    {c.status === 'SHORTLISTED' && (
                      <button onClick={() => updateStatus(c._id, 'REJECTED')} className="danger">Reject</button>
                    )}
                    {c.status === 'REJECTED' && (
                      <span style={{ color: 'var(--text-muted)' }}>Final Status</span>
                    )}
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

export default RecruiterDashboard;
