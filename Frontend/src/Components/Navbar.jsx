
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState ,useEffect} from 'react';
import {  FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SignInModal from './Signup';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUser } from '../Redux/userSlice';

import axios from 'axios';






const Navbar = ({ type = "user" })=>{
    const [modalOpen, setModalOpen] = useState(false);
    const [menu ,setMenu]=useState(false) 
    const { user } = useSelector((state) => state.user);
    const [isEmployer,setIsEmployer]=useState(false)
  

    const navigate=useNavigate()
 const dispatch = useDispatch();
      
    const employerLinks = [
  { label: "Home", href: "#home" },
  { label: "Candidates", href: "#candidates" },
  { label: "Contact", href: "#contact" },
];

const userLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];



const navLinks = type === "employer" ? employerLinks : userLinks;

useEffect(() => {
  if (type === 'employer') {
    setIsEmployer(true);
  }
}, [type]);




    const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
    
const toggleMenu=()=>{

   setMenu(true)

}

const handleLogout=()=>{

    dispatch(clearUser())}

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
             {navLinks.map((link) => (
  <a
    key={link.label}
    href={link.href}
    className="text-black hover:text-teal-300 transition-colors duration-300"
  >
    {link.label}
  </a>
))}

{user ? (
  <div className="relative group">
    <div className="flex items-center gap-4">
      <p className="text-lg font-semibold text-gray-800">Hi, {user.name}</p>

      <div className="relative">
       
        {/* <div className="w-10 h-10 rounded-full bg-gray-500 text-white font-bold flex items-center justify-center cursor-pointer group-hover:bg-gray-600 transition-all duration-300">
          { user.name[0].toUpperCase()}
        </div> */}
    
<div className="w-10 h-10 rounded-full overflow-hidden bg-gray-500 text-white font-bold flex items-center justify-center cursor-pointer group-hover:bg-gray-600 transition-all duration-300 relative">
  {user?.picture ? (
    <img
      src={user.picture}
      alt="Profile"
      className="w-full h-full object-cover"
      onError={(e) => {
        e.target.style.display = 'none'; // Hide image if it fails
        e.target.parentNode.textContent = user?.name?.[0]?.toUpperCase() || 'U'; // Show fallback
      }}
    />
  ) : (
    user?.name?.[0]?.toUpperCase() || 'U'
  )}
</div>




        {/* Dropdown */}
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 pointer-events-auto z-50">
         {!isEmployer && (
  <button
    onClick={() => navigate('/profile')}
    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
  >
    Profile
  </button>
)}
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
                {navLinks.map((link) => (
  <a
    key={link.label}
    href={link.href}
    className="text-white hover:text-teal-300"
    onClick={() => setMenu(false)}
  >
    {link.label}
  </a>
))}
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