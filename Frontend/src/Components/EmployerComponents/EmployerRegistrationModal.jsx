import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';

const EmployerRegisterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    registrationNumber: '',
    about: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const BASEURL = import.meta.env.VITE_BASEURL;

  const handleInputChange = (e) => {
    
    setErrors({});
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const validate = () => {
    const newErrors = {};

    if (!formData.companyName || formData.companyName.length < 2 || formData.companyName.length > 100) {
      newErrors.companyName = 'Company name must be between 2 and 100 characters.';
    }

    if (!formData.companyAddress || formData.companyAddress.length < 10) {
      newErrors.companyAddress = 'Company address must be at least 10 characters.';
    }

    if (!formData.registrationNumber || !/^[a-zA-Z0-9]{5,20}$/.test(formData.registrationNumber)) {
      newErrors.registrationNumber = 'Registration number must be alphanumeric (5–20 characters).';
    }

    if (!formData.about || formData.about.length < 20) {
      newErrors.about = 'About must be at least 20 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post(`${BASEURL}/employer/register`, formData);
      toast.success('Company registered successfully!');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
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
            className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Employer Registration
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Your company name"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Company Address</label>
                <input
                  type="text"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Headquarters or main branch"
                />
                {errors.companyAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyAddress}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. CIN or Reg No."
                />
                {errors.registrationNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.registrationNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">About the Company</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Describe your company..."
                  rows={4}
                ></textarea>
                {errors.about && (
                  <p className="text-red-500 text-sm mt-1">{errors.about}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-60"
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
                {loading ? 'Registering...' : 'Register Your Company on Resumi'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmployerRegisterModal;
