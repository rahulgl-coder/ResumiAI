
import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import ManageSkills from '../../Components/AdminComponents/ManageSkills';
import ViewQuestions from '../../Components/AdminComponents/ViewQuestions';
import SetQuestions from '../../Components/AdminComponents/SetQuestions';
import axios from 'axios'
import { useSelector } from 'react-redux';

const ManageSkillPage = () => {
  const token=useSelector(state=>state.user.token)
  const [activeTab, setActiveTab] = useState('questions');
  const [skills, setSkills] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    skill: '',
    question: '',
    options: ['', '', '', '', ''],
    correctAnswer: 0,
  });
const [errors, setErrors] = useState({
  skill: '',
  question: '',
  options: ['', '', '', '', ''],
  correctAnswer: '',
});

  const [showSuccess, setShowSuccess] = useState(false);
  const BASEURL= import.meta.env.VITE_BASEURL

useEffect(() => {
    getSkills()
 
  }, [questions, skills]);


const addSkill = async () => {
  try {
    if (newSkill && !skills.includes(newSkill)) {
      const res = await axios.post(
        `${BASEURL}/admin/skill`,
        { skill: newSkill },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSkills([...skills, newSkill]);
      setNewSkill('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  } catch (error) {
    console.error("Error while adding skill:", error);
  }
};


  const deleteSkill = async(skill) => {
  
  try {
     const res = await axios.post(
        `${BASEURL}/admin/skill`,
         skill,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 setSkills(skills.filter((s) => s !== skill));
    
  } catch (error) {
    
  }  
   
    
  };

   const validate = () => {
  const newErrors = {
    skill: '',
    question: '',
    options: ['', '', '', '', ''],
    correctAnswer: '',
  };
  let isValid = true;

  if (!newQuestion.skill.trim()) {
    newErrors.skill = 'Skill is required';
    isValid = false;
  }

  if (!newQuestion.question.trim()) {
    newErrors.question = 'Question is required';
    isValid = false;
  }

  newQuestion.options.forEach((opt, idx) => {
    if (!opt.trim()) {
      newErrors.options[idx] = `Option ${idx + 1} is required`;
      isValid = false;
    }
  });

  if (
    newQuestion.correctAnswer === null ||
    newQuestion.correctAnswer < 0 ||
    newQuestion.correctAnswer >= newQuestion.options.length
  ) {
    newErrors.correctAnswer = 'Select a valid correct answer';
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};


  const addQuestion = async () => {
  if (!validate()) return;

  const res = await axios.post(`${BASEURL}/admin/save_question`, newQuestion, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
};



  const getSkills=async()=>{
try {
 
    const res=await axios.get(`${BASEURL}/admin/getskill`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
    setSkills(res.data)
    
} catch (error) {
    
}
 }

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
  <ManageSkills
    skills={skills}
    newSkill={newSkill}
    setNewSkill={setNewSkill}
    addSkill={addSkill}
    deleteSkill={deleteSkill}
  />
)}

{activeTab === 'view' && (
  <ViewQuestions
 
    skills={skills}
   
  />
)}

        {activeTab === 'questions' && (
          <SetQuestions  newQuestion={newQuestion} setNewQuestion={setNewQuestion}    errors={errors}  skills={skills} addQuestion={addQuestion} /> )}
      </div>
    </div>
    </>
  );
};

export default ManageSkillPage;