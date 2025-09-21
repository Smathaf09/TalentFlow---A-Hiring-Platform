import React from 'react';
import { useDrop } from 'react-dnd';

const stageColumnStyles = {
  minWidth: '280px',
  backgroundColor: '#f4f5f7',
  padding: '15px',
  borderRadius: '12px',
  flexShrink: 0,
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
};

const stageTitleStyles = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#2c3e50',
  textTransform: 'uppercase',
  marginBottom: '15px',
  borderBottom: '2px solid #ddd',
  paddingBottom: '10px',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
};

const StageColumn = ({ stage, onStageChange, children }) => {
    const [, drop] = useDrop(() => ({
        accept: 'candidate',
        drop: (item) => {
            if (item.originalStage !== stage) {
                onStageChange(item.id, stage);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} style={stageColumnStyles}>
            <h3 style={stageTitleStyles}>{stage}</h3>
            <div style={{ minHeight: '100px' }}>
                {children}
            </div>
        </div>
    );
};

export default StageColumn;