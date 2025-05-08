import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For modal image
  const [hoverText, setHoverText] = useState({ visible: false, x: 0, y: 0 });

  const fetchIssues = async () => {
    try {
      const res = await axios.get('https://fixit-backend-k1od.onrender.com/api/issues');  // Updated to production backend URL
      setIssues(res.data);
    } catch (err) {
      console.error('Failed to fetch issues:', err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const deleteIssue = async (id) => {
    if (!window.confirm('Are you sure you want to delete this issue?')) return;

    try {
      await axios.delete(`https://fixit-backend-k1od.onrender.com/api/issues/${id}`); // Updated to production backend URL
      setIssues(prev => prev.filter(issue => issue._id !== id));
    } catch (err) {
      console.error('Failed to delete issue:', err);
      alert('Error deleting issue. Check console for details.');
    }
  };

  return (
    <>
      <div>
        <h2 className='main-title'>Reported Issues</h2>
        {issues.length === 0 ? (
          <p>No issues reported yet.</p>
        ) : (
          issues.map((issue, index) => (
            <div
              key={issue._id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                marginLeft: '4vh',
                marginRight: '4vh'
              }}
            >
              {issue.createdAt && (
                <p><strong>🕒 Submitted on:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
              )}
              <p><strong>Report No: {index + 1}</strong></p>
              <p><strong className='description'>Description: <br /></strong><div className='userDescription'>{issue.description}</div></p>

              <p><strong>Image: </strong></p>
              <div
                className='image-container'
                onMouseEnter={() => setHoverText(prev => ({ ...prev, visible: true }))}
                onMouseLeave={() => setHoverText({ visible: false, x: 0, y: 0 })}
                onMouseMove={e => setHoverText({ visible: true, x: e.clientX + 15, y: e.clientY + 15 })}
              >
                {issue.imageUrl && (
                  <img
                    src={`https://fixit-backend-k1od.onrender.com/uploads/${issue.imageUrl}`}  // Updated to production backend URL
                    width="200"
                    alt="Issue"
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      setSelectedImage(`https://fixit-backend-k1od.onrender.com/uploads/${issue.imageUrl}`)  // Updated to production backend URL
                    }
                  />
                )}
              </div>

              <p><strong>Latitude & Longitude :</strong></p>
              <div className='location'>
                {issue.location && issue.location.lat && issue.location.lng && (
                  <div>
                    <p>📍 {issue.location.lat}, {issue.location.lng}</p>
                    <button className='map-button'
                      onClick={() => {
                        const mapsUrl = `https://www.google.com/maps?q=${issue.location.lat},${issue.location.lng}`;
                        window.open(mapsUrl, '_blank');
                      }}
                    >
                      View on Google Maps
                    </button>
                  </div>
                )}
              </div>

              <button className='delete-button' onClick={() => deleteIssue(issue._id)}>🗑 Delete</button>
            </div>
          ))
        )}

        {/* Tooltip */}
        {hoverText.visible && (
          <div style={{
            position: 'fixed',
            top: hoverText.y,
            left: hoverText.x,
            backgroundColor: 'black',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px',
            pointerEvents: 'none',
            zIndex: 2000
          }}>
            Click on the image to enlarge/open
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div
            style={modalStyles.overlay}
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Enlarged"
              style={modalStyles.image}
            />
          </div>
        )}
      </div>
    </>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    cursor: 'pointer'
  },
  image: {
    maxWidth: '90%',
    maxHeight: '90%',
    borderRadius: '8px'
  }
};

export default AdminDashboard;
