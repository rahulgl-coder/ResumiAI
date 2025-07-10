import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const SignInModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState({
  name: '',
  email: '',
  password: ''
});

const BASEURL=import.meta.env.VITE_BASEURL
const navigate=useNavigate()
 const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const validate=()=>{

    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    const newErrors = {
    name: '',
    email: '',
    password: ''
  };

     if(!formData.name&&isSignUp){
   
        newErrors.name="Name required"
       }else if(!nameRegex.test(formData.name)&&isSignUp){
        newErrors.name = 'Name should contain only letters and spaces (2–50 characters)';
    

     }

     if(!formData.email){
        newErrors.email="Email required"
     }else if(!emailRegex.test(formData.email)){
         newErrors.email="Provide a valid email format"
     }


     if(!formData.password){
        newErrors.password='Password required'
     }else if(!passwordRegex.test(formData.password)){
       newErrors.password = 'Password must include uppercase, lowercase, number, and special character';
     }

      setErrors(newErrors);


 
     return Object.values(newErrors).every(error => error === '');
    

}

 



const handleSubmit = async (e) => {
  e.preventDefault();

  const isValid = validate();
  if (!isValid) return;

  const endpoint = isSignUp ? "/auth/signup" : "/auth/signin";


  try {
    const res = await axios.post(`${BASEURL}${endpoint}`, formData);
    dispatch(setUser({
  user: res.data.user,
  token: res.data.token

}));
    
 toast.success(`${isSignUp ? 'Signup' : 'Signin'} successful`);

    onClose();
    

  } catch (err) {
    console.error(`${isSignUp ? 'Signup' : 'Signin'} failed:`, err.response?.data || err.message);
  }
};

  const handleGoogleAuth = () => {
    // Implement Google Auth logic here
    console.log('Google Auth triggered');
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 font-medium ${isSignUp ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
              <button
                className={`px-4 py-2 font-medium ${!isSignUp ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
               
                  />
                </div>
               
              )}
{errors.name && (
  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
)}


              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
         
                />
              </div>
              {errors.email && (
  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
)}
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
         
                />
              </div>
              {errors.password && (
  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
)}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FcGoogle size={24} />
              {isSignUp ? 'Sign Up with Google' : 'Sign In with Google'}
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                className="text-blue-600 hover:underline ml-1"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignInModal;