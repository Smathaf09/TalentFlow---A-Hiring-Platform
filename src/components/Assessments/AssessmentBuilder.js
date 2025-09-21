import React, { useState, useEffect } from 'react';
import useAssessments from '../../hooks/useAssessments';
import AssessmentPreview from './AssessmentPreview'; // To be created next

const AssessmentBuilder = ({ jobId }) => {
    const { assessment, loading, error, saveAssessment } = useAssessments(jobId);
    const [currentAssessment, setCurrentAssessment] = useState(null);

    useEffect(() => {
        if (assessment) {
            setCurrentAssessment(assessment);
        }
    }, [assessment]);

    if (loading) return <div>Loading assessment...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleAddQuestion = (sectionId) => {
        const newQuestion = {
            id: Date.now(),
            type: 'short-text',
            text: '',
            required: false
        };
        setCurrentAssessment(prev => {
            const newSections = prev.sections.map(section => 
                section.id === sectionId 
                ? { ...section, questions: [...section.questions, newQuestion] }
                : section
            );
            return { ...prev, sections: newSections };
        });
    };

    const handleSave = () => {
        saveAssessment(currentAssessment);
    };

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1, padding: '20px', border: '1px solid #ccc' }}>
                <h2>Assessment Builder</h2>
                {currentAssessment && currentAssessment.sections.map(section => (
                    <div key={section.id}>
                        <h3>{section.title}</h3>
                        {section.questions.map(question => (
                            <div key={question.id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '10px' }}>
                                <p>{question.text}</p>
                            </div>
                        ))}
                        <button onClick={() => handleAddQuestion(section.id)}>Add Question</button>
                    </div>
                ))}
                <button onClick={handleSave}>Save Assessment</button>
            </div>
            <div style={{ flex: 1, padding: '20px', border: '1px solid #ccc' }}>
                <h2>Live Preview</h2>
                {currentAssessment && <AssessmentPreview assessment={currentAssessment} />}
            </div>
        </div>
    );
};

export default AssessmentBuilder;