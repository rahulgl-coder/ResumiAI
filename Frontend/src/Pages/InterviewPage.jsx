import { useEffect, useState, useRef } from 'react';
import { Clock, SkipForward, CheckCircle, Award, Sparkles, CircleDot } from 'lucide-react';
import { SucessModal } from '../Components/InterviewCompletionModal';
import { InterviewLoader } from '../Components/InterviewLoading';
import AssessmentWarning from '../Components/AssesmentWarning';
import axios from 'axios'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Interview = () => {
  const { token } = useSelector((state) => state.user);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const BASEURL=import.meta.env.VITE_BASEURL
  const alreadyCalled = useRef(false);
  const navigate=useNavigate()
  const timerRef = useRef(null);

 
  
  

  useEffect(() => {
    if (alreadyCalled.current) return;
    alreadyCalled.current = true;
   const res= fetchQuestions();

   console.log(res);
   

//    if (res) {
//     toast.error("Upload resume for interview")
// navigate('/')
    
//    }
  }, []);

  useEffect(() => {
    if (questions.length > 0 && current < questions.length) {
      startTimer();
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [current, questions.length]);

const fetchQuestions = async () => {
  try {
    setIsLoading(true);

    let res;

   
    try {
      res = await axios.get(`${BASEURL}/questions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.data || !res.data.questions || res.data.questions.length === 0) {
        throw new Error('Invalid or empty response from /questions');
      }
    } catch (err) {
      console.warn('Primary endpoint failed. Using backup.');

      res = await axios.get(`${BASEURL}/questions/backup`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    setQuestions(res.data.questions);
    setAnswers(new Array(res.data.questions.length).fill(null));
    return res.data.questions
  } catch (error) {
    console.error('Error fetching questions from both sources:', error);
  } finally {
    setIsLoading(false);
  }
};


  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTimeLeft(15);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleNext = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }


    const newAnswers = [...answers];
    newAnswers[current] = selectedOption;
    setAnswers(newAnswers);
    
    

    if (current + 1 >= questions.length) {
      // Calculate score
      calculateScore(newAnswers);
      setShowCompletionModal(true);
    } else {
      // Move to next question
      setCurrent(current + 1);
      setSelectedOption(null);
    }
  };

  const calculateScore = (finalAnswers) => {
    let correctCount = 0;
    finalAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  

  const getTimerColor = () => {
    if (timeLeft <= 3) return 'text-red-500';
    if (timeLeft <= 5) return 'text-orange-500';
    return 'text-green-500';
  };

  const getProgressPercentage = () => {
    return ((current + 1) / questions.length) * 100;
  };


  if (isLoading) {
    return (
      <InterviewLoader/>
    );
  }


  if (showCompletionModal) {
    return (
     <>
      <SucessModal score={score} questions={questions}/>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
      
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Technical Interview</h1>
          <p className="text-gray-600">Choose the correct answer for each question. You have 10 seconds per question.</p>
          <AssessmentWarning seconds={15} />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {current + 1} of {questions.length}</span>
            <span>{Math.round(getProgressPercentage())}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Main Interview Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Timer */}
          <div className="flex items-center justify-center mb-6">
            <div className={`flex items-center space-x-2 ${getTimerColor()}`}>
              <Clock className="w-6 h-6" />
              <span className="text-2xl font-bold">{timeLeft}s</span>
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Question {current + 1}:
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-gray-700 text-lg leading-relaxed">
                {questions[current]?.question}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-4">
              Select your answer:
            </label>
            <div className="space-y-3">
              {questions[current]?.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedOption === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedOption === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedOption === index && (
                        <CircleDot className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-gray-700 font-medium">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleSkip}
              className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-200"
            >
              <SkipForward className="w-5 h-5" />
              <span>Skip Question</span>
            </button>

            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-5 h-5" />
              <span>
                {current + 1 === questions.length ? 'Finish' : 'Next Question'}
              </span>
            </button>
          </div>
        </div>

        {/* Question Navigation */}
        {/* <div className="mt-8 bg-white rounded-lg shadow-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Question Overview:</h4>
          <div className="flex flex-wrap gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index < current
                    ? 'bg-green-500 text-white'
                    : index === current
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Interview;