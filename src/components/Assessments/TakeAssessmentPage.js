// src/pages/TakeAssessmentPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAssessments from '../../hooks/useAssessments';

const containerStyles = {
    padding: '40px',
    backgroundColor: '#f4f7f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
};

const assessmentBoxStyles = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
};

const questionBoxStyles = {
    marginBottom: '25px',
};

const questionTextStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '15px',
};

const optionStyles = {
    backgroundColor: '#f9f9f9',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.2s, border-color 0.2s',
};

const selectedOptionStyles = {
    backgroundColor: '#e6f7ff',
    borderColor: '#007bff',
    fontWeight: 'bold',
};

const buttonStyles = {
    padding: '12px 25px',
    borderRadius: '25px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
};

const timerStyles = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: '20px',
};

const resultStyles = {
    textAlign: 'center',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
};

const resultTitleStyles = {
    fontSize: '32px',
    color: '#2c3e50',
    marginBottom: '20px',
};

const scoreStyles = {
    fontSize: '48px',
    color: '#28a745',
    fontWeight: 'bold',
    marginBottom: '15px',
};

const resultDetailStyles = {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
};

const TakeAssessmentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { assessments, getQuestions } = useAssessments({});
    
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);

    useEffect(() => {
        const assessmentQuestions = getQuestions(id);
        if (assessmentQuestions.length > 0) {
            setQuestions(assessmentQuestions);
        } else {
            // Handle case where assessment ID is invalid
            navigate('/assessments');
        }
    }, [id, getQuestions, navigate]);

    useEffect(() => {
        if (timeRemaining <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining]);

    const handleOptionSelect = (option) => {
        setAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        let correctCount = 0;
        let wrongCount = 0;
        let unansweredCount = 0;
        const wrongAnswers = [];
        const unattendedQuestions = [];

        questions.forEach((q, index) => {
            if (answers[index] === undefined) {
                unansweredCount++;
                unattendedQuestions.push(q);
            } else if (answers[index] === q.answer) {
                correctCount++;
            } else {
                wrongCount++;
                wrongAnswers.push({ question: q.q, selected: answers[index], correct: q.answer });
            }
        });

        setResults({
            score: correctCount,
            total: questions.length,
            wrong: wrongCount,
            unanswered: unansweredCount,
            wrongAnswers,
            unattendedQuestions,
        });

        setShowResults(true);
    };

    if (showResults) {
        return (
            <div style={containerStyles}>
                <div style={resultStyles}>
                    <h2 style={resultTitleStyles}>Assessment Completed!</h2>
                    <p style={scoreStyles}>{results.score} / {results.total}</p>
                    <p style={resultDetailStyles}>Correct Answers: {results.score}</p>
                    <p style={resultDetailStyles}>Wrong Answers: {results.wrong}</p>
                    <p style={resultDetailStyles}>Unanswered Questions: {results.unanswered}</p>
                    <button onClick={() => navigate('/assessments')} style={{ ...buttonStyles, marginTop: '20px' }}>
                        Go to Assessments Page
                    </button>
                </div>
            </div>
        );
    }

    if (questions.length === 0) return <div style={containerStyles}>Loading assessment...</div>;

    const currentQuestion = questions[currentQuestionIndex];
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <div style={containerStyles}>
            <div style={assessmentBoxStyles}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '24px' }}>Question {currentQuestionIndex + 1} of {questions.length}</h2>
                    <p style={timerStyles}>Time: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
                </div>
                <div style={questionBoxStyles}>
                    <p style={questionTextStyles}>{currentQuestion.q}</p>
                    <div>
                        {currentQuestion.options.map((option, index) => (
                            <div
                                key={index}
                                style={{
                                    ...optionStyles,
                                    ...(answers[currentQuestionIndex] === option ? selectedOptionStyles : {})
                                }}
                                onClick={() => handleOptionSelect(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <button onClick={handlePrevious} style={buttonStyles} disabled={currentQuestionIndex === 0}>
                        Previous
                    </button>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <button onClick={handleNext} style={buttonStyles}>
                            Next
                        </button>
                    ) : (
                        <button onClick={handleSubmit} style={{ ...buttonStyles, backgroundColor: '#28a745' }}>
                            Submit Assessment
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TakeAssessmentPage;