// src/components/assessments/AssessmentDetailModal.jsx
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

const inputStyles = {
  ...valueStyles,
  display: 'block',
  width: 'calc(100% - 20px)',
  padding: '8px 10px',
  border: '1px solid #ccc',
  borderRadius: '8px',
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

const AssessmentDetailModal = ({ assessment, onClose, onSave, onDelete, jobs }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (assessment) {
      setFormData(assessment);
      setIsEditing(Object.keys(assessment).length === 0); // If empty object, it's a new assessment
    }
  }, [assessment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      onDelete(assessment.id);
      onClose();
    }
  };

  const appliedJob = jobs.find(job => job.id === formData.jobId);

  return (
    <div style={modalOverlayStyles}>
      <div style={modalContainerStyles}>
        <button style={closeButtonStyles} onClick={onClose}>&times;</button>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>
          {isEditing ? 'Edit Assessment' : formData.title}
        </h2>
        
        {isEditing ? (
          <div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Title</label>
              <input type="text" name="title" value={formData.title || ''} onChange={handleChange} style={inputStyles} />
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Description</label>
              <textarea name="description" value={formData.description || ''} onChange={handleChange} style={{ ...inputStyles, height: '100px' }} />
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Associated Job</label>
              <select name="jobId" value={formData.jobId || ''} onChange={handleChange} style={inputStyles}>
                <option value="">Select a Job</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Candidates Count</label>
              <input type="number" name="candidatesCount" value={formData.candidatesCount || 0} onChange={handleChange} style={inputStyles} />
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Status</label>
              <select name="status" value={formData.status || 'Draft'} onChange={handleChange} style={inputStyles}>
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div style={detailItemStyles}>
              <label style={labelStyles}>Due Date</label>
              <input type="date" name="dueDate" value={formData.dueDate || ''} onChange={handleChange} style={inputStyles} />
            </div>
            <div style={buttonGroupStyles}>
              <button style={saveButtonStyles} onClick={handleSave}>Save</button>
              {Object.keys(assessment).length > 0 && ( // Only show cancel if not a new assessment
                <button style={editButtonStyles} onClick={() => setIsEditing(false)}>Cancel</button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Description</p>
              <p style={valueStyles}>{formData.description}</p>
            </div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Associated Job</p>
              <p style={valueStyles}>{appliedJob ? appliedJob.title : 'N/A'}</p>
            </div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Candidates Count</p>
              <p style={valueStyles}>{formData.candidatesCount}</p>
            </div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Status</p>
              <p style={valueStyles}>{formData.status}</p>
            </div>
            <div style={detailItemStyles}>
              <p style={labelStyles}>Due Date</p>
              <p style={valueStyles}>{formData.dueDate}</p>
            </div>
            <div style={buttonGroupStyles}>
              <button style={editButtonStyles} onClick={() => setIsEditing(true)}>Edit Assessment</button>
              <button style={deleteButtonStyles} onClick={handleDelete}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentDetailModal;