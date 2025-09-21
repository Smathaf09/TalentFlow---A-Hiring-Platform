import { useState, useEffect } from 'react';

const useCandidates = ({ search }) => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/candidates');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const fetchedCandidates = await response.json();

                // Add placeholder details for phone and address, and ensure jobId is present
                const candidatesWithDetails = fetchedCandidates.map(candidate => ({
                    ...candidate,
                    phone: candidate.phone || `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
                    address: candidate.address || `123 Main St, Anytown, USA`,
                    jobId: candidate.jobId || `job-${Math.floor(Math.random() * 5) + 1}`, // Ensure jobId is present
                }));

                const filtered = candidatesWithDetails.filter(candidate =>
                    candidate.name.toLowerCase().includes(search.toLowerCase()) ||
                    candidate.email.toLowerCase().includes(search.toLowerCase())
                );
                
                setCandidates(filtered);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchCandidates();
    }, [search]);

    const updateCandidateStage = (candidateId, newStage) => {
        setCandidates(prevCandidates =>
            prevCandidates.map(candidate =>
                candidate.id === candidateId ? { ...candidate, stage: newStage } : candidate
            )
        );
    };

    return { candidates, loading, error, updateCandidateStage };
};

export default useCandidates;