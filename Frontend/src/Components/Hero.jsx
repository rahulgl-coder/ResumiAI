
import React, { useState } from 'react';
import { FaUpload, FaRobot, FaCheckCircle, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';



const Hero=()=>{
 const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };



   const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      setResume(file);
      alert('Resume uploaded successfully!');
    } else {
      alert('Please upload a valid resume file (PDF, DOC, DOCX).');
    }
  };




    return(
        <>
              <section id="home" className="bg-gradient-to-r from-blue-50 to-teal-50 h-screen flex items-center justify-center text-black">
        <div className="text-center max-w-4xl mx-auto px-4">
          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight"
            variants={headingVariants}
            initial="hidden"
            animate="visible"
          >
            Launch Your Career with Resumi
          </motion.h1>
          <motion.p
            className="text-lg sm:text-2xl mb-8 max-w-2xl mx-auto"
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Submit your resume and get verified with our AI-powered student verification system.
          </motion.p>
          <div className="flex justify-center space-x-4">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              id="resume-upload"
              onChange={handleResumeUpload}
            />
            <motion.label
              htmlFor="resume-upload"
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold flex items-center space-x-2 cursor-pointer hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUpload />
              <span>Upload Resume</span>
            </motion.label>
            <motion.button
              className="bg-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Verify Now
            </motion.button>
          </div>
         <motion.img
  src="https://4.bp.blogspot.com/-dPBsZCgc9-o/XVS3Swg2E6I/AAAAAAAABD0/auWvVjsu-ks1FXLrIohWEGnKswQGnIjeQCLcBGAs/s1600/developer-on-computer.jpg"
  alt="Resume Illustration"
  className="mt-10 mx-auto w-full max-w-md rounded-xl shadow-2xl bg-white/20 backdrop-blur-md p-2"
  initial={{ opacity: 0, scale: 0.8, y: 50 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
/>

        </div>
      </section>
        </>
    )
}


export default Hero;