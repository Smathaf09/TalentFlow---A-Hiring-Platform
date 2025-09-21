import React from 'react';

const AssessmentPreview = ({ assessment }) => {
    if (!assessment) return <div>No assessment to preview.</div>;

    return (
        <div>
            <h2>{assessment.title}</h2>
            {assessment.sections.map(section => (
                <div key={section.id}>
                    <h3>{section.title}</h3>
                    {section.questions.map(question => (
                        <div key={question.id} style={{ marginBottom: '15px' }}>
                            <p><strong>{question.text}</strong></p>
                            {/* Render different input types based on question.type */}
                            {question.type === 'short-text' && <input type="text" />}
                            {question.type === 'long-text' && <textarea rows="4" />}
                            {question.type === 'single-choice' && (
                                <div>
                                    {question.options.map(option => (
                                        <div key={option}>
                                            <input type="radio" name={question.id} value={option} /> {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* Add other question types here */}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AssessmentPreview;