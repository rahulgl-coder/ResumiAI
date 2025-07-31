
import { useState } from "react";
import {React} from "react";
import { Award, Sparkles } from 'lucide-react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'



export const SucessModal=({score,questions})=>{
   
    
    

      const [isSubmitting, setIsSubmitting] = useState(false);
      const BASEURL=import.meta.env.VITE_BASEURL
      const { user,token } = useSelector((state) => state.user);
   

      const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const submissionData = {
        userId:user._id,
        score: score,
        totalQuestions: questions.length,
        percentage: Math.round((score / questions.length) * 100)
      };
      
   
    const res=await axios.post(`${BASEURL}/interview-submition`,submissionData,{
      headers: {
                Authorization: `Bearer ${token}`,
    
      },
    })
    toast.success(res.data.message)
      
    } catch (error) {
      console.error('Error submitting interview:', error);
    //  toast.error(error.data.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  
  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'Excellent work! 🌟';
    if (percentage >= 60) return 'Good job! 👍';
    return 'Keep practicing! 💪';
  };



return(
<>
<div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="mb-6">
            <div className="relative">
              <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute top-0 right-1/3 animate-pulse" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute top-2 left-1/3 animate-pulse delay-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🎉 Interview Complete!</h2>
            <p className="text-gray-600 mb-4">You've successfully completed the technical interview!</p>
            
            {/* Score Display */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className={`text-3xl font-bold mb-2 ${getScoreColor()}`}>
                {score}/{questions.length}
              </div>
              <div className="text-lg text-gray-700 mb-2">
                {Math.round((score / questions.length) * 100)}% Score
              </div>
              <div className="text-sm text-gray-600">
                {getScoreMessage()}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                'Submit Interview'
              )}
            </button>
            
            <div className="text-sm text-gray-500">
              Your responses have been recorded and will be reviewed shortly.
            </div>
          </div>
        </div>
      </div>

</>

)

}