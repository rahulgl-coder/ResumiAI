
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const [skills, setSkills] = useState(['JavaScript', 'CSS', 'React', 'Algorithms']);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      skill: 'Algorithms',
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)', 'O(n log n)'],
      correctAnswer: 1,
    },
    {
      id: 2,
      skill: 'JavaScript',
      question: 'Which of the following is NOT a JavaScript primitive data type?',
      options: ['String', 'Number', 'Boolean', 'Array', 'Symbol'],
      correctAnswer: 3,
    },
    {
      id: 3,
      skill: 'CSS',
      question: 'What does CSS stand for?',
      options: [
        'Computer Style Sheets',
        'Cascading Style Sheets',
        'Creative Style Sheets',
        'Colorful Style Sheets',
        'Custom Style Sheets',
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      skill: 'HTTP',
      question: 'Which HTTP method is idempotent?',
      options: ['POST', 'PATCH', 'PUT', 'DELETE', 'Both PUT and DELETE'],
      correctAnswer: 4,
    },
    {
      id: 5,
      skill: 'React',
      question: 'What is the purpose of React\'s useEffect hook?',
      options: [
        'To manage component state',
        'To handle side effects',
        'To create components',
        'To style components',
        'To optimize performance',
      ],
      correctAnswer: 1,
    },
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    skill: '',
    question: '',
    options: ['', '', '', '', ''],
    correctAnswer: 0,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulate backend with localStorage
  useEffect(() => {
    // localStorage.setItem('questions', JSON.stringify(questions));
    // localStorage.setItem('skills', JSON.stringify(skills));
  }, [questions, skills]);

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const deleteSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
    setQuestions(questions.filter((q) => q.skill !== skill));
  };

  const addQuestion = () => {
    if (
      newQuestion.skill &&
      newQuestion.question &&
      newQuestion.options.every((opt) => opt) &&
      newQuestion.correctAnswer >= 0 &&
      newQuestion.correctAnswer < newQuestion.options.length
    ) {
      setQuestions([
        ...questions,
        {
          id: questions.length + 1,
          ...newQuestion,
        },
      ]);
      setNewQuestion({
        skill: '',
        question: '',
        options: ['', '', '', '', ''],
        correctAnswer: 0,
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
<>
    <Navbar />

    <div className="flex min-h-screen mt-16 bg-gradient-to-r  from-blue-50 to-teal-50 ">
      {/* Sidebar */}
    <div className="w-64 p-6 flex flex-col slide-in gap-5">
     
        <button
          className={`p-2 mb-2 rounded-3xl ${
            activeTab === 'questions' ? 'bg-black text-white' : 'text-black'
          } hover:bg-black hover:text-white transition`}
          onClick={() => setActiveTab('questions')}
        >
          Manage Questions
        </button>
        <button
          className={`p-2 rounded-2xl t ${
            activeTab === 'skills' ? 'bg-black text-white' : 'text-black'
          } hover:bg-black hover:text-white transition`}
          onClick={() => setActiveTab('skills')}
        >
          Manage Skills
        </button>
         <button
          className={`p-2 rounded-2xl t ${
            activeTab === 'view' ? 'bg-black text-white' : 'text-black'
          } hover:bg-black hover:text-white transition`}
          onClick={() => setActiveTab('view')}
        >
          View Questions
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {showSuccess && (
          <div className="fixed top-4 right-4 fade-in bg-green-500 text-white p-3 rounded-lg shadow-lg flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Success!
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="fade-in">
            <h2 className="text-3xl font-bold mb-6">Manage Skills</h2>
            <div className="flex mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter new skill"
                className="border p-2 rounded flex-1 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <button
                onClick={addSkill}
                className="bg-white-600 text-black font-bold rounded-8 p-2 rounded hover:bg-black hover:text-white transition"
              >
                Add Skill
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-white p-4 rounded shadow hover:shadow-lg transition slide-in"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => deleteSkill(skill)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

         {activeTab === 'view' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white p-4 rounded shadow hover:shadow-lg transition slide-in"
                >
                  <p className="font-bold">{q.question}</p>
                  <p className="text-sm text-gray-500">Skill: {q.skill}</p>
                  <ul className="list-disc pl-5">
                    {q.options.map((opt, idx) => (
                      <li
                        key={idx}
                        className={idx === q.correctAnswer ? 'text-green-600' : ''}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => deleteQuestion(q.id)}
                    className="mt-2 text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
        )}

        {activeTab === 'questions' && (
          <div className="">
            <h2 className="text-3xl font-bold mb-6">Manage Questions</h2>
            <div className="  p-6 rounded  mb-6">
              <select
                value={newQuestion.skill}
                onChange={(e) => setNewQuestion({ ...newQuestion, skill: e.target.value })}
                className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="">Select Skill</option>
                {skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                placeholder="Enter question"
                className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {newQuestion.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...newQuestion.options];
                    updatedOptions[index] = e.target.value;
                    setNewQuestion({ ...newQuestion, options: updatedOptions });
                  }}
                  placeholder={`Option ${index + 1}`}
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              ))}
              <select
                value={newQuestion.correctAnswer}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, correctAnswer: parseInt(e.target.value) })
                }
                className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {newQuestion.options.map((_, index) => (
                  <option key={index} value={index}>
                    Option {index + 1}
                  </option>
                ))}
              </select>
              <button
                onClick={addQuestion}
                className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
              >
                Add Question
              </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default AdminPanel;