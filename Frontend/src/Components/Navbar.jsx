
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { FaUpload, FaRobot, FaCheckCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SignInModal from './Signup';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUser } from '../Redux/userSlice';

import axios from 'axios';






const Navbar=()=>{
    const [modalOpen, setModalOpen] = useState(false);
    const [menu ,setMenu]=useState(false) 
    const { user } = useSelector((state) => state.user);
    const [users,setUsers] =useState(user)

    const navigate=useNavigate()
 const dispatch = useDispatch();
      
    


    const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
    
const toggleMenu=()=>{

   setMenu(true)

}

const handleLogout=()=>{

    dispatch(clearUser())

}


const AI=async()=>{

try {
  console.log("hello ai");
  

  const res=axios.get("http://localhost:5000/questions")
  
} catch (error) {
  
}

}


return(
    <>
     <motion.nav
    className="bg-gradient-to-r from-[rgba(239,246,255,0.2)] to-[rgba(204,251,241,0.2)] backdrop-blur-md border border-white/30 text-black fixed top-0 w-full z-20 shadow-amber-50"


        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center ">
            <h1 className="text-3xl font-extrabold tracking-tight">Resumi</h1>
            <div className="hidden md:flex space-x-6">
              <a onClick={()=>{navigate("/chat")}} href="#home" className="text-gray hover:text-teal-300 transition-colors duration-300">Home</a>
              <a href="#features" className="text-black hover:text-teal-300 transition-colors duration-300">Features</a>
              <a href="#about" className="text-black hover:text-teal-300 transition-colors duration-300">About</a>
              <a onClick={AI} href="#contact" className="text-black hover:text-teal-300 transition-colors duration-300">Contact</a>
{user ? (
  <div className="flex items-center gap-4">
    <p className="text-lg font-semibold text-gray-800">Hi, {user.name}</p>
    <motion.button
      whileHover={{ scale: 1.1, backgroundColor: "#f87171" }}
      whileTap={{ scale: 0.95 }}
      className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition-all duration-300"
      onClick={handleLogout}
    >
      Logout
    </motion.button>
  </div>
) : (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="bg-teal-500 text-white px-5 py-2 rounded-full hover:bg-teal-600 transition-colors duration-300"
    onClick={() => setModalOpen(true)}
  >
    Get Started
  </motion.button>
)}


            </div>
            <div className="md:hidden flex items-center">
              
              
              <button onClick={toggleMenu} className="text-white focus:outline-none">
                {menu ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.div
              className="md:hidden bg-blue-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4 py-4 px-6">
                <a href="#home" className="text-white hover:text-teal-300" onClick={toggleMenu}>Home</a>
                <a href="#features" className="text-white hover:text-teal-300" onClick={toggleMenu}>Features</a>
                <a href="#about" className="text-white hover:text-teal-300" onClick={toggleMenu}>About</a>
                <a href="#contact" className="text-white hover:text-teal-300" onClick={toggleMenu}>Contact</a>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teal-500 text-white px-5 py-2 rounded-full hover:bg-teal-600"
                //   onClick={setModalOpen(true)}
                >
                  Get Start
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>


 <SignInModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />


</>

)


}

export default Navbar;