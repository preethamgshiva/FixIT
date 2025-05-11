import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoverText, setHoverText] = useState({ visible: false, x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://fixit-backend-k1od.onrender.com/api/issues');
      setIssues(res.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch issues:', err);
      setError('Failed to load issues. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const deleteIssue = async (id) => {
    if (!window.confirm('Are you sure you want to delete this issue?')) return;

    try {
      await axios.delete(`https://fixit-backend-k1od.onrender.com/api/issues/${id}`);
      setIssues(prev => prev.filter(issue => issue._id !== id));
    } catch (err) {
      console.error('Failed to delete issue:', err);
      alert('Error deleting issue. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading issues...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={fetchIssues} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h2 className="main-title">Reported Issues</h2>
      {issues.length === 0 ? (
        <div className="no-issues">
          <p>No issues reported yet.</p>
        </div>
      ) : (
        <div className="issues-grid">
          {issues.map((issue, index) => (
            <div key={issue._id} className="issue-card">
              <div className="issue-header">
                <span className="issue-number">Report #{index + 1}</span>
                {issue.createdAt && (
                  <span className="issue-timestamp">
                    🕒 {new Date(issue.createdAt).toLocaleString()}
                  </span>
                )}
              </div>

              <div className="description">
                <strong>Description:</strong>
                <div className="userDescription">{issue.description}</div>
              </div>

              {issue.imageUrl && (
                <div
                  className="image-container"
                  onMouseEnter={() => setHoverText(prev => ({ ...prev, visible: true }))}
                  onMouseLeave={() => setHoverText({ visible: false, x: 0, y: 0 })}
                  onMouseMove={e => setHoverText({ visible: true, x: e.clientX + 15, y: e.clientY + 15 })}
                >
                  <img
                    src={`https://fixit-backend-k1od.onrender.com/uploads/${issue.imageUrl}`}
                    alt="Issue"
                    onClick={() => setSelectedImage(`https://fixit-backend-k1od.onrender.com/uploads/${issue.imageUrl}`)}
                  />
                </div>
              )}

              {issue.location && issue.location.lat && issue.location.lng && (
                <div className="location">
                  <strong>Location:</strong>
                  <p>📍 {issue.location.lat}, {issue.location.lng}</p>
                  <button
                    className="map-button"
                    onClick={() => {
                      const mapsUrl = `https://www.google.com/maps?q=${issue.location.lat},${issue.location.lng}`;
                      window.open(mapsUrl, '_blank');
                    }}
                  >
                    View on Google Maps
                  </button>
                </div>
              )}

              <button
                className="delete-button"
                onClick={() => deleteIssue(issue._id)}
              >
                🗑 Delete Issue
              </button>
            </div>
          ))}
        </div>
      )}

      {hoverText.visible && (
        <div
          className="tooltip"
          style={{
            top: hoverText.y,
            left: hoverText.x,
          }}
        >
          Click to enlarge image
        </div>
      )}

      {selectedImage && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Enlarged"
            className="modal-image"
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
