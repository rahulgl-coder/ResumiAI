// import React, { useState, useEffect } from 'react';
// import { IoMdCloseCircle } from 'react-icons/io';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const ResumeModal = ({ file, onClose }) => {
//   const [resumeData, setResumeData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [loadingMessage, setLoadingMessage] = useState("Preparing your questions...");
//   const [userSkills, setUserSkills] = useState([]);
//   const [skill, setSkill] = useState('');
//   const [location, setLocation] = useState('');
//   const [userLocation, setUserLocation] = useState([]);

//   const user = useSelector((state) => state.user.user);
//   const token = useSelector((state) => state.user.token);
//   const navigate = useNavigate();
//   const BASEURL = import.meta.env.VITE_BASEURL;

//   const loadingMessages = [
//     "Extracting skills from your resume...",
//     "Analyzing your work experience...",
//     "Identifying education details...",
//     "Checking contact information...",
//     "Matching with job preferences...",
//     "Almost done!"
//   ];

//   useEffect(() => {
//     let index = 0;
//     let interval;
//     if (loading) {
//       interval = setInterval(() => {
//         setLoadingMessage(loadingMessages[index % loadingMessages.length]);
//         index++;
//       }, 5000);
//     }
//     return () => clearInterval(interval);
//   }, [loading]);

//   const handleVerifyResume = async () => {
//     if (!user) {
//       toast.error('Sign in to verify resume');
//       return;
//     }
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append('resume', file);

//       const res = await axios.post(`${BASEURL}/upload-resume`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = res.data;
//       setResumeData({
//         name: data?.name || '',
//         email: data?.email || '',
//         phone: data?.phone || '',
//         dob: data?.dob || '',
//         skills: data?.skills || [],
//         qualifications: data?.qualifications || '',
//         passoutYear: '',
//         preferredLocation: '',
//         currentLocation: '',
//         workModes: [],
//       });
//       setUserSkills(data.skills || []);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       toast.error('Error verifying resume');
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       ...resumeData,
//       skills: userSkills,
//       preferredLocation: userLocation,
//       userId: user._id,
//       replace: false,
//     };

//     const formData = new FormData();
//     formData.append('data', JSON.stringify(data));
//     formData.append('resume', file);

//     try {
//       const res = await axios.post(`${BASEURL}/save-profile`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.data.exists) {
//         if (window.confirm('Resume already exists. Replace it?')) {
//           data.replace = true;
//           const newFormData = new FormData();
//           newFormData.append('data', JSON.stringify(data));
//           newFormData.append('resume', file);
//           await axios.post(`${BASEURL}/save-profile`, newFormData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           toast.success('Resume replaced successfully!');
//         } else {
//           toast.error('Upload cancelled.');
//           return;
//         }
//       } else {
//         toast.success('Resume saved successfully!');
//       }
//       navigate('/interview-intro');
//       onClose();
//     } catch (err) {
//       console.error(err);
//       toast.error('Error saving profile');
//     }
//   };

//   const addSkill = () => {
//     if (skill && !userSkills.includes(skill)) {
//       setUserSkills([...userSkills, skill]);
//       setSkill('');
//     }
//   };

//   const removeSkill = (s) => {
//     setUserSkills(userSkills.filter((item) => item !== s));
//   };

//   const addLocation = () => {
//     if (location && !userLocation.includes(location)) {
//       setUserLocation([...userLocation, location]);
//       setLocation('');
//     }
//   };

//   const removeLocation = (loc) => {
//     setUserLocation(userLocation.filter((item) => item !== loc));
//   };

//   return (
//     <div className="fixed inset-0 bg-stone-950/30 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
//         >
//           &times;
//         </button>

