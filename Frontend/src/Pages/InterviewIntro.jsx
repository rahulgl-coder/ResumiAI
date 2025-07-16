import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRobot, FaFileAlt, FaRocket } from "react-icons/fa";
import { useSelector } from 'react-redux'; 

const InterviewIntro = () => {
  const navigate = useNavigate();
   const user = useSelector((state) => state.user.user);
   const candidateId=user._id
  const handleStart = () => {
    navigate("/interview");
  };

  const messages = [
    { icon: <FaFileAlt />, text: "We’ve read your resume!" },
    { icon: <FaRobot />, text: "Let’s explore your skills further..." },
    { icon: <FaRocket />, text: "Ready for a quick online test?" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-blue-800 mb-6 text-center"
      >
        Welcome to Your Smart Interview
      </motion.h1>

      <div className="w-full max-w-md space-y-4 mb-6">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.5, duration: 0.6 }}
            className={`flex items-center gap-3 bg-white border border-blue-200 shadow-md px-4 py-3 rounded-xl ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            {msg.icon}
            <span className="text-gray-800">{msg.text}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <button
          onClick={handleStart}
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 text-white rounded-full text-lg font-semibold shadow-lg"
        >
          Start Your Interview
        </button>
      </motion.div>

      <p className="text-sm text-gray-500 mt-4 text-center max-w-md">
        Taking an online test helps assess your real skills fairly and fast—no scheduling, no pressure, just your best.
      </p>
    </div>
  );
};

export default InterviewIntro;
