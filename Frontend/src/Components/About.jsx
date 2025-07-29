
import React, { useState } from 'react';
import { FaUpload, FaRobot, FaCheckCircle, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';



const About=()=>{

       const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

    return(
        <>
         <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <motion.h2
              className="text-4xl font-bold text-gray-800 mb-4"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              About Resumi
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-6 text-lg"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Resumi is your one-stop platform for seamless resume submission and AI-driven student verification. We empower students to showcase their skills and credentials effortlessly, connecting them to opportunities that matter.
            </motion.p>
            <motion.button
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
          <motion.img
            src="https://www.myperfectresume.com/wp-content/uploads/2019/09/how-to-write-ats-friendly-resume.png  "
            alt="Career Journey"
            className="md:w-1/2 mt-8 md:mt-0 md:ml-8 rounded-xl shadow-2xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
        </div>
      </section>
        </>
    )
}

export default About;