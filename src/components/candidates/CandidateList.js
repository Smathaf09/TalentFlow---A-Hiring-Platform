import React from 'react';
import { List } from 'react-window';
import CandidateCard from './CandidateCard';

const CandidateList = ({ candidates }) => {
  if (!candidates || candidates.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p style={{ fontSize: '18px', color: '#7f8c8d' }}>No candidates found.</p>
      </div>
    );
  }

  const Row = ({ index, style }) => {
    const candidate = candidates[index];
    return (
      <div style={style}>
        <CandidateCard candidate={candidate} />
      </div>
    );
  };

  return (
    <List
      height={800}
      itemCount={candidates.length}
      itemSize={100}
      width="100%"
    >
      {Row}
    </List>
  );
};

export default CandidateList;