import React, { useState,useEffect } from 'react';
import {
  User, Mail, Lock, Download, Trash2, Eye, EyeOff, Save, X, Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeModal from '../Components/ResumeModal';
import axios from 'axios'
import { useSelector } from 'react-redux';


const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });

  const [passwordData, setPasswordData] = useState({
    current: '', new: '', confirm: ''
  });

  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [togglePassForm, setTogglePassForm] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [activePDF, setActivePDF] = useState(null);
  const [notify, setNotify] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const BASEURL=import.meta.env.VITE_BASEURL
  const {token}=useSelector((state)=>state.user)

  useEffect(()=>{

fetchResume()

  },[token])

  const fetchResume=async()=>{
    try {

      const res=await axios.get(`${BASEURL}/check-resume`,{
         headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
    setResumes(res.data.resumes)

      
    } catch (error) {
      console.log(error);
      
    }

  }

  const notifyUser = (msg, type = 'success') => {
    const id = Date.now();
    setNotify(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setNotify(prev => prev.filter(n => n.id !== id)), 3000);
  };

  const updatePassword = () => {
    const { current, new: newPass, confirm } = passwordData;
    if (newPass !== confirm) return notifyUser('Passwords do not match', 'error');
    if (newPass.length < 6) return notifyUser('Password too short', 'error');
    notifyUser('Password updated successfully');
    setPasswordData({ current: '', new: '', confirm: '' });
    setTogglePassForm(false);
  };

  const downloadResume = (r) => {
    const link = document.createElement('a');
    link.href = r.url;
    link.download = r.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notifyUser(`Downloading ${r.name}`);
  };

  const deleteResume = (r) => {
    if (!window.confirm(`Delete ${r.name}?`)) return;
    setLoading(true);
    setTimeout(() => {
      setResumes(prev => prev.filter(x => x.id !== r.id));
      if (activePDF?.id === r.id) setActivePDF(null);
      setLoading(false);
      notifyUser('Resume deleted successfully');
    }, 1000);
  };

  const activateResume = (id) => {
    setResumes(prev => prev.map(r => ({ ...r, isActive: r.id === id })));
    notifyUser('Resume set as active');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    if (!file) return;
    setSelectedFile(file)
 
 
  };
    const handleModalClose = () => {
    setSelectedFile(null);
   
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Notifications */}
      <AnimatePresence>
        {notify.map(n => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`fixed top-4 right-4 z-50 p-3 rounded shadow text-white ${n.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}
          >
            {n.msg}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold text-gray-800 mb-8"
        >
          User Profile Settings
        </motion.h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile + Password */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="text-blue-500" />
                Personal Information
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
                  <User className="text-white w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm flex items-center">
                    <Mail className="w-4 h-4 mr-1 text-blue-500" />
                    {userData.email}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={userData.name}
                    onChange={e => setUserData({ ...userData, name: e.target.value })}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => notifyUser('Profile updated successfully')}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            </motion.div>

            {/* Password Change */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Lock className="text-blue-500" />
                  Security Settings
                </h3>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTogglePassForm(prev => !prev)}
                  className={`text-sm ${togglePassForm ? 'text-red-500' : 'text-blue-600'} font-medium`}
                >
                  {togglePassForm ? 'Cancel' : 'Change Password'}
                </motion.button>
              </div>
              
              <AnimatePresence>
                {togglePassForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-4">
                      {['current', 'new', 'confirm'].map(key => (
                        <div key={key} className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {key[0].toUpperCase() + key.slice(1)} Password
                          </label>
                          <input
                            type={show[key] ? 'text' : 'password'}
                            value={passwordData[key]}
                            onChange={e => setPasswordData({ ...passwordData, [key]: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShow(prev => ({ ...prev, [key]: !prev[key] }))}
                            className="absolute top-8 right-3 text-gray-400 hover:text-gray-600"
                          >
                            {show[key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      ))}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={updatePassword}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Update Password
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Resume Management */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Upload className="text-blue-500" />
                Resume Management
              </h3>
              <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer flex items-center gap-2 transition-colors">
                <Upload className="w-4 h-4" />
                Upload Resume
                <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

          

            {resumes.length >= 0 ? (
              <div className="space-y-3">
                {resumes.map(r => (
                  <motion.div 
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-700 flex items-center gap-2">
                        {r.name} 
                        {r.isActive && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{r.size} • Uploaded on {r.updatedAt}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {!r.isActive && (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => activateResume(r.id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                        >
                          Set Active
                        </motion.button>
                      )}
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActivePDF(r)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                      >
                        View
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => downloadResume(r)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> Download
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteResume(r)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="text-gray-400 w-6 h-6" />
                </div>
                <h4 className="text-lg font-medium text-gray-700 mb-2">No resumes uploaded yet</h4>
                <p className="text-gray-500 mb-4">Upload your resume to get started</p>
                <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer inline-flex items-center gap-2 transition-colors">
                  <Upload className="w-4 h-4" />
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
                  className="mt-6 border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-700 font-medium">Viewing: {activePDF.name}</p>
                    <button 
                      onClick={() => setActivePDF(null)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="w-full h-96 rounded-lg border overflow-hidden">
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
        </div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white p-6 rounded-xl shadow-xl flex gap-4 items-center"
            >
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="font-medium">Processing your request...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
       {selectedFile && (
        <ResumeModal file={selectedFile} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default Profile;