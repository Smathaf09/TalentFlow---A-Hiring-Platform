import React from 'react';
import { useDrag } from 'react-dnd';

const candidateCardStyles = {
  border: '1px solid #e9e9e9',
  padding: '15px',
  borderRadius: '12px',
  marginBottom: '10px',
  backgroundColor: 'white',
  cursor: 'pointer',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.2s ease-in-out',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  ':hover': {
    transform: 'scale(1.02)',
  },
};

const jobTitleStyles = {
  fontSize: '14px',
  color: '#007bff',
  marginTop: '5px',
  fontWeight: '500',
};

const CandidateCard = ({ candidate, onClick, appliedJobTitle }) => {
    const [, drag] = useDrag(() => ({
        type: 'candidate',
        item: { id: candidate.id, originalStage: candidate.stage },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={candidateCardStyles} onClick={() => onClick(candidate)}>
            <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: '600' }}>{candidate.name}</h4>
            <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>{candidate.email}</p>
            {appliedJobTitle && <p style={jobTitleStyles}>Applied for: {appliedJobTitle}</p>}
        </div>
    );
};

export default CandidateCard;