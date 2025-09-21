import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StageColumn from './StageColumn';
import CandidateCard from './CandidateCard';

const boardStyles = {
    display: 'flex',
    overflowX: 'auto',
    gap: '20px',
    paddingBottom: '20px',
};

const KanbanBoard = ({ candidates, onStageChange, onClick, jobs }) => {
    const stages = ['applied', 'screen', 'tech', 'offer', 'hired', 'rejected'];

    const getCandidatesByStage = (stage) => {
        return candidates.filter(candidate => candidate.stage === stage);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={boardStyles}>
                {stages.map(stage => (
                    <StageColumn key={stage} stage={stage} onStageChange={onStageChange}>
                        {getCandidatesByStage(stage).map(candidate => {
                            const appliedJob = jobs.find(job => job.id === candidate.jobId);
                            const appliedJobTitle = appliedJob ? appliedJob.title : 'N/A';
                            return (
                                <CandidateCard key={candidate.id} candidate={candidate} onClick={onClick} appliedJobTitle={appliedJobTitle} />
                            );
                        })}
                    </StageColumn>
                ))}
            </div>
        </DndProvider>
    );
};

export default KanbanBoard;