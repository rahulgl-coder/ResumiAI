
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
const Nav=()=>{
  const navigate=useNavigate()

    return(
        <>
        <div className="py-5 px-10 bg-gradient-to-r from-[rgba(239,246,255,0.2)] to-[rgba(204,251,241,0.2)] backdrop-blur-md border border-white/30 text-black fixed top-0 w-full z-20 shadow-amber-50">

  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.1 }}
    className="flex items-center gap-6"
  >
    <button 
      onClick={() => navigate(-1)} 
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
          clipRule="evenodd" 
        />
      </svg>
      <span className="text-sm font-medium">Back</span>
    </button>
  
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="px-5 text-3xl font-extrabold tracking-tight"
    >
      Resumi
    </motion.h1>
  </motion.div>


  {/* <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.3 }}
    className="text-right"
  >
    <h1 className="text-lg font-bold text-gray-800">
      Welcome, <span className="text-blue-600">{user.name}</span>
    </h1>
    <p className="text-xs text-gray-500 mt-1">
      {new Date().toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })}
    </p>
  </motion.div> */}
</div>
        </>
    )
}

export default Nav;