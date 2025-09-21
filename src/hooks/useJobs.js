import { useState, useEffect } from 'react';

// A mock data source for job skills
const skillsData = {
  'Ethical Hacker': ['Networking', 'Linux', 'Bash', 'Penetration Testing'],
  'Product Manager': ['SQL', 'Databases', 'Market Research', 'Agile Methodologies'],
  'Software Engineer': ['Python', 'JavaScript', 'React', 'Node.js'],
  'Data Scientist': ['Machine Learning', 'Python', 'R', 'Statistics'],
  'UI/UX Designer': ['Figma', 'Sketch', 'User Research', 'Prototyping'],
};

const useJobs = ({ query, status }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/jobs');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const fetchedJobs = await response.json();

                // Add skills and other details to the fetched jobs
                const jobsWithDetails = fetchedJobs.map(job => ({
                    ...job,
                    skills: skillsData[job.title] || [],
                    company: job.company || 'ENTNT:Outsourcing and Offshoring Consulting ',
                    location: job.location || 'Abu Dhabi',
                    salary: job.salary || 'Competitive',
                }));

                let filteredJobs = jobsWithDetails;

                // Filter by search query
                if (query) {
                    filteredJobs = filteredJobs.filter(job =>
                        job.title.toLowerCase().includes(query.toLowerCase()) ||
                        job.description.toLowerCase().includes(query.toLowerCase())
                    );
                }

                // Filter by status
                if (status && status !== 'all') {
                    filteredJobs = filteredJobs.filter(job => job.status === status);
                }
                
                setJobs(filteredJobs);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchJobs();
    }, [query, status]);

    const addJob = async (job) => {
        const newJob = { ...job, id: `job-${Date.now()}` };
        setJobs(prevJobs => [...prevJobs, newJob]);
    };

    const updateJob = async (id, updatedData) => {
        setJobs(prevJobs => prevJobs.map(job => (job.id === id ? updatedData : job)));
    };

    const deleteJob = async (id) => {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
    };

    return { jobs, loading, error, addJob, updateJob, deleteJob };
};

export default useJobs;