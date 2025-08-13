

import React, { useState, useEffect } from 'react';
import {
  User, Mail, Lock, Download, Trash2, Eye, EyeOff, Save, X, Upload, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeModal from '../Components/ResumeModal';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUser } from '../Redux/userSlice';
import toast from 'react-hot-toast';

const Profile = () => {
  const [passwordData, setPasswordData] = useState({
    current: '', newPass: '', confirm: ''
  });
  const dispatch = useDispatch();
  
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [togglePassForm, setTogglePassForm] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [activePDF, setActivePDF] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const BASEURL = import.meta.env.VITE_BASEURL;
  const { token } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const [passwordForm,setPasswordForm]=useState(true)
  const [userName, setUserName] = useState({
    name: user.name,
  });
  const [activeSection, setActiveSection] = useState('personal');



  useEffect(() => {
    fetchResume();
      if(user.googleId){
    setPasswordForm(false)
    }
  }, [token]);

  const fetchResume = async () => {
    try {
      const res = await axios.get(`${BASEURL}/check-resume`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResumes(res.data.resumes);
    } catch (error) {
      console.log(error);
    }
  };



  const handleNameChange = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `${BASEURL}/auth/name-change`,
        userName, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUser({
        user: res.data.user,
        token: token
      }));
      toast.success("Name changed successfully");
      setLoading(false);
    } catch (error) {
      console.error("Failed to change name:", error);
    }
  };
const updatePassword = async () => {
  const { current, newPass, confirm } = passwordData;
  console.log(passwordData);
  

  if(!current){
    return toast.error("Current password required")
  }
  
  if (newPass !== confirm) {
    return toast.error("Passwords don't match");
  }
  
  if (newPass.length < 6) {
    return toast.error('Password must be at least 6 characters');
  }

  try {
    setLoading(true);
    const res = await axios.patch(
      `${BASEURL}/auth/change-password`,
      passwordData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    toast.success("Password updated successfully");
    setPasswordData({ current: '', new: '', confirm: '' });
    setTogglePassForm(false);
  } catch (error) {
    console.error("Password change failed:", error);
    toast.error(error.response?.data?.message || "Failed to update password");
  } finally {
    setPasswordData({
    current: '', newPass: '', confirm: ''
  })
    setLoading(false);
  }
};

  const downloadResume = (r) => {
    const link = document.createElement('a');
    link.href = r.url;
    link.download = r.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  };

  const deleteResume = (r) => {
    if (!window.confirm(`Delete ${r.name}?`)) return;
    setLoading(true);
    setTimeout(() => {
      setResumes(prev => prev.filter(x => x.id !== r.id));
      if (activePDF?.id === r.id) setActivePDF(null);
      setLoading(false);
   
    }, 1000);
  };

  const activateResume = (id) => {
    setResumes(prev => prev.map(r => ({ ...r, isActive: r.id === id })));
    notifyUser('Resume set as active');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleModalClose = () => {
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
<div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">

  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.1 }}
    className="flex items-center gap-6"
  >
    <button 
      onClick={() => window.history.back()} 
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


  <motion.div
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
  </motion.div>
</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
  <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
    {/* User Profile Section */}
    <div className="flex items-center gap-4 mb-8">
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
          <User className="w-6 h-6" />
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      <div className="min-w-0"> {/* Added min-w-0 to enable text truncation */}
        <h2 className="font-bold text-gray-800 truncate">{user.name}</h2>
        <p className="text-sm text-gray-500 flex items-center truncate"> {/* Added truncate */}
          <Mail className="w-4 h-4 mr-1 flex-shrink-0" /> {/* Added flex-shrink-0 */}
          <span className="truncate">{user.email}</span> {/* Wrapped email in span with truncate */}
        </p>
      </div>
    </div>

    {/* Navigation */}
    <nav className="space-y-1">
      <button
        onClick={() => setActiveSection('personal')}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
          activeSection === 'personal'
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <User className="w-5 h-5" />
          Personal Info
        </div>
        {activeSection === 'personal' ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>

      <button
        onClick={() => setActiveSection('security')}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
          activeSection === 'security'
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5" />
          Security
        </div>
        {activeSection === 'security' ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>

      <button
        onClick={() => setActiveSection('resumes')}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
          activeSection === 'resumes'
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <Upload className="w-5 h-5" />
          Resumes
        </div>
        {activeSection === 'resumes' ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
    </nav>
  </div>
</div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Personal Information Section */}
            <AnimatePresence>
              {activeSection === 'personal' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-xl shadow-sm p-6 mb-6"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      <User className="w-5 h-5" />
                    </div>
                    Personal Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-11"
                          value={userName.name}
                          onChange={e => setUserName({ name: e.target.value })}
                          placeholder="Enter your full name"
                        />
                        <div className="absolute left-3 top-3 text-gray-400">
                          <User className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed pl-11"
                          value={user.email}
                          readOnly
                          disabled
                        />
                        <div className="absolute left-3 top-3 text-gray-400">
                          <Mail className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Contact support to change your email address
                      </p>
                    </div>

                    <div className="pt-2">
                      <motion.button
                        type="button"
                        disabled={loading}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md"
                        onClick={handleNameChange}
                      >
                        {loading ? (
                          <>
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
                            Processing...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            Save Changes
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Security Section */}
           <AnimatePresence>
  {activeSection === 'security' && (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-sm p-6 mb-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <Lock className="w-5 h-5" />
          </div>
          Security Settings
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTogglePassForm(prev => !prev)}
          className={`text-sm px-4 py-2 rounded-lg ${
            togglePassForm
              ? 'bg-red-50 text-red-600 hover:bg-red-100'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          } font-medium transition-colors`}
        >
          {togglePassForm ? 'Cancel' : 'Change Password'}
        </motion.button>
      </div>

      <AnimatePresence>

       {passwordForm ? (
  togglePassForm && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="mt-4 space-y-5">
        {['current', 'newPass', 'confirm'].map(key => (
          <div key={key} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {key === 'newPass' ? 'New Password' : 
               key === 'current' ? 'Current Password' : 'Confirm Password'}
            </label>
            <div className="relative">
              <input
                type={show[key] ? 'text' : 'password'}
                value={passwordData[key]}
                onChange={e =>
                  setPasswordData({ ...passwordData, [key]: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-11 pr-10 transition-all"
                placeholder={
                  key === 'current' ? 'Enter current password' :
                  key === 'newPass' ? 'Enter new password' : 'Confirm new password'
                }
              />
              <div className="absolute left-3 top-3 text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setShow(prev => ({ ...prev, [key]: !prev[key] }))}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {show[key] ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        ))}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={updatePassword}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-3 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Update Password
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
) : (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg"
  >
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="ml-3">
        <p className="text-sm text-yellow-700">
          You signed in with Google. For the password security you have to add password through signup.
        </p>
      </div>
    </div>
  </motion.div>
)}
      </AnimatePresence>
    </motion.div>
  )}
</AnimatePresence>

            {/* Resumes Section */}
            <AnimatePresence>
              {activeSection === 'resumes' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                        <Upload className="w-5 h-5" />
                      </div>
                      Resume Management
                    </h2>
                    <label className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 transition-all shadow-md">
                      <Upload className="w-5 h-5" />
                      Upload Resume
                      <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                    </label>
                  </div>

                  {resumes.length > 0 ? (
                    <div className="space-y-4">
                      {resumes.map(r => (
                        <motion.div
                          key={r.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`border p-5 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all ${
                            r.isActive ? 'border-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 flex items-center gap-2">
                                  {r.name}
                                  {r.isActive && (
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                      </svg>
                                      Active
                                    </span>
                                  )}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">{r.size} • Uploaded on {r.updatedAt}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-wrap justify-end">
                            {!r.isActive && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => activateResume(r.id)}
                                className="bg-yellow-50 text-yellow-600 hover:bg-yellow-100 px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Set Active
                              </motion.button>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setActivePDF(r)}
                              className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => downloadResume(r)}
                              className="bg-green-50 text-green-600 hover:bg-green-100 px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              Download
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => deleteResume(r)}
                              className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <Upload className="text-gray-400 w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-700 mb-2">No resumes uploaded yet</h4>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Upload your resume to make it available for job applications
                      </p>
                      <label className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer inline-flex items-center gap-2 transition-all shadow-md">
                        <Upload className="w-5 h-5" />
                        Upload Resume
                        <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                      </label>
                    </div>
                  )}

                  <AnimatePresence>
                    {activePDF && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-6 border border-gray-200 rounded-xl p-6 shadow-sm"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-gray-700 font-medium flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Viewing: {activePDF.name}
                          </p>
                          <button
                            onClick={() => setActivePDF(null)}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="w-full h-[500px] rounded-lg border overflow-hidden shadow">
                          <iframe
                            src={activePDF.resume}
                            className="w-full h-full"
                            title="PDF Viewer"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center gap-4 max-w-sm"
            >
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="font-medium text-gray-700">Processing your request...</p>
              <p className="text-sm text-gray-500 text-center">
                Please wait while we process your changes. This may take a moment.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      {selectedFile && (
        <ResumeModal file={selectedFile} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default Profile;