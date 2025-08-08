import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import GoogleLoginButton from './GoogleLogin'; 
import EmployerRegisterModal from '../Components/EmployerComponents/EmployerRegistrationModal'




const SignInModal = ({ isOpen, onClose ,role}) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showLink,setShowLink]=useState(false)
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [register,setRegister]=useState(false)


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role:role
  });
  const [errors, setErrors] = useState({
  name: '',
  email: '',
  password: ''
});

const [loading,setLoading]=useState(false)
const BASEURL=import.meta.env.VITE_BASEURL
const navigate=useNavigate()
const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setErrors({})
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

    const startCountdown = () => {
  let timeLeft = 20;
  const timer = setInterval(() => {
    timeLeft -= 1;
    setCountdown(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      setCanResend(true);
    }
  }, 1000);
};


 const handleSubmit = async (e) => {
  e.preventDefault();
   const isValid = validate();
   if (!isValid) return;

  setLoading(true)

  const endpoint = isSignUp ? "/auth/signup" : "/auth/signin";


  try {
    const res = await axios.post(`${BASEURL}${endpoint}`, formData);

    if(!isSignUp){
    dispatch(setUser({
  user: res.data.user,
  token: res.data.token

}));
onClose()
}
if (isSignUp) {
      setShowLink(true);
      setCountdown(30); 
      setCanResend(false); 
      startCountdown(); 
    }


toast.success(`${isSignUp ? 'Link is sended to the mail' : 'Signin'} successful`);


} catch (err) {
  
toast.error(`${isSignUp ? 'Signup' : 'Signin'} failed: ${err.response?.data?.message || "Something went wrong"}`);

  }finally{
 setLoading(false)

  }
};


const handleResend = async () => {
  try {
    setCanResend(false);
    setCountdown(30);
    startCountdown();

    await axios.post(`${BASEURL}/auth/resend-link`, { email: formData.email });

    toast.success('Verification link resent successfully');
  } catch (err) {
    toast.error(err.response?.data?.msg || "Failed to resend verification link");
  }
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
    <>
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
     type='submit'
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading && (
          <svg
            className="w-5 h-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        )}
        {loading ? 'Processing...' : isSignUp ? 'Signup' : 'Signin'}
      </button>
            </form>
{isSignUp && showLink && (
  <div style={{ marginTop: "1rem" }}>
    {canResend ? (
      <button onClick={handleResend} className="btn btn-link">
        🔁 Resend Verification Link
      </button>
    ) : (
      <p>⏳ You can resend the link in {countdown}s</p>
    )}
  </div>
)}



            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

          <div className="w-full flex items-center justify-center">
  <GoogleLoginButton
    buttonText={isSignUp ? "Sign In with Google" : "Sign Up  with Google"}
    onSuccessLogin={(data) => {
      dispatch(setUser({
        user: data.user,
        token: data.tok,
      }));
      toast.success("Google Sign In successful");
      if(data.user.role==='employer'){
   onClose();
   setRegister(true)
     }else if(data.user.role==='user'){
      onClose()
      navigate('/')
     }
      
    }}
    role={role}
  />
</div>

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
      {   <EmployerRegisterModal  isOpen={register} onClose={() => {setRegister(false) ,  navigate(role === "employer" ? "/employer" : "/");}} />}
    </>
  );
};

export default SignInModal;