//         {!resumeData ? (
//           <div className="text-center">
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                 <p className="text-gray-600">{loadingMessage}</p>
//               </>
//             ) : (
//               <>
//                 <h2 className="text-2xl font-bold mb-4">Verify Resume</h2>
//                 <button
//                   onClick={handleVerifyResume}
//                   className="bg-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600"
//                 >
//                   Start Verification
//                 </button>
//               </>
//             )}
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {[
//               { label: 'Full Name', name: 'name' },
//               { label: 'Email', name: 'email' },
//               { label: 'Phone', name: 'phone' },
//               { label: 'Date of Birth', name: 'dob', type: 'date' },
//               { label: 'Qualifications', name: 'qualifications' },
//               { label: 'Passout Year', name: 'passoutYear', type: 'number' },
//               { label: 'Current Location', name: 'currentLocation' },
//             ].map(({ label, name, type = 'text' }) => (
//               <div key={name}>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
//                 <input
//                   type={type}
//                   name={name}
//                   value={resumeData[name]}
//                   onChange={(e) => setResumeData({ ...resumeData, [name]: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
//                 />
//               </div>
//             ))}

//             <div>
//               <label>Skills</label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   value={skill}
//                   onChange={(e) => setSkill(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
//                 />
//                 <button type="button" onClick={addSkill} className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 px-6 ml-2 rounded-full font-semibold hover:from-teal-600 hover:to-blue-600 transition duration-300">
//                   Add
//                 </button>
//               </div>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {userSkills.map((s) => (
//                   <span key={s} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
//                     {s}
//                     <IoMdCloseCircle onClick={() => removeSkill(s)} />
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label>Preferred Locations</label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
//                 />
//                 <button type="button" onClick={addLocation} className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 px-6 ml-2 rounded-full font-semibold hover:from-teal-600 hover:to-blue-600 transition duration-300">
//                   Add
//                 </button>
//               </div>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {userLocation.map((loc) => (
//                   <span key={loc} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
//                     {loc}
//                     <IoMdCloseCircle onClick={() => removeLocation(loc)} />
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-2">Work Mode Preferences</label>
//               <div className="flex gap-4 flex-wrap">
//                 {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
//                   <label key={mode} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       value={mode}
//                       checked={resumeData.workModes.includes(mode)}
//                       onChange={(e) => {
//                         const { checked, value } = e.target;
//                         setResumeData({
//                           ...resumeData,
//                           workModes: checked
//                             ? [...resumeData.workModes, value]
//                             : resumeData.workModes.filter((m) => m !== value),
//                         });
//                       }}
//                     />
//                     <span>{mode}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-full font-semibold hover:from-teal-600 hover:to-blue-600"
//             >
//               Save Profile
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResumeModal;



import React, { useState, useEffect } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ResumeModal = ({ file, onClose }) => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Preparing your questions...");
  const [userSkills, setUserSkills] = useState([]);
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState([]);
  const [errors, setErrors] = useState({}); // 🔹 Track validation errors

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_BASEURL;

  const loadingMessages = [
    "Extracting skills from your resume...",
    "Analyzing your work experience...",
    "Identifying education details...",
    "Checking contact information...",
    "Matching with job preferences...",
    "Almost done!"
  ];

  useEffect(() => {
    let index = 0;
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMessage(loadingMessages[index % loadingMessages.length]);
        index++;
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleVerifyResume = async () => {
    if (!user) {
      toast.error('Sign in to verify resume');
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const res = await axios.post(`${BASEURL}/upload-resume`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      setResumeData({
        name: data?.name || '',
        email: data?.email || '',
        phone: data?.phone || '',
        dob: data?.dob || '',
        skills: data?.skills || [],
        qualifications: data?.qualifications || '',
        passoutYear: '',
        preferredLocation: '',
        currentLocation: '',
        workModes: [],
      });
      setUserSkills(data.skills || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error('Error verifying resume');
      setLoading(false);
    }
  };

  // 🔹 Validation logic
  const validateField = (name, value) => {
    let error = "";
    if (!value || value.trim() === "") {
      error = `${name} is required`;
    } else {
      if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        error = "Enter a valid email address";
      }
      if (name === "phone" && !/^[0-9]{10}$/.test(value)) {
        error = "Enter a valid 10-digit phone number";
      }
      if (name === "passoutYear" && (isNaN(value) || value < 1950 || value > new Date().getFullYear())) {
        error = "Enter a valid year";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });


    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    ["name", "email", "phone", "dob", "qualifications", "passoutYear", "currentLocation"].forEach((field) => {
      const errorMsg = validateField(field, resumeData[field]);
      if (errorMsg) newErrors[field] = errorMsg;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix errors before submitting");
      return;
    }

    const data = {
      ...resumeData,
      skills: userSkills,
      preferredLocation: userLocation,
      userId: user._id,
      replace: false,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('resume', file);

    try {
      const res = await axios.post(`${BASEURL}/save-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.exists) {
        if (window.confirm('Resume already exists. Replace it?')) {
          data.replace = true;
          const newFormData = new FormData();
          newFormData.append('data', JSON.stringify(data));
          newFormData.append('resume', file);
          await axios.post(`${BASEURL}/save-profile`, newFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
          toast.success('Resume replaced successfully!');
        } else {
          toast.error('Upload cancelled.');
          return;
        }
      } else {
        toast.success('Resume saved successfully!');
      }
      navigate('/interview-intro');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Error saving profile');
    }
  };

  const addSkill = () => {
    if (skill && !userSkills.includes(skill)) {
      setUserSkills([...userSkills, skill]);
      setSkill('');
    }
  };

  const removeSkill = (s) => {
    setUserSkills(userSkills.filter((item) => item !== s));
  };

  const addLocation = () => {
    if (location && !userLocation.includes(location)) {
      setUserLocation([...userLocation, location]);
      setLocation('');
    }
  };

  const removeLocation = (loc) => {
    setUserLocation(userLocation.filter((item) => item !== loc));
  };

  return (
    <div className="fixed inset-0 bg-stone-950/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        {!resumeData ? (
          <div className="text-center">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">{loadingMessage}</p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Verify Resume</h2>
                <button
                  onClick={handleVerifyResume}
                  className="bg-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600"
                >
                  Start Verification
                </button>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: 'Full Name', name: 'name' },
              { label: 'Email', name: 'email' },
              { label: 'Phone', name: 'phone' },
              { label: 'Date of Birth', name: 'dob', type: 'date' },
              { label: 'Qualifications', name: 'qualifications' },
              { label: 'Passout Year', name: 'passoutYear', type: 'number' },
              { label: 'Current Location', name: 'currentLocation' },
            ].map(({ label, name, type = 'text' }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={resumeData[name]}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 ${
                    errors[name]
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-teal-400"
                  }`}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

     
            <div>
              <label>Skills</label>
              <div className="flex">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 px-6 ml-2 rounded-full font-semibold hover:from-teal-600 hover:to-blue-600 transition duration-300"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {userSkills.map((s) => (
                  <span key={s} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                    {s}
                    <IoMdCloseCircle onClick={() => removeSkill(s)} />
                  </span>
                ))}
              </div>
            </div>

    
            <div>
              <label>Preferred Locations</label>
              <div className="flex">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
                />
                <button
                  type="button"
                  onClick={addLocation}
                  className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 px-6 ml-2 rounded-full font-semibold hover:from-teal-600 hover:to-blue-600 transition duration-300"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {userLocation.map((loc) => (
                  <span key={loc} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                    {loc}
                    <IoMdCloseCircle onClick={() => removeLocation(loc)} />
                  </span>
                ))}
              </div>
            </div>

      
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Work Mode Preferences</label>
              <div className="flex gap-4 flex-wrap">
                {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                  <label key={mode} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={mode}
                      checked={resumeData.workModes.includes(mode)}
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        setResumeData({
                          ...resumeData,
                          workModes: checked
                            ? [...resumeData.workModes, value]
                            : resumeData.workModes.filter((m) => m !== value),
                        });
                      }}
                    />
                    <span>{mode}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-full font-semibold hover:from-teal-600 hover:to-blue-600"
            >
              Save Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResumeModal;
