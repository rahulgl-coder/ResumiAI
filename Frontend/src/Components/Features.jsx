

import React, { useState } from 'react';
import { FaUpload, FaRobot, FaCheckCircle, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';




const Features=()=>{


     const cardVariants = {
    rest: { scale: 1, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
    hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', transition: { duration: 0.3 } },
  };

   const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };





    return(
        <>
        <section id="features" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Why Choose Resumi?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-xl"
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
            >
              <FaUpload className="text-blue-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Easy Resume Submission</h3>
              <p className="text-gray-600 mb-4">Upload your resume in seconds with our intuitive interface.</p>
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                alt="Resume Upload"
                className="w-full rounded-lg"
              />
            </motion.div>
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-xl"
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
            >
              <FaRobot className="text-blue-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">AI-Powered Verification</h3>
              <p className="text-gray-600 mb-4">Our AI verifies your resume quickly and accurately.</p>
              <img
                src="https://itchronicles.com/wp-content/uploads/2020/11/where-is-ai-used.jpg"
                alt="AI Verification"
                className="w-full rounded-lg"
              />
            </motion.div>
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-xl"
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
            >
              <FaCheckCircle className="text-blue-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600 mb-4">Your data is protected with top-notch security protocols.</p>
              <img
                src="https://tse1.mm.bing.net/th/id/OIP.vg4vAOt2-yMoMFm-TG0M6gHaFP?pid=Api&P=0&h=180"
                alt="Security"
                className="w-full rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
      </>
    )
}

export default Features;