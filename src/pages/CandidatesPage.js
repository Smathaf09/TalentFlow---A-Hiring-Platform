import React, { useState } from 'react';
import CandidateList from '../components/candidates/CandidateList';
import KanbanBoard from '../components/candidates/KanbanBoard';
import CandidateDetailModal from '../components/candidates/CandidateDetailModal';
import useCandidates from '../hooks/useCandidates';
import useJobs from '../hooks/useJobs';

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

const controlsContainerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  gap: '15px',
};

const viewToggleStyles = {
  display: 'flex',
  gap: '10px',
};

const viewButtonStyles = (isActive) => ({
  padding: '12px 20px',
  borderRadius: '25px',
  border: '1px solid #007bff',
  backgroundColor: isActive ? '#007bff' : 'transparent',
  color: isActive ? 'white' : '#007bff',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  ':hover': {
    backgroundColor: isActive ? '#0056b3' : '#e0f0ff',
    color: isActive ? 'white' : '#007bff',
  },
});

const searchInputStyles = {
  flexGrow: 1,
  padding: '12px 20px',
  borderRadius: '25px',
  border: '1px solid #ccc',
  fontSize: '16px',
  outline: 'none',
  transition: 'border-color 0.3s',
  maxWidth: '400px',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
};

const CandidatesPage = () => {
    const [search, setSearch] = useState('');
    const [view, setView] = useState('kanban');
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const { candidates, loading, error, updateCandidateStage } = useCandidates({ search });
    const { jobs } = useJobs({}); // Fetch jobs data

    const handleCandidateClick = (candidate) => {
        setSelectedCandidate(candidate);
    };

    const handleUpdateCandidate = (id, data) => {
        updateCandidateStage(id, data.stage);
        setSelectedCandidate(null);
    };

    if (loading) return <div style={containerStyles}>Loading candidates...</div>;
    if (error) return <div style={containerStyles}>Error: {error.message}</div>;

    return (
        <div style={containerStyles}>
            <h1 style={headerStyles}>Candidates</h1>
            <div style={controlsContainerStyles}>
                <div style={viewToggleStyles}>
                    <button
                        onClick={() => setView('list')}
                        style={viewButtonStyles(view === 'list')}
                    >
                        List View
                    </button>
                    <button
                        onClick={() => setView('kanban')}
                        style={viewButtonStyles(view === 'kanban')}
                    >
                        Kanban View
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    style={searchInputStyles}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {view === 'list' ? (
                <CandidateList candidates={candidates} jobs={jobs} onClick={handleCandidateClick} />
            ) : (
                <KanbanBoard candidates={candidates} jobs={jobs} onStageChange={updateCandidateStage} onClick={handleCandidateClick} />
            )}

            {selectedCandidate && (
                <CandidateDetailModal
                    candidate={selectedCandidate}
                    jobs={jobs}
                    onClose={() => setSelectedCandidate(null)}
                    onUpdate={handleUpdateCandidate}
                />
            )}
        </div>
    );
};

export default CandidatesPage;