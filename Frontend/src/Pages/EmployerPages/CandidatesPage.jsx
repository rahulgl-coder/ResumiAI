
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Nav from '../../Components/EmployerComponents/Nav';
import CandidateSearch from '../../Components/EmployerComponents/CandidateSearch';
import { useSelector } from 'react-redux';
import CandidateProfile from './CandidateProfile';

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    skill: '',
    workMode: '',
    minPercentage: '',
    passoutYear: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [savedCandidates, setSavedCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const BASEURL = import.meta.env.VITE_BASEURL;
  const { token } = useSelector((state) => state.user);
  const [hasPaid,setHasPaid]=useState(false)

  useEffect(() => {
   

    fetchCandidates();
  }, [BASEURL, token]);

    useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const res = await axios.get(`${BASEURL}/employer/check-payment`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasPaid(res.data.hasPaid);
      } catch (error) {
        console.error("Error checking payment status:", error);
        setHasPaid(false);
      } finally {
        setIsCheckingPayment(false);
      }
    };
    checkPaymentStatus();
  }, [token, BASEURL]);



    const fetchCandidates = async () => {
     try {
       setLoading(true);
       const res = await axios.get(`${BASEURL}/employer/candidates`,{
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       setCandidates(res.data);
       setLoading(false);
    } catch (error) {
       console.error("Failed to fetch candidates:", error);
       setLoading(false);
     }
   };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = 
      !filters.location || 
      candidate.currentLocation.toLowerCase().includes(filters.location.toLowerCase()) ||
      candidate.preferredLocation.some(loc => loc.toLowerCase().includes(filters.location.toLowerCase()));
    
    const matchesSkill = 
      !filters.skill || 
      candidate.skills.some(skill => skill.toLowerCase().includes(filters.skill.toLowerCase()));
    
    const matchesWorkMode = 
      !filters.workMode || 
      candidate.workModes.includes(filters.workMode);
    
    const matchesPercentage = 
      !filters.minPercentage || 
      (candidate.interviewResult && parseFloat(candidate.interviewResult.percentage) >= parseFloat(filters.minPercentage));
    
    const matchesPassoutYear = 
      !filters.passoutYear || 
      candidate.passoutYear.toString() === filters.passoutYear;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesSkill &&
      matchesWorkMode &&
      matchesPercentage &&
      matchesPassoutYear
    );
  });

  const clearFilters = () => {
    setFilters({
      location: '',
      skill: '',
      workMode: '',
      minPercentage: '',
      passoutYear: ''
    });
    setSearchTerm('')
  };

  const CircularProgressBar = ({ percentage, size = 40 }) => {
    const radius = (size - 4) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
          <circle
            className="text-gray-200"
            strokeWidth="3"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="text-blue-500 transform -rotate-90 origin-center"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
      </div>
    );
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

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-r from-blue-50/20 to-teal-50/20 pt-16">
        {selectedCandidate ? (
          <CandidateProfile 
            candidate={selectedCandidate} 
            onBack={() => setSelectedCandidate(null)}
            token={token}
            BASEURL={BASEURL}
            initiallySaved={savedCandidates.includes(selectedCandidate.user._id)}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CandidateSearch 
              filters={filters} 
              setFilters={setFilters}
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              showFilters={showFilters} 
              setShowFilters={setShowFilters} 
              clearFilters={clearFilters}
            />

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredCandidates.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCandidates.map((candidate) => (
                  <motion.div
                    key={candidate.user._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 cursor-pointer"
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div 
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-md ${getRandomGradient()}`}
                          >
                            {candidate.user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">{candidate.user.name}</h3>

                            {hasPaid?
                           <p className="text-sm text-gray-500">{candidate.user.email}</p>:
                            <p className="text-gray-500 filter blur-sm pointer-events-none ">{candidate.user.email}</p>
                            
                          }
                           
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>
                            {candidate.currentLocation} • Prefers {candidate.preferredLocation.join(', ')}
                          </span>
                        </div>

                        {candidate.interviewResult && (
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span>Interview: {candidate.interviewResult.percentage}%</span>
                            </div>
                          </div>
                        )}

                        <div className="pt-2">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                                +{candidate.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-between gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-lg text-sm font-medium transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCandidate(candidate);
                          }}
                        >
                          View Profile
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Search className="text-gray-400 w-8 h-8" />
                </div>
                <h4 className="text-lg font-medium text-gray-700 mb-2">No candidates found</h4>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Try adjusting your search or filter criteria
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </motion.button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CandidatesPage;