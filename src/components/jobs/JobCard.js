import React from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const jobCardStyles = {
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: 'white',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  display: 'flex',
  flexDirection: 'column',
};

const titleStyles = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
};

const detailStyles = {
  fontSize: '14px',
  color: '#555',
  marginBottom: '5px',
};

const tagsContainerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '10px',
};

const tagStyles = {
  backgroundColor: '#e0f0ff',
  color: '#007bff',
  padding: '5px 10px',
  borderRadius: '15px',
  fontSize: '12px',
  fontWeight: '600',
};

const JobCard = ({ job, onClick }) => {
  return (
    <div style={jobCardStyles} onClick={onClick}>
      <h3 style={titleStyles}>{job.title}</h3>
      <p style={detailStyles}>Company: {job.company}</p>
      <p style={detailStyles}>Location: {job.location}</p>
      <p style={detailStyles}>Salary (CTC): {job.salary}</p>

      {job.skills && job.skills.length > 0 && (
        <div style={tagsContainerStyles}>
          {job.skills.map((skill, index) => (
            <span key={index} style={tagStyles}>{skill}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobCard;