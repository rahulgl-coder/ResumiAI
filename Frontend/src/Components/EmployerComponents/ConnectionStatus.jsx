import React, { useState } from 'react';
import { Bookmark, Clock, CheckCircle, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ConnectionStatus = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const [expanded, setExpanded] = useState(true);

  const tabs = [
    { id: 'saved', label: 'Saved Profiles', icon: Bookmark, count: 12 },
    { id: 'awaiting', label: 'Awaiting Response', icon: Clock, count: 5 },
    { id: 'contacts', label: 'Active Contacts', icon: Users, count: 8 },
    { id: 'rejected', label: 'Rejected', icon: CheckCircle, count: 3 }
  ];

  // Mock data for each tab
  const mockProfiles = {
    saved: [
      { id: 1, name: 'Alex Johnson', role: 'Senior UX Designer', company: 'TechCorp', date: 'Saved 3 days ago' },
      { id: 2, name: 'Maria Garcia', role: 'Product Manager', company: 'DesignHub', date: 'Saved 1 week ago' },
      { id: 3, name: 'James Wilson', role: 'Frontend Developer', company: 'WebSolutions', date: 'Saved 2 weeks ago' }
    ],
    awaiting: [
      { id: 1, name: 'Sarah Miller', role: 'HR Director', company: 'HireFast', date: 'Request sent 5 days ago' },
      { id: 2, name: 'David Kim', role: 'CTO', company: 'StartUpX', date: 'Request sent 2 days ago' }
    ],
    contacts: [
      { id: 1, name: 'Emily Chen', role: 'Recruiter', company: 'TalentFind', date: 'Connected 1 month ago' },
      { id: 2, name: 'Robert Taylor', role: 'Engineering Manager', company: 'DevHouse', date: 'Connected 3 weeks ago' },
      { id: 3, name: 'Lisa Wong', role: 'Career Advisor', company: 'PathFinder', date: 'Connected 2 months ago' }
    ],
    rejected: [
      { id: 1, name: 'Michael Brown', role: 'CEO', company: 'ExecCorp', date: 'Rejected 1 week ago' }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header with toggle */}
        <div 
          className="px-6 py-4 border-b border-gray-200 flex items-center justify-between cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            Connection Status
          </h2>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {/* Tab Navigation */}
              <div className="px-6 pt-4 flex overflow-x-auto scrollbar-hide">
                <nav className="flex space-x-1">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <div className="space-y-4">
                  {mockProfiles[activeTab].map(profile => (
                    <motion.div
                      key={profile.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                              {profile.name.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{profile.name}</h3>
                            <p className="text-sm text-gray-600">{profile.role} • {profile.company}</p>
                            <p className="text-xs text-gray-500 mt-1">{profile.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {activeTab === 'saved' && (
                            <>
                              <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                              </button>
                              <button className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </>
                          )}
                          {activeTab === 'awaiting' && (
                            <button className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-sm transition-colors">
                              Pending
                            </button>
                          )}
                          {activeTab === 'contacts' && (
                            <button className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm flex items-center gap-1 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              Message
                            </button>
                          )}
                          {activeTab === 'rejected' && (
                            <button className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm transition-colors">
                              Rejected
                            </button>
                          )}
                          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {mockProfiles[activeTab].length === 0 && (
                  <div className="text-center py-12">
                    <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      {activeTab === 'saved' && <Bookmark className="text-gray-400 w-8 h-8" />}
                      {activeTab === 'awaiting' && <Clock className="text-gray-400 w-8 h-8" />}
                      {activeTab === 'contacts' && <Users className="text-gray-400 w-8 h-8" />}
                      {activeTab === 'rejected' && <CheckCircle className="text-gray-400 w-8 h-8" />}
                    </div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">
                      No {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}
                    </h4>
                    <p className="text-gray-500 max-w-md mx-auto">
                      {activeTab === 'saved' && 'Save profiles to easily access them later'}
                      {activeTab === 'awaiting' && 'Profiles you\'ve contacted will appear here'}
                      {activeTab === 'contacts' && 'Your active connections will appear here'}
                      {activeTab === 'rejected' && 'Rejected profiles will appear here'}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ConnectionStatus;