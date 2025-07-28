
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import {  FaBars, FaTimes } from 'react-icons/fa';
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
              <a  href="#contact" className="text-black hover:text-teal-300 transition-colors duration-300">Contact</a>
{/* {user ? (
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
)} */}
{user ? (
  <div className="relative group">
    <div className="flex items-center gap-4">
      <p className="text-lg font-semibold text-gray-800">Hi, {user.name}</p>

      <div className="relative">
        {/* Avatar Circle */}
        <div className="w-10 h-10 rounded-full bg-gray-500 text-white font-bold flex items-center justify-center cursor-pointer group-hover:bg-gray-600 transition-all duration-300">
          {user.name[0]?.toUpperCase()}
        </div>

        {/* Dropdown */}
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 pointer-events-auto z-50">
          <button
            onClick={() => navigate('/profile')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
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