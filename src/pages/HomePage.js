import React from 'react';
import { Link } from 'react-router-dom';

const boxStyles = {
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)', // Darkened shadow
  transition: 'transform 0.3s ease, background-color 0.3s ease',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '220px',
  position: 'relative',
  border: '1px solid #e0e0e0',
  ':hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
  },
};

const boxTitle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#333',
  marginBottom: '10px',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
};

const boxDescription = {
  fontSize: '15px',
  color: '#555',
  lineHeight: '1.5',
};

const arrowButton = {
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#007bff',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  border: 'none',
  ':hover': {
    backgroundColor: '#0056b3',
  },
};

const HomePage = () => {
  return (
    <div style={{ padding: '0 20px' }}>
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1 style={{ fontSize: '40px', color: '#2c3e50', fontFamily: '"Montserrat", sans-serif' }}>A Powerful, Intuitive Hiring Platform</h1>
        <p style={{ fontSize: '18px', color: '#7f8c8d' }}>Streamline your hiring process from a single dashboard.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Jobs Box */}
        <div style={boxStyles}>
          <div>
            <h2 style={boxTitle}>Jobs</h2>
            <p style={boxDescription}>
              Create, edit, and manage all your job postings with a seamless interface. Reorder positions with drag-and-drop, filter by status and tags, and track your active roles with ease.
            </p>
          </div>
          <Link to="/jobs">
            <button style={arrowButton}>&#8594;</button>
          </Link>
        </div>

        {/* Candidates Box */}
        <div style={boxStyles}>
          <div>
            <h2 style={boxTitle}>Candidates</h2>
            <p style={boxDescription}>
              Manage a large volume of applicants efficiently. Our virtualized list handles over 1000 candidates without slowing down. Track their progress through a powerful Kanban board and manage their application with a comprehensive timeline.
            </p>
          </div>
          <Link to="/candidates">
            <button style={arrowButton}>&#8594;</button>
          </Link>
        </div>

        {/* Assessments Box */}
        <div style={boxStyles}>
          <div>
            <h2 style={boxTitle}>Assessments</h2>
            <p style={boxDescription}>
              Build and customize job-specific assessments with our live builder. Create multiple-choice, short-answer, or file-upload questions. The builder state is locally persisted, ensuring a smooth, uninterrupted experience.
            </p>
          </div>
          <Link to="/assessments">
            <button style={arrowButton}>&#8594;</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;