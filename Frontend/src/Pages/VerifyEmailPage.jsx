

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import EmployerRegisterModal from '../Components/EmployerComponents/EmployerRegistrationModal'


const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isOpen,setOpen]=useState(false)
  const alreadyCalled = useRef(false);
  const [path,setPath]=useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASEURL=import.meta.env.VITE_BASEURL

  useEffect(() => {
    if (alreadyCalled.current) return;
    alreadyCalled.current = true;

    const verify = async () => {
      const token = new URLSearchParams(window.location.search).get("token");

      try {
        const res = await axios.get(
          `${BASEURL}/auth/verify-email?token=${token}`
        );
        dispatch(setUser({ user: res.data.user, token: res.data.token }));
        setPath(res.data.user.role)
        setMessage(" Email verified successfully!");
      } catch (err) {
        setMessage(
          " Verification failed: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
        setShowModal(true);
      }
    };

    verify();
  }, [dispatch]);

  const handleNavigation=()=>{

    if(path==='employer'){

    setShowModal(false)
    setOpen(true)
    }else if(path==='user'){
     
      navigate('/')

    }else if(path==='admin'){
      navigate('/admin')
    }

    }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading && (
        <div className="text-xl font-medium text-gray-600">🔄 Verifying email...</div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">Email Verification</h2>
              <p className="text-gray-700 mb-6">{message}</p>
              <div className="flex justify-end">
                <button
                  onClick={handleNavigation}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >{path==='employer'?"Add Company Details to complete Verification":"Home"}
                  
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
       <EmployerRegisterModal isOpen={isOpen} onClose={() => {setOpen(false) ,  navigate(path === "employer" ? "/employer" : "/")}} />
    </div>
  );
};

export default VerifyEmailPage;
