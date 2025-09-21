import React, { useState, useEffect } from 'react';

const modalOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(5px)',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'opacity 0.3s ease',
};

const modalContainerStyles = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '12px',
  width: '600px',
  maxHeight: '80vh',
  overflowY: 'auto',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  transform: 'scale(0.95)',
  animation: 'scaleIn 0.3s forwards',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
};

const closeButtonStyles = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  border: 'none',
  backgroundColor: 'transparent',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#888',
};

const detailItemStyles = {
  marginBottom: '15px',
};

const labelStyles = {
  fontSize: '14px',
  color: '#666',
  fontWeight: 'bold',
};

const valueStyles = {
  fontSize: '16px',
  color: '#333',
  marginTop: '4px',
};

const buttonGroupStyles = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
};

const saveButtonStyles = {
  padding: '10px 20px',
  borderRadius: '20px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  fontWeight: '600',
  cursor: 'pointer',
};

const editButtonStyles = {
  padding: '10px 20px',
  borderRadius: '20px',
  border: '1px solid #007bff',
  backgroundColor: 'transparent',
  color: '#007bff',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  ':hover': {
    backgroundColor: '#007bff',
    color: 'white',
  },
};

const CandidateDetailModal = ({ candidate, jobs, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (candidate) {
      setFormData({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        address: candidate.address,
        stage: candidate.stage,
        jobId: candidate.jobId,
      });
    }
  }, [candidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(candidate.id, formData);
    setIsEditing(false);
  };

  const appliedJob = jobs.find(job => job.id === candidate.jobId);

  return (
    <div style={modalOverlayStyles}>
      <div style={modalContainerStyles}>
        <button style={closeButtonStyles} onClick={onClose}>&times;</button>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>{candidate.name}</h2>
        
        {isEditing ? (
          <div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} style={{...valueStyles, display: 'block'}} />
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} style={{...valueStyles, display: 'block'}} />
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={{...valueStyles, display: 'block'}} />
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} style={{...valueStyles, display: 'block'}} />
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Stage</label>
              <select name="stage" value={formData.stage} onChange={handleChange} style={{...valueStyles, display: 'block'}}>
                <option value="applied">Applied</option>
                <option value="screen">Screen</option>
                <option value="tech">Tech</option>
                <option value="offer">Offer</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div style={buttonGroupStyles}>
              <button style={saveButtonStyles} onClick={handleSave}>Save</button>
              <button style={editButtonStyles} onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Email</p>
              <p style={valueStyles}>{candidate.email}</p>
            </div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Phone</p>
              <p style={valueStyles}>{candidate.phone}</p>
            </div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Address</p>
              <p style={valueStyles}>{candidate.address}</p>
            </div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Current Stage</p>
              <p style={valueStyles}>{candidate.stage}</p>
            </div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Applied For</p>
              {appliedJob ? (
                <p style={valueStyles}>{appliedJob.title}</p>
              ) : (
                <p style={valueStyles}>Not specified</p>
              )}
            </div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Job ID</p>
              <p style={valueStyles}>{candidate.jobId}</p>
            </div>
            <div style={buttonGroupStyles}>
              <button style={editButtonStyles} onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDetailModal;