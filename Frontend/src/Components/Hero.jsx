


// import React, { useEffect, useState } from 'react';
// import { FaUpload } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import Title from './ResumeTitle';
// // import Card from './Card';
// // import ErrorBoundary from './ErrorBoundary';

// const Hero = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [resumeData, setResumeData] = useState(null);
//   const [userSkills, setUserSkills] = useState([]);
//   const [skill, setSkill] = useState('');
//   const [location, setLocation] = useState('');
//   const [userLocation, setUserLocation] = useState([]);

//   const user = useSelector((state) => state.user.user);
//   const token = useSelector((state) => state.user.token);
//   const navigate = useNavigate();

//   const BASEURL = import.meta.env.VITE_BASEURL;

//   const handleFileChange = (e) => {
//     console.log('Hero: File selected', e.target.files[0]?.name);
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleVerifyResume = async () => {
   
//     if (!user) {
//       toast.error('Sign In for features');
//       return;
//     }

//     if (
//       selectedFile &&
//       ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(selectedFile.type)
//     ) {
//       const formData = new FormData();
//       formData.append('resume', selectedFile);
//       console.log(formData.resume);
      

//       try {
//         const res = await axios.post(`${BASEURL}/upload-resume`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = res.data;
//         setResumeData({
//           name: data?.name || '',
//           email: data?.email || '',
//           phone: data?.phone || '',
//           dob: data?.dob || '',
//           skills: data?.skills || [],
//           qualifications: data?.qualifications || '',
//           passoutYear: '',
//           preferredLocation: '',
//           currentLocation: '',
//           workModes: [],
//         });
//         setUserSkills(data.skills || []);
//       } catch (err) {
//         console.error('Hero: Error uploading resume', err);
//         toast.error('Error uploading resume');
//       }
//     } else {
//       toast.error('Upload a valid file');
//     }
//   };

//   const handleModalClose = () => {
//     console.log('Hero: Modal closed');
//     setResumeData(null);
//     setSelectedFile(null);
//     setUserSkills([]);
//     setUserLocation([]);
//     setSkill('');
//     setLocation('');
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setResumeData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleWorkModeChange = (e) => {
//     const { value, checked } = e.target;
//     setResumeData((prev) => {
//       const currentModes = prev.workModes || [];
//       return {
//         ...prev,
//         workModes: checked
//           ? [...currentModes, value]
//           : currentModes.filter((mode) => mode !== value),
//       };
//     });
//   };

//   const cleanPhoneNumber = (input) => {
//     let phone = input.trim();
//     if (phone.startsWith('+91')) {
//       phone = phone.slice(3);
//     } else if (phone.startsWith('0')) {
//       phone = phone.slice(1);
//     }
//     const phoneRegex = /^[6-9]\d{9}$/;
//     return phoneRegex.test(phone) ? phone : null;
//   };

//   const validateFields = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const nameRegex = /^[a-zA-Z ]{3,}$/;
//     const locationRegex = /^[a-zA-Z ,.-]{2,}$/;
//     const cleanedPhone = cleanPhoneNumber(resumeData.phone);

//     if (!nameRegex.test(resumeData.name)) return 'Invalid name';
//     if (!emailRegex.test(resumeData.email)) return 'Invalid email';
//     if (!cleanedPhone) return 'Invalid phone number';
//     if (!resumeData.dob) return 'Date of Birth is required';
//     if (!locationRegex.test(resumeData.currentLocation)) return 'Invalid current location';

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Hero: Form submitted');

//     const error = validateFields();
//     if (error) {
//       toast.error(error);
//       return;
//     }

//     const data = {
//       ...resumeData,
//       skills: userSkills,
//       preferredLocation: userLocation,
//       userId: user._id,
//       replace: false,
//     };

//     const formData = new FormData();
//     formData.append('data', JSON.stringify(data));
//     formData.append('resume', selectedFile);

//     try {
//       const res = await axios.post(`${BASEURL}/save-profile`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.data.exists) {
//         const confirmReplace = window.confirm('Resume already exists. Do you want to replace it?');
//         if (confirmReplace) {
//           data.replace = true;
//           const newFormData = new FormData();
//           newFormData.append('data', JSON.stringify(data));
//           newFormData.append('resume', selectedFile);

//           await axios.post(`${BASEURL}/save-profile`, newFormData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           toast.success('Resume replaced successfully!');
//           navigate('/interview-intro');
//           handleModalClose();
//         } else {
//           toast.error('Resume upload cancelled.');
//         }
//       } else {
//         toast.success('Resume uploaded successfully!');
//         navigate('/interview-intro');
//         handleModalClose();
//       }
//     } catch (err) {
//       console.error('Hero: Error saving resume', err);
//       toast.error('Error saving resume');
//     }
//   };

//   const removeSkill = (skill) => {
//     console.log('Hero: Remove skill', skill);
//     setUserSkills(userSkills.filter((s) => s !== skill));
//   };

//   const addSkill = (data) => {
//     console.log('Hero: Add skill', data);
//     if (data && !userSkills.includes(data)) {
//       setUserSkills([...userSkills, data]);
//       setSkill('');
//     }
//   };

//   const removeLocation = (loc) => {
//     console.log('Hero: Remove location', loc);
//     setUserLocation(userLocation.filter((s) => s !== loc));
//   };

//   const addLocation = (data) => {
//     console.log('Hero: Add location', data);
//     if (data && !userLocation.includes(data)) {
//       setUserLocation([...userLocation, data]);
//       setLocation('');
//     }
//   };

//   return (
//     <section className="relative bg-gradient-to-r from-blue-50 to-teal-50 min-h-screen flex items-center justify-center text-black">
//       {/* <div className="absolute top-20 right-10 w-[400px] h-[500px] z-10">
//         <ErrorBoundary>
//           <Card />
//         </ErrorBoundary>
//       </div> */}

//       <div className="text-center max-w-4xl mx-auto px-4 z-20 relative">
//         <motion.h1
//           className="text-4xl sm:text-6xl font-extrabold mb-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           Launch Your Career with <Title target="Resumi" />
//         </motion.h1>
//         <motion.p
//           className="text-lg sm:text-2xl mb-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           Upload your resume and get verified instantly!
//         </motion.p>
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx"
//             className="hidden"
//             id="resume-upload"
//             onChange={handleFileChange}
//           />
//           <motion.label
//             htmlFor="resume-upload"
//             className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold flex items-center space-x-2 cursor-pointer hover:bg-gray-100 z-20"
//             whileHover={{ scale: 1.05 }}
//           >
//             <FaUpload />
//             <span>{selectedFile ? selectedFile.name : 'Upload Resume'}</span>
//           </motion.label>
//           <motion.button
//             onClick={handleVerifyResume}
//             className="bg-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600 z-20"
//             whileHover={{ scale: 1.05 }}
//           >
//             Verify Now
//           </motion.button>
//         </div>
//       </div>

//       {resumeData && (
//         <div className="fixed inset-0 bg-stone-950/30 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
//             <button
//               onClick={handleModalClose}
//               className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">Edit & Save Resume Details</h2>
//             <form onSubmit={handleSubmit} className="space-y-5">
//               {[
//                 { label: 'Full Name', name: 'name' },
//                 { label: 'Email', name: 'email' },
//                 { label: 'Phone', name: 'phone' },
//                 { label: 'Date of Birth', name: 'dob', type: 'date' },
//                 { label: 'Qualifications', name: 'qualifications' },
//                 { label: 'Passout Year', name: 'passoutYear', type: 'number' },
//                 { label: 'Current Location', name: 'currentLocation' },
//               ].map(({ label, name, type = 'text' }) => (
//                 <div key={name}>
//                   <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
//                   <input
//                     type={type}
//                     name={name}
//                     value={resumeData[name]}
//                     onChange={handleFormChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
//                     required={['name', 'email'].includes(name)}
//                   />
//                 </div>
//               ))}

//               <div>
//                 <label>Skills</label>
//                 <div className="flex">
//                   <input
//                     type="text"
//                     value={skill}
//                     onChange={(e) => setSkill(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => addSkill(skill)}
//                     className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 px-6 ml-2 rounded-full font-semibold hover:from-teal-600 hover:to-blue-600 transition duration-300"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {userSkills?.map((field) => (
//                     <div key={field} className="w-fit">
//                       <p className="flex items-center gap-1 border border-gray-300 rounded-md shadow-sm p-2">
//                         {field}{' '}
//                         <span onClick={() => removeSkill(field)}>
//                           <IoMdCloseCircle />
//                         </span>
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label>Preferred Locations</label>
//                 <div className="flex">
//                   <input
//                     type="text"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => addLocation(location)}
//                     className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 px-6 ml-2 rounded-full font-semibold hover:from-teal-600 hover:to-blue-600 transition duration-300"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {userLocation?.map((field) => (
//                     <div key={field} className="w-fit">
//                       <p className="flex items-center gap-1 border border-gray-300 rounded-md shadow-sm p-2">
//                         {field}{' '}
//                         <span onClick={() => removeLocation(field)}>
//                           <IoMdCloseCircle />
//                         </span>
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-2">Work Mode Preferences</label>
//                 <div className="flex gap-4 flex-wrap">
//                   {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
//                     <label key={mode} className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
//                       <input
//                         type="checkbox"
//                         value={mode}
//                         checked={resumeData.workModes.includes(mode)}
//                         onChange={handleWorkModeChange}
//                         className="accent-teal-500"
//                       />
//                       <span>{mode}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-full font-semibold hover:from-teal-600 hover:to-blue-600 transition duration-300"
//               >
//                 Save Profile
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Hero;


import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ResumeModal from './ResumeModal';
 import Title from './ResumeTitle';

const Hero = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setSelectedFile(null);
    setShowModal(false);
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-teal-50 min-h-screen flex items-center justify-center text-black">
      <div className="text-center max-w-4xl mx-auto px-4 z-20 relative">
     
         <motion.h1
           className="text-4xl sm:text-6xl font-extrabold mb-6"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
         transition={{ duration: 1 }}
         >
         Launch Your Career with <Title target="Resumi" />
        </motion.h1>
        <motion.p
          className="text-lg sm:text-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Upload your resume to get verified instantly!
        </motion.p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            id="resume-upload"
            onChange={handleFileChange}
          />
          <motion.label
            htmlFor="resume-upload"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold flex items-center space-x-2 cursor-pointer hover:bg-gray-100 z-20"
            whileHover={{ scale: 1.05 }}
          >
            <FaUpload />
            <span>{selectedFile ? selectedFile.name : 'Upload Resume'}</span>
          </motion.label>
        </div>
      </div>

      {selectedFile && (
        <ResumeModal file={selectedFile} onClose={handleModalClose} />
      )}
    </section>
  );
};

export default Hero;
