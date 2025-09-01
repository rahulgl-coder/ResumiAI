

import React, { useState } from 'react';
import { FaUpload, FaRobot, FaCheckCircle, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com'
import { useSelector } from 'react-redux';
import SignInModal from './Signup';
import toast from 'react-hot-toast';


const Contact=()=>{
    const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
    const { user } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
    name: '',
    email: '',
      message: ''
  });

  const type="user"

  const[showSignUp,setShowSignUp]=useState(false)

  
   const handleChange = (
    e
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   if(!user){
  setShowSignUp(true)
  return
   }
    

    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success(" Mail Send,Will get back soon")
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("EmailJS Error:", error);
          alert("Failed to send message. Please try again.");
        }
      );
  };


return(
    <>
    {showSignUp&& <SignInModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        role={type}
      />}
     <section id="contact" className="py-20 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.h2>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
            <motion.input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onChange={handleChange}
              value={formData.name}
              name='name'
            />
            <motion.input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
               onChange={handleChange}
               value={formData.email}
               name='email'
            />
            <motion.textarea
              placeholder="Your Message"
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="5"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
               onChange={handleChange}
               value={formData.message}
               name='message'
            />
            <motion.button
              type="submit"
              className="bg-blue-600 text-white px-6 py-4 rounded-full hover:bg-blue-700 transition-colors duration-300 w-full font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </section>
    </>
)

}

export default Contact;