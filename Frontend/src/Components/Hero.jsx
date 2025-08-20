


import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ResumeModal from './ResumeModal';
 import Title from './ResumeTitle';

const Hero = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setSelectedFile(null);
    setShowModal(false);
  };

  return (

 
 <section
  id="hero"
  className="min-h-screen flex items-center justify-center bg-gray-50 text-center"
>
  <div className="text-center max-w-4xl mx-auto px-4 z-20 "> 
         <motion.h1
           className="text-4xl sm:text-6xl font-extrabold mb-6"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
         transition={{ duration: 1 }}
         >
         Launch Your Career with <Title target="Resumi" />
        </motion.h1>
        <motion.p
          className="text-lg sm:text-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Upload your resume to get verified instantly!
        </motion.p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            id="resume-upload"
            onChange={handleFileChange}
          />
          <motion.label
            htmlFor="resume-upload"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold flex items-center space-x-2 cursor-pointer hover:bg-gray-100 z-20"
            whileHover={{ scale: 1.05 }}
          >
            <FaUpload />
            <span>{selectedFile ? selectedFile.name : 'Upload Resume'}</span>
          </motion.label>
        </div>
      </div>

      {selectedFile && (
        <ResumeModal file={selectedFile} onClose={handleModalClose} />
      )}
    </section>
  );
};

export default Hero;
