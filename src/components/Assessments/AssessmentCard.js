// src/components/assessments/AssessmentCard.jsx
import React from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const cardStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  marginBottom: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  ':hover': {
    transform: 'translateY(-3px)',
  },
};

const contentStyles = {
  flexGrow: 1,
};

const titleStyles = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#2c3e50',
  marginBottom: '5px',
};

const detailStyles = {
  fontSize: '14px',
  color: '#7f8c8d',
  marginBottom: '3px',
};

const statusActiveStyles = {
  backgroundColor: '#e6ffe6',
  color: '#28a745',
  padding: '4px 10px',
  borderRadius: '15px',
  fontSize: '12px',
  fontWeight: 'bold',
};

const statusDraftStyles = {
    backgroundColor: '#fffbe6',
    color: '#ffc107',
    padding: '4px 10px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: 'bold',
};

const statusCompletedStyles = {
    backgroundColor: '#e6f7ff',
    color: '#007bff',
    padding: '4px 10px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: 'bold',
};

const takeAssessmentButtonStyles = {
    padding: '8px 15px',
    borderRadius: '20px',
    border: '1px solid #007bff',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    ':hover': {
        backgroundColor: '#0056b3',
    },
};

const AssessmentCard = ({ assessment, onEdit, onDelete, onClick }) => {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return statusActiveStyles;
      case 'Draft': return statusDraftStyles;
      case 'Completed': return statusCompletedStyles;
      default: return detailStyles; // Fallback for unknown status
    }
  };

  const handleTakeAssessmentClick = (e) => {
    e.stopPropagation(); // Prevents the modal from opening
    navigate(`/take-assessment/${assessment.id}`);
  };

  return (
    <div style={cardStyles} onClick={() => onClick(assessment)}>
      <div style={contentStyles}>
        <h3 style={titleStyles}>{assessment.title}</h3>
        <p style={detailStyles}>Associated Job ID: {assessment.jobId}</p>
        <p style={detailStyles}>Candidates: {assessment.candidatesCount}</p>
        <p style={{ ...detailStyles, ...getStatusStyle(assessment.status) }}>Status: {assessment.status}</p>
        <p style={detailStyles}>Due: {assessment.dueDate}</p>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {assessment.status === 'Active' && (
            <button style={takeAssessmentButtonStyles} onClick={handleTakeAssessmentClick}>
                Take Assessment
            </button>
        )}
        <BsPencilSquare size={18} color="#007bff" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); onEdit(assessment); }} />
        <BsTrash size={18} color="#dc3545" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); onDelete(assessment.id); }} />
      </div>
    </div>
  );
};

export default AssessmentCard;