

// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setUser } from "../Redux/userSlice";
// import { useNavigate } from "react-router-dom";

// const VerifyEmailPage = () => {
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const alreadyCalled = useRef(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (alreadyCalled.current) return;
//     alreadyCalled.current = true;

//     const verify = async () => {
//       const token = new URLSearchParams(window.location.search).get("token");

//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_BASEURL}/auth/verify-email?token=${token}`
//         );

//         dispatch(setUser({ user: res.data.user, token: res.data.token }));
//         setMessage("✅ Email verified successfully!");
//       } catch (err) {
//         setMessage(
//           "❌ Verification failed: " +
//             (err.response?.data?.message || err.message)
//         );
//       } finally {
//         setLoading(false);
//         setShowModal(true);
//       }
//     };

//     verify();
//   }, [dispatch]);

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       {loading && (
//         <div className="text-xl font-medium text-gray-600">🔄 Verifying email...</div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
//             <h2 className="text-xl font-semibold mb-4">Email Verification</h2>
//             <p className="text-gray-700 mb-6">{message}</p>
//             <div className="flex justify-end">
//               <button
//                 onClick={() => navigate("/")}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Go to Home
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VerifyEmailPage;

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const alreadyCalled = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (alreadyCalled.current) return;
    alreadyCalled.current = true;

    const verify = async () => {
      const token = new URLSearchParams(window.location.search).get("token");

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASEURL}/auth/verify-email?token=${token}`
        );
        dispatch(setUser({ user: res.data.user, token: res.data.token }));
        setMessage("✅ Email verified successfully!");
      } catch (err) {
        setMessage(
          "❌ Verification failed: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
        setShowModal(true);
      }
    };

    verify();
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading && (
        <div className="text-xl font-medium text-gray-600">🔄 Verifying email...</div>
      )}

      {/* Modal with Background Blur */}
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
                  onClick={() => navigate("/")}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Go to Home
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerifyEmailPage;
