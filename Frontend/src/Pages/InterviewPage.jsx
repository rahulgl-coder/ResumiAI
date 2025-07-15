import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Interview = () => {
  const { candidateId } = useParams(); 

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const BASEURL=import.meta.env.VITE_BASEURL

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/questions/${candidateId}`)
//       .then(res => setQuestions(res.data.questions));
//   }, [candidateId]);

  useEffect(() => {
    if (timeLeft === 0) handleNext();
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleNext = () => {
    setAnswers([...answers, { question: questions[current], answer: "" }]);
    setCurrent(current + 1);
    setTimeLeft(30);
  };

  const handleAnswerChange = (e) => {
    answers[current] = { question: questions[current], answer: e.target.value };
    setAnswers([...answers]);
  };

  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/api/interview/submit', {
      candidateId,
      answers,
    });
    alert("Interview submitted!");
  };

  if (!questions.length) return <p>Loading questions...</p>;
  if (current >= questions.length) return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Interview Completed</h2>
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Submit Answers
      </button>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Question {current + 1}:</h3>
      <p className="mb-2">{questions[current]}</p>
      <p className="text-sm text-red-600 mb-3">Time left: {timeLeft}s</p>
      <textarea className="w-full border p-2 mb-3"
        rows={4} onChange={handleAnswerChange}></textarea>
      <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">
        Next
      </button>
    </div>
  );
};

export default Interview;
