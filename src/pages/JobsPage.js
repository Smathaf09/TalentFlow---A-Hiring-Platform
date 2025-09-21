import React, { useState } from 'react';
import JobCard from '../components/jobs/JobCard';
import useJobs from '../hooks/useJobs';
import JobDetailModal from '../components/jobs/JobDetailModal';

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

const searchInputContainerStyles = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  width: '100%',
  maxWidth: '450px',
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

const rightControlsStyles = {
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
};

const jobListStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
};

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);

  const { jobs, loading, error, addJob, updateJob, deleteJob } = useJobs({ query, status: statusFilter });

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

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleAddOrUpdateJob = (jobData) => {
    if (jobData.id) {
      updateJob(jobData.id, jobData);
    } else {
      addJob(jobData);
    }
    setSelectedJob(null);
  };

  const handleDeleteJob = (jobId) => {
    deleteJob(jobId);
    setSelectedJob(null);
  };

  if (loading) return <div style={containerStyles}>Loading jobs...</div>;
  if (error) return <div style={containerStyles}>Error: {error.message}</div>;

  return (
    <div style={containerStyles}>
      <h1 style={headerStyles}>Jobs</h1>
      <div style={controlsContainerStyles}>
        <div style={searchInputContainerStyles}>
          <input
            type="text"
            placeholder="Search jobs..."
            style={searchInputStyles}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearchClick} style={searchButtonStyles}>
            Search
          </button>
        </div>
        <div style={rightControlsStyles}>
          <select style={filterSelectStyles} onChange={handleFilterChange} value={statusFilter}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
          <button
            onClick={() => setSelectedJob({})}
            style={{ ...searchButtonStyles, backgroundColor: '#28a745' }}
          >
            Add Job
          </button>
        </div>
      </div>

      <div style={jobListStyles}>
        {jobs.length > 0 ? (
          jobs.map(job => (
            <JobCard key={job.id} job={job} onClick={() => handleJobClick(job)} />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSave={handleAddOrUpdateJob}
          onDelete={handleDeleteJob}
        />
      )}
    </div>
  );
};

export default JobsPage;