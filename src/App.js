import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import CandidatesPage from './pages/CandidatesPage';
import AssessmentsPage from './pages/AssessmentPage'; // Corrected import
import TakeAssessmentPage from './components/Assessments/TakeAssessmentPage';
import AssessmentBuilder from './components/Assessments/AssessmentBuilder';
import NotFoundPage from './pages/NotFoundPage';


const navLinkStyles = ({ isActive }) => ({
  color: isActive ? '#fff' : '#c9c9c9',
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: '20px',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  fontSize: '14px',
  fontWeight: '600',
  backgroundColor: isActive ? '#007bff' : 'transparent',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const navStyles = {
  backgroundColor: '#1E2A3A',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderBottom: '1px solid #3c4c62',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  position: 'fixed', 
  top: 0, 
  width: '100%', 
  zIndex: 1000,
};

const logoStyles = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#ffffff',
  marginRight: '30px',
  fontFamily: '"Montserrat", sans-serif',
};

const subNavStyles = {
  display: 'flex',
  gap: '15px',
};

const contentContainerStyles = {
  padding: '20px',
  paddingTop: '65px', // This creates space for the fixed navbar
};

const App = () => {
  return (
    <Router>
      <div style={{ backgroundColor: '#f4f7f9', minHeight: '100vh' }}>
        <nav style={navStyles}>
          <div style={logoStyles}>TALENTFLOW</div>
          <div style={subNavStyles}>
            <NavLink to="/" style={navLinkStyles}>Home</NavLink>
            <NavLink to="/jobs" style={navLinkStyles}>Jobs</NavLink>
            <NavLink to="/candidates" style={navLinkStyles}>Candidates</NavLink>
            <NavLink to="/assessments" style={navLinkStyles}>Assessments</NavLink>
          </div>
        </nav>
        <div style={contentContainerStyles}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/candidates" element={<CandidatesPage />} />
            <Route path="/assessments" element={<AssessmentsPage />} />
            <Route path="/take-assessment/:id" element={<TakeAssessmentPage />} />
            <Route path="/assessments/:jobId" element={<AssessmentBuilder />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;