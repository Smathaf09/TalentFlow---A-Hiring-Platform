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

const deleteButtonStyles = {
  padding: '10px 20px',
  borderRadius: '20px',
  border: '1px solid #dc3545',
  backgroundColor: 'transparent',
  color: '#dc3545',
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
};

const inputStyles = {
  ...valueStyles,
  display: 'block',
  width: 'calc(100% - 20px)',
  padding: '8px 10px',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const JobDetailModal = ({ job, onClose, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (job) {
      setFormData(job);
      setIsEditing(Object.keys(job).length === 0);
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      onDelete(job.id);
      onClose();
    }
  };

  return (
    <div style={modalOverlayStyles}>
      <div style={modalContainerStyles}>
        <button style={closeButtonStyles} onClick={onClose}>&times;</button>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>
          {isEditing ? 'Edit Job' : job.title}
        </h2>
        
        {isEditing ? (
          <div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Title</label>
              <input type="text" name="title" value={formData.title || ''} onChange={handleChange} style={inputStyles} />
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Company</label>
              <input type="text" name="company" value={formData.company || ''} onChange={handleChange} style={inputStyles} />
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Description</label>
              <textarea name="description" value={formData.description || ''} onChange={handleChange} style={{ ...inputStyles, height: '100px' }} />
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Location</label>
              <input type="text" name="location" value={formData.location || ''} onChange={handleChange} style={inputStyles} />
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Salary</label>
              <input type="text" name="salary" value={formData.salary || ''} onChange={handleChange} style={inputStyles} />
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Status</label>
              <select name="status" value={formData.status || 'active'} onChange={handleChange} style={inputStyles}>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
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
              <p style={labelStyles}>Company</p>
              <p style={valueStyles}>{job.company}</p>
            </div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Description</p>
              <p style={valueStyles}>{job.description}</p>
            </div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Location</p>
              <p style={valueStyles}>{job.location}</p>
            </div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Salary</p>
              <p style={valueStyles}>{job.salary}</p>
            </div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Status</p>
              <p style={valueStyles}>{job.status}</p>
            </div>
            <div style={buttonGroupStyles}>
              <button style={editButtonStyles} onClick={() => setIsEditing(true)}>Edit Job</button>
              <button style={deleteButtonStyles} onClick={handleDelete}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailModal;