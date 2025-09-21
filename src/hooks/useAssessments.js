// src/hooks/useAssessments.js
import { useState, useEffect } from 'react';

// Mock data for assessments
const mockAssessments = [
    { id: 'asm-1', title: 'Frontend Developer Assessment', jobId: 'job-1', candidatesCount: 15, status: 'Active', dueDate: '2025-10-25', description: 'Technical assessment for React/JavaScript skills.' },
    { id: 'asm-2', title: 'Backend Engineer Coding Challenge', jobId: 'job-2', candidatesCount: 10, status: 'Draft', dueDate: '2025-12-15', description: 'Coding challenge for Python/Node.js backend roles.' },
    { id: 'asm-3', title: 'Product Manager Interview Guide', jobId: 'job-3', candidatesCount: 5, status: 'Completed', dueDate: '2023-11-30', description: 'Behavioral and product sense interview questions.' },
    { id: 'asm-4', title: 'Data Scientist Technical Review', jobId: 'job-4', candidatesCount: 8, status: 'Active', dueDate: '2026-02-10', description: 'Assessment covering statistics, ML, and data manipulation.' },
    { id: 'asm-5', title: 'UI/UX Design Portfolio Review', jobId: 'job-5', candidatesCount: 12, status: 'Draft', dueDate: '2026-02-28', description: 'Review of design principles and portfolio projects.' },
];

// Mock data for questions (at least 3 assessments with 10+ questions each)
const mockQuestions = {
  'asm-1': [
    { q: 'What is JSX?', options: ['A superset of JavaScript', 'A syntax extension for React', 'A new programming language', 'A type of CSS'], answer: 'A syntax extension for React' },
    { q: 'What is the purpose of a `key` prop in React lists?', options: ['To give components a unique name', 'To tell React which items have changed, are added, or are removed', 'To allow CSS styling', 'To define a component\'s type'], answer: 'To tell React which items have changed, are added, or are removed' },
    { q: 'How do you create a React functional component?', options: ['Using a class that extends `React.Component`', 'By defining a function that returns JSX', 'By using the `create-react-app` command', 'With the `<component>` tag'], answer: 'By defining a function that returns JSX' },
    { q: 'Which hook is used for side effects in a functional component?', options: ['useState', 'useEffect', 'useContext', 'useReducer'], answer: 'useEffect' },
    { q: 'What is a "Higher-Order Component" (HOC)?', options: ['A component that renders another component', 'A function that takes a component and returns a new component', 'A component with a higher priority', 'A component with multiple children'], answer: 'A function that takes a component and returns a new component' },
    { q: 'What is the virtual DOM?', options: ['A faster version of the DOM', 'A lightweight copy of the DOM', 'A feature in JavaScript for rendering elements', 'A type of database'], answer: 'A lightweight copy of the DOM' },
    { q: 'How do you prevent a component from re-rendering?', options: ['By using `React.memo`', 'By calling `return false` in the component', 'By wrapping it in an `<OptimizedComponent>` tag', 'You cannot prevent re-renders'], answer: 'By using `React.memo`' },
    { q: 'What is the purpose of `useReducer`?', options: ['To manage complex state logic', 'To reduce the size of a component', 'To manage side effects', 'To handle form submissions'], answer: 'To manage complex state logic' },
    { q: 'What does the `...` syntax do in React?', options: ['It spreads an array into a list of elements', 'It represents optional arguments', 'It creates a new object', 'It combines an object with another'], answer: 'It spreads an array into a list of elements' },
    { q: 'In React, what is the significance of the `children` prop?', options: ['It is a mandatory prop for every component', 'It holds all the data of a parent component', 'It is a special prop that automatically passes down elements between a component\'s opening and closing tags', 'It is a prop used to define a component\'s parent'], answer: 'It is a special prop that automatically passes down elements between a component\'s opening and closing tags' },
    { q: 'Which lifecycle method is used for cleanup in a class component?', options: ['componentDidMount', 'componentWillUnmount', 'render', 'shouldComponentUpdate'], answer: 'componentWillUnmount' },
  ],
  'asm-4': [
    { q: 'What is an array?', options: ['A collection of functions', 'A collection of key-value pairs', 'An ordered list of values', 'A data type that stores a single value'], answer: 'An ordered list of values' },
    { q: 'How do you declare a variable in JavaScript?', options: ['let, var, const', 'int, float, string', 'type, variable, assign', 'create, use, set'], answer: 'let, var, const' },
    { q: 'What is the `this` keyword in JavaScript?', options: ['It refers to the current function', 'It refers to the object it belongs to', 'It refers to a new instance of a class', 'It is a reserved keyword for loops'], answer: 'It refers to the object it belongs to' },
    { q: 'What is a closure?', options: ['A function bundled with its lexical scope', 'A function that is only called once', 'A way to close a program', 'A type of loop'], answer: 'A function bundled with its lexical scope' },
    { q: 'What is event delegation?', options: ['A way to handle events on multiple elements using a single handler on a parent element', 'A function that passes events to another function', 'A process of copying events from one element to another', 'A method to prevent event propagation'], answer: 'A way to handle events on multiple elements using a single handler on a parent element' },
    { q: 'What is the purpose of `async/await`?', options: ['To create asynchronous functions that are easier to read and write', 'To make a function run faster', 'To add a new thread to the application', 'To declare a new variable'], answer: 'To create asynchronous functions that are easier to read and write' },
    { q: 'What is a promise?', options: ['An object representing the eventual completion or failure of an asynchronous operation', 'A type of variable that stores a string', 'A guarantee that a function will not throw an error', 'A function that returns a boolean'], answer: 'An object representing the eventual completion or failure of an asynchronous operation' },
    { q: 'What is the difference between `==` and `===`?', options: ['`==` compares value and type, while `===` only compares value', '`==` is for numbers, `===` is for strings', '`==` compares only value, while `===` compares both value and type', 'There is no difference'], answer: '`==` compares only value, while `===` compares both value and type' },
    { q: 'What is hoisting?', options: ['A mechanism where variables and function declarations are moved to the top of their scope before code execution', 'A process of lifting elements in the DOM', 'A way to move a file in a directory', 'A feature to elevate a user\'s permissions'], answer: 'A mechanism where variables and function declarations are moved to the top of their scope before code execution' },
    { q: 'What is the purpose of the `map()` method?', options: ['To iterate over an array and execute a function on each element', 'To create a new array with the results of calling a provided function on every element', 'To add new elements to an array', 'To remove elements from an array'], answer: 'To create a new array with the results of calling a provided function on every element' },
  ],
  'asm-2': [
    { q: 'What is a virtual environment in Python?', options: ['A lightweight, isolated Python installation', 'A way to run Python code on a virtual machine', 'A tool for managing server connections', 'A built-in feature of Python\'s standard library'], answer: 'A lightweight, isolated Python installation' },
    { q: 'How do you install a package using pip?', options: ['npm install package-name', 'pip get package-name', 'pip install package-name', 'python install package-name'], answer: 'pip install package-name' },
    { q: 'What is the purpose of `Flask`?', options: ['A machine learning library', 'A micro web framework for Python', 'A data analysis tool', 'A network security protocol'], answer: 'A micro web framework for Python' },
    { q: 'What is an ORM?', options: ['Object-Relational Mapping', 'Operational Resource Management', 'Object Rendering Module', 'Open Resource Model'], answer: 'Object-Relational Mapping' },
    { q: 'What is the purpose of `__init__.py`?', options: ['It marks a directory as a Python package', 'It is the main entry point for a script', 'It initializes a class instance', 'It defines a Python module'], answer: 'It marks a directory as a Python package' },
    { q: 'What does `yield` do in a Python generator?', options: ['It returns a value and continues execution from where it left off', 'It returns a value and exits the function', 'It creates a new function', 'It is used to define a class'], answer: 'It returns a value and continues execution from where it left off' },
    { q: 'What is the difference between a list and a tuple?', options: ['Lists are immutable, tuples are mutable', 'Lists are mutable, tuples are immutable', 'Lists are faster than tuples', 'Tuples can contain different data types, lists cannot'], answer: 'Lists are mutable, tuples are immutable' },
    { q: 'How do you handle errors in Python?', options: ['With `try...except` blocks', 'With `error.handle()`', 'With `catch` statements', 'With `if/else` conditions'], answer: 'With `try...except` blocks' },
    { q: 'What is a decorator?', options: ['A function that modifies the behavior of another function without permanently altering it', 'A design pattern for creating objects', 'A type of variable that stores a function', 'A tool for debugging code'], answer: 'A function that modifies the behavior of another function without permanently altering it' },
    { q: 'What is the `asyncio` module used for?', options: ['Asynchronous programming', 'Synchronous programming', 'Multi-threading', 'Multi-processing'], answer: 'Asynchronous programming' },
  ]
};

const useAssessments = ({ search = '', status = 'all' }) => {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));

                let filtered = mockAssessments.filter(assessment =>
                    assessment.title.toLowerCase().includes(search.toLowerCase()) ||
                    assessment.description.toLowerCase().includes(search.toLowerCase())
                );

                if (status !== 'all') {
                    filtered = filtered.filter(assessment => assessment.status.toLowerCase() === status.toLowerCase());
                }

                setAssessments(filtered);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchAssessments();
    }, [search, status]);

    const getQuestions = (assessmentId) => {
        return mockQuestions[assessmentId] || [];
    };

    const addAssessment = (newAssessment) => {
        setAssessments(prev => [...prev, { ...newAssessment, id: `asm-${Date.now()}` }]);
    };

    const updateAssessment = (id, updatedData) => {
        setAssessments(prev => prev.map(asm => (asm.id === id ? { ...asm, ...updatedData } : asm)));
    };

    const deleteAssessment = (id) => {
        setAssessments(prev => prev.filter(asm => asm.id !== id));
    };

    return { assessments, loading, error, addAssessment, updateAssessment, deleteAssessment, getQuestions };
};

export default useAssessments;