import { useState } from 'react';
import { MapPin, Briefcase, Star, Mail, Bookmark, ChevronLeft, Phone, Linkedin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ResumeViewer from '../../Components/EmployerComponents/ResumeViewer';

const CandidateProfile = ({ candidate, onBack, token, BASEURL, initiallySaved }) => {
  const [isSaved, setIsSaved] = useState(initiallySaved);
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    jobTitle: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [resume,setResume]=useState(false)

  const handleSaveCandidate = async () => {
    try {
      if (isSaved) {
        await axios.delete(`${BASEURL}/employer/saved-candidates/${candidate.user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${BASEURL}/employer/saved-candidates`, 
          { candidateId: candidate.user._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Failed to toggle save candidate:", error);
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      await axios.post(`${BASEURL}/employer/send-email`, 
        {
          candidateId: candidate.user._id,
          ...emailData
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 3000);
      setEmailData({ subject: '', message: '', jobTitle: '' });
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSending(false);
    }
  };

  const getRandomGradient = () => {
    const gradients = [
      'bg-gradient-to-br from-indigo-500 to-purple-600',
      'bg-gradient-to-br from-blue-500 to-indigo-600',
      'bg-gradient-to-br from-pink-500 to-purple-600',
      'bg-gradient-to-br from-emerald-500 to-blue-600'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const CircularProgressBar = ({ percentage, size = 40 }) => {
    const radius = size / 2 - 5;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth="4"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <button 
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ChevronLeft className="mr-1" /> Back to candidates
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div 
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-md ${getRandomGradient()}`}
                  >
                    {candidate.user.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h1 className="text-2xl font-bold text-gray-800">{candidate.user.name}</h1>
                    <p className="text-gray-500">{candidate.user.email}</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">
                        {candidate.currentLocation}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSaveCandidate}
                  className={`p-2 rounded-full ${isSaved ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                >
                  <Bookmark fill={isSaved ? 'currentColor' : 'none'} />
                </button>
              </div>

              {candidate.interviewResult && (
                <div className="mt-6 bg-blue-50 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Interview Score</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {candidate.interviewResult.percentage}%
                    </p>
                  </div>
                  <div className="w-16 h-16">
                    <CircularProgressBar 
                      percentage={parseFloat(candidate.interviewResult.percentage)} 
                      size={64}
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Availability</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {candidate.workModes.map((mode, index) => (
                      <span 
                        key={index} 
                        className={`px-3 py-1 text-sm rounded-full ${
                          mode === 'Remote' ? 'bg-green-50 text-green-600' :
                          mode === 'Hybrid' ? 'bg-purple-50 text-purple-600' :
                          'bg-orange-50 text-orange-600'
                        }`}
                      >
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Expected Salary</h3>
                  <p className="text-gray-700 mt-1">{candidate.expectedSalary || 'Not specified'}</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Notice Period</h3>
                  <p className="text-gray-700 mt-1">{candidate.noticePeriod || 'Immediately available'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle Column - Detailed Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Professional Details</h2>

            <div className="space-y-6">
           

             
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
 <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-lg text-sm font-medium transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setResume(true);
                          }}
                        >
                          View Resume
                        </motion.button>
                
               
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Candidate</h2>

            {sendSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 text-green-700 p-4 rounded-lg mb-6"
              >
                <p className="font-medium">Email sent successfully!</p>
                <p className="text-sm mt-1">The candidate will receive your message shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSendEmail}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      value={emailData.jobTitle}
                      onChange={(e) => setEmailData({...emailData, jobTitle: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter job title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={emailData.subject}
                      onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Email subject"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      value={emailData.message}
                      onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Hi ${candidate.user.name.split(' ')[0]}, we'd like to discuss the opportunity...`}
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSending}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-medium shadow-md flex items-center justify-center"
                    >
                      {isSending ? (
                        'Sending...'
                      ) : (
                        <>
                          <Mail className="mr-2" size={18} />
                          Send Mail
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </form>
            )}

            <div className="mt-8 border-t border-gray-100 pt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Contact Information</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{candidate.user.email}</span>
                </li>
                {candidate.phone && (
                  <li className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">{candidate.phone}</span>
                  </li>
                )}
                {candidate.linkedIn && (
                  <li className="flex items-center">
                    <Linkedin className="w-5 h-5 text-gray-400 mr-3" />
                    <a 
                      href={candidate.linkedIn} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </li>
                )}
                {candidate.portfolio && (
                  <li className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-400 mr-3" />
                    <a 
                      href={candidate.portfolio} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Portfolio Website
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
  
{resume && ( <ResumeViewer  candidate={candidate}  setResume={setResume}/>
  )}
    </motion.div>
  );
};

export default CandidateProfile;