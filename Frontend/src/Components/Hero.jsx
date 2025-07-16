import React, { useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { useSelector } from 'react-redux';  
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const Hero = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState([]);
  const user = useSelector((state) => state.user.user);
  const navigate=useNavigate()


  

  const BASEURL = import.meta.env.VITE_BASEURL;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleVerifyResume = async () => {
console.log(user);

    if(!user){
      
     toast.error("Sign In for features")
     return

    }
    if (
      selectedFile &&
      ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(selectedFile.type)
    ) {
      const formData = new FormData();
      formData.append('resume', selectedFile);

      try {
        const res = await axios.post(`${BASEURL}/upload-resume`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
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
          workModes: []
        });
        setUserSkills(data.skills || []);
      } catch (err) {
        console.error(err);
        alert('Error uploading resume');
      }
    } else {
      alert('Invalid file type');
    }
  };

  const handleModalClose = () => {
    setResumeData(null);
    setSelectedFile(null);
    setUserSkills([]);
    setUserLocation([]);
    setSkill('');
    setLocation('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWorkModeChange = (e) => {
    const { value, checked } = e.target;
    setResumeData((prev) => {
      const currentModes = prev.workModes || [];
      return {
        ...prev,
        workModes: checked
          ? [...currentModes, value]
          : currentModes.filter((mode) => mode !== value),
      };
    });
  };

  const cleanPhoneNumber = (input) => {
  let phone = input.trim();

  if (phone.startsWith('+91')) {
    phone = phone.slice(3);
  } else if (phone.startsWith('0')) {
    phone = phone.slice(1);
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone) ? phone : null;
};


  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    const nameRegex = /^[a-zA-Z ]{3,}$/;
    const locationRegex = /^[a-zA-Z ,.-]{2,}$/;
    const cleanedPhone = cleanPhoneNumber(resumeData.phone);


    if (!nameRegex.test(resumeData.name)) return 'Invalid name';
    if (!emailRegex.test(resumeData.email)) return 'Invalid email';

     if (!cleanedPhone)   return 'Invalid phone number';




    if (!resumeData.dob) return 'Date of Birth is required';
    if (!locationRegex.test(resumeData.currentLocation)) return 'Invalid current location';

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateFields();
    if (error) return alert(error);

const data= {...resumeData,
        skills: userSkills,
        preferredLocation: userLocation,
       userId: user._id}
        console.log(data);
        
    try {
  const res=  await axios.post(`${BASEURL}/save-profile`, data);


      alert('Profile saved successfully!');
      navigate('/interview-intro')
      handleModalClose();
    } catch (err) {
      console.error(err);
      alert('Error saving profile');
    }
  };

  const removeSkill = (skill) => {
    setUserSkills(userSkills.filter((s) => s !== skill));
  };

  const addSkill = (data) => {
    if (data && !userSkills.includes(data)) {
      setUserSkills([...userSkills, data]);
      setSkill('');
    }
  };

  const removeLocation = (loc) => {
    setUserLocation(userLocation.filter((s) => s !== loc));
  };

  const addLocation = (data) => {
    if (data && !userLocation.includes(data)) {
      setUserLocation([...userLocation, data]);
      setLocation('');
    }
  };
  

  return (
    <>
      <section className="bg-gradient-to-r from-blue-50 to-teal-50 h-screen  flex items-center justify-center text-black relative">
        <div className="text-center max-w-4xl mx-auto px-4">
          <motion.h1 className="text-4xl sm:text-6xl font-extrabold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Launch Your Career with Resumi
          </motion.h1>
          <motion.p className="text-lg sm:text-2xl mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Upload your resume and get verified instantly!
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
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
            >
              <FaUpload />
              <span>{selectedFile ? selectedFile.name : 'Upload Resume'}</span>
            </motion.label>
            <motion.button
              onClick={handleVerifyResume}
              className="bg-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600"
              whileHover={{ scale: 1.05 }}
              // disabled={!selectedFile}
            >
              Verify Now
            </motion.button>
          </div>
        </div>

        {/* Modal */}
        {resumeData && (
          <div className="fixed inset-0 bg-stone-950/30 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={handleModalClose}
                className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">Edit & Save Resume Details</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { label: 'Full Name', name: 'name' },
                  { label: 'Email', name: 'email' },
                  { label: 'Phone', name: 'phone' },
                  { label: 'Date of Birth', name: 'dob', type: 'date' },
                  // { label: 'Skills (comma-separated)', name: 'skills' },
                  { label: 'Qualifications', name: 'qualifications' },
                  { label: 'Passout Year', name: 'passoutYear', type: 'number' },
                  // { label: 'Preferred Location', name: 'preferredLocation' },
                  { label: 'Current Location', name: 'currentLocation' },
                ].map(({ label, name, type = 'text' }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={resumeData[name]}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
                      required={['name', 'email'].includes(name)}
                    />
                  </div>

                ))}


                <div>
                  
                    <label htmlFor="">Skills</label>
                  <div className='flex'>
                      <input type="text"
                    value={skill}
                    onChange={(e)=>setSkill(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400' />
                  <p className=' bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 px-6 ml-2 rounded-full font-semibold hover:from-teal-600 hover:to-blue-600 transition duration-300' onClick={()=>addSkill(skill)}>Add</p>
                  </div>
                  
                <div className='flex flex-wrap gap-2'>
                  {userSkills?.map((field) => {
                    return(
                        <div key={field.name} className="mb-4   w-fit  ">
                  
                        <p
                          className="mt-1  flex items-center gap-1  border border-gray-300 rounded-md shadow-sm p-2"
                        >{field} <span onClick={()=>{removeSkill(field)}}><IoMdCloseCircle /></span></p>
                      </div>
                    )
})}
</div>
</div>

 <div>
                  
                    <label htmlFor="">Prefered Locations</label>
                  <div className='flex'>
                      <input type="text"
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400' />
                  <p className=' bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 px-6 ml-2 rounded-full font-semibold hover:from-teal-600 hover:to-blue-600 transition duration-300' onClick={()=>addLocation(location)}>Add</p>
                  </div>
                  
                <div className='flex flex-wrap gap-2'>
                  {userLocation?.map((field) => {
                    return(
                        <div key={field.name} className="mb-4   w-fit  ">
                      
                        <p
                          className="mt-1  flex items-center gap-1  border border-gray-300 rounded-md shadow-sm p-2"
                        >{field} <span onClick={()=>{removeLocation(field)}}><IoMdCloseCircle /></span></p>
                      </div>
                    )
})}
</div>
</div>


                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Work Mode Preferences</label>
                  <div className="flex gap-4 flex-wrap">
                    {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                      <label key={mode} className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                        <input
                          type="checkbox"
                          value={mode}
                          checked={resumeData.workModes.includes(mode)}
                          onChange={handleWorkModeChange}
                          className="accent-teal-500"
                        />
                        <span>{mode}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-full font-semibold hover:from-teal-600 hover:to-blue-600 transition duration-300"
                >
                  Save Profile
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Hero;

