// src/pages/AssessmentsPage.jsx
import React, { useState } from 'react';
import useAssessments from '../hooks/useAssessments';
import useJobs from '../hooks/useJobs'; // For linking assessments to jobs
import AssessmentCard from '../components/Assessments/AssessmentCard';
import AssessmentDetailModal from '../components/Assessments/AssessmentDetailModal';

// --- Styles (similar to JobsPage for consistency) ---
const containerStyles = {
  padding: '20px',
  backgroundColor: '#f4f7f9',
  minHeight: 'calc(100vh - 80px)',
};

const headerStyles = {
  fontSize: '32px',
  fontWeight: '600',
  color: '#2c3e50',
  fontFamily: '"Montserrat", sans-serif',
  marginBottom: '20px',
};

const summaryCardsContainerStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
  marginBottom: '30px',
};

const summaryCardStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  textAlign: 'center',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
};

const summaryCardTitleStyles = {
  fontSize: '16px',
  color: '#7f8c8d',
  marginBottom: '10px',
};

const summaryCardValueStyles = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#2c3e50',
};

const controlsContainerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  gap: '15px',
};

const searchInputContainerStyles = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  flexGrow: 1, 
  maxWidth: '500px', 
};

const searchInputStyles = {
  flexGrow: 1,
  padding: '12px 20px',
  borderRadius: '25px',
  border: '1px solid #ccc',
  fontSize: '16px',
  outline: 'none',
  transition: 'border-color 0.3s',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
};

const searchButtonStyles = {
  padding: '12px 25px',
  borderRadius: '25px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  ':hover': {
    backgroundColor: '#0056b3',
  },
};

const filterSelectStyles = {
  padding: '12px 20px',
  borderRadius: '25px',
  border: '1px solid #ccc',
  fontSize: '16px',
  outline: 'none',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
};

const actionButtonsContainerStyles = {
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
};

const assessmentListStyles = {
  display: 'grid', 
  gridTemplateColumns: '1fr', 
  gap: '15px',
};


const AssessmentsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedAssessment, setSelectedAssessment] = useState(null);

    const { assessments, loading, error, addAssessment, updateAssessment, deleteAssessment } = useAssessments({ search: query, status: statusFilter });
    const { jobs } = useJobs({}); // IMPORTANT: Pass an empty object to useJobs to avoid error

    // --- Handlers ---
    const handleSearchClick = () => {
      setQuery(searchTerm);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const handleAssessmentClick = (assessment) => {
        setSelectedAssessment(assessment);
    };

    const handleAddOrUpdateAssessment = (assessmentData) => {
        if (assessmentData.id) {
            updateAssessment(assessmentData.id, assessmentData);
        } else {
            addAssessment(assessmentData);
        }
        setSelectedAssessment(null); // Close modal
    };

    const handleDeleteAssessment = (id) => {
        deleteAssessment(id);
        setSelectedAssessment(null); // Close modal
    };

    // --- Summary Metrics ---
    const totalAssessments = assessments.length;
    const activeAssessments = assessments.filter(a => a.status === 'Active').length;
    const draftAssessments = assessments.filter(a => a.status === 'Draft').length;
    const completedAssessments = assessments.filter(a => a.status === 'Completed').length;


    // --- Loading/Error States ---
    if (loading) return <div style={containerStyles}>Loading assessments...</div>;
    if (error) return <div style={containerStyles}>Error: {error.message}</div>;

    return (
        <div style={containerStyles}>
            <h1 style={headerStyles}>Assessments</h1>

            {/* Summary Cards */}
            <div style={summaryCardsContainerStyles}>
                <div style={summaryCardStyles}>
                    <p style={summaryCardTitleStyles}>Total Assessments</p>
                    <p style={summaryCardValueStyles}>{totalAssessments}</p>
                </div>
                <div style={summaryCardStyles}>
                    <p style={summaryCardTitleStyles}>Active</p>
                    <p style={summaryCardValueStyles}>{activeAssessments}</p>
                </div>
                <div style={summaryCardStyles}>
                    <p style={summaryCardTitleStyles}>Draft</p>
                    <p style={summaryCardValueStyles}>{draftAssessments}</p>
                </div>
                <div style={summaryCardStyles}>
                    <p style={summaryCardTitleStyles}>Completed</p>
                    <p style={summaryCardValueStyles}>{completedAssessments}</p>
                </div>
            </div>

            {/* Controls: Search, Filter, Add Button */}
            <div style={controlsContainerStyles}>
                <div style={searchInputContainerStyles}>
                    <input
                        type="text"
                        placeholder="Search assessments..."
                        style={searchInputStyles}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSearchClick} style={searchButtonStyles}>
                        Search
                    </button>
                </div>
                <div style={actionButtonsContainerStyles}>
                    <select style={filterSelectStyles} onChange={handleFilterChange} value={statusFilter}>
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button
                        onClick={() => setSelectedAssessment({})} // Pass empty object for new assessment
                        style={{ ...searchButtonStyles, backgroundColor: '#28a745' }}
                    >
                        Add New Assessment
                    </button>
                </div>
            </div>

            {/* Assessment List */}
            <div style={assessmentListStyles}>
                {assessments.length > 0 ? (
                    assessments.map(assessment => (
                        <AssessmentCard 
                            key={assessment.id} 
                            assessment={assessment} 
                            onClick={handleAssessmentClick}
                            onEdit={handleAssessmentClick} // Re-use click for edit
                            onDelete={handleDeleteAssessment}
                        />
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#7f8c8d' }}>No assessments found.</p>
                )}
            </div>

            {/* Assessment Detail Modal */}
            {selectedAssessment && (
                <AssessmentDetailModal
                    assessment={selectedAssessment}
                    jobs={jobs} // Pass jobs to link assessment to a job title
                    onClose={() => setSelectedAssessment(null)}
                    onSave={handleAddOrUpdateAssessment}
                    onDelete={handleDeleteAssessment}
                />
            )}
        </div>
    );
};

export default AssessmentsPage;