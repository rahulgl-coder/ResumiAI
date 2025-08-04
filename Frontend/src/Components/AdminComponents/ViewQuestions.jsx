import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'



const ViewQuestions = ({ skills }) => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const BASEURL=import.meta.env.VITE_BASEURL
  const token=useSelector(state=>state.user.token)


  const fetchQuestions = async (skill) => {
    try {
      const res = await axios.get(`${BASEURL}/admin/questions/${skill}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
              
      setQuestions(res.data);
    } catch (err) {
      console.error("Failed to fetch questions", err);
      setQuestions([]);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      
      await axios.delete(`${BASEURL}/admin/questions/${selectedSkill}/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setQuestions(prev => prev.filter(q => q._id !== id));
      setSelectedQuestion(null);
      toast.success("Question deleted successfully")
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    if (selectedSkill) fetchQuestions(selectedSkill);
  }, [selectedSkill]);

 
  


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">View Questions</h2>

   
      <select
        value={selectedSkill}
        onChange={(e) => setSelectedSkill(e.target.value)}
        className="border p-2 rounded mb-6 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
      >
        <option value="">Select a Skill</option>
        {skills.map((skill, index) => (
          <option key={index} value={skill}>
            {skill}
          </option>
        ))}
      </select>


      {questions.length === 0 && selectedSkill && (
        <p className="text-gray-500">No questions found for "{selectedSkill}".</p>
      )}

   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((q) => (
          <div
            key={q.id}
            onClick={() => setSelectedQuestion(q)}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
          >
            <p className="font-bold truncate">{q.question}</p>
        
          </div>
        ))}
      </div>

   
      {selectedQuestion && (
 <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
 

          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">{selectedQuestion.question}</h3>
                     <ul className="list-disc pl-5 mb-4">
              {selectedQuestion.options.map((opt, idx) => (
                <li
                  key={idx}
                  className={`text-sm ${
                    idx === selectedQuestion.correctAnswer
                      ? 'text-green-600 font-semibold'
                      : ''
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>

            <div className="flex justify-between">
              <button
                onClick={() => deleteQuestion(selectedQuestion._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
     
      )}
    </div>
   
  );
};

export default ViewQuestions;
