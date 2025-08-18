



import { useState } from "react";

const ResumeViewer = ({ candidate, setResume }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Enhanced background overlay with blur */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-all duration-300 ease-out"
        onClick={() => setResume(false)}
      ></div>

      {/* Modal container with animation */}
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Modal content with glassmorphism effect */}
        <div 
          className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 w-full max-w-6xl max-h-[90vh] flex flex-col transform transition-all duration-300 ease-out scale-100 opacity-100"
          style={{ 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
          }}
        >
          {/* Header with gradient */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {candidate.user.name}'s Resume
                </h3>
                <p className="text-sm text-gray-600">Professional Profile</p>
              </div>
            </div>
            
            <button
              onClick={() => setResume(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Iframe container with enhanced styling */}
          <div className="flex-1 p-6 overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-br from-blue-50/50 to-indigo-50/50 backdrop-blur-sm">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200"></div>
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
                  </div>
                  <p className="text-gray-600 font-medium">Loading resume...</p>
                </div>
              </div>
            )}
            
            <iframe
              src={`${candidate.resume}#view=fitH`}
              className={`w-full h-full min-h-[70vh] border-0 rounded-xl shadow-inner transition-all duration-500 ${
                isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
              title={`${candidate.user.name}'s Resume`}
              onLoad={() => setIsLoading(false)}
              style={{ 
                filter: isLoading ? 'blur(4px)' : 'none',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
              }}
            />
          </div>

          {/* Footer with modern styling */}
          <div className="p-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/80 to-blue-50/80 rounded-b-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Resume Document</span>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => window.open(candidate.resume, '_blank')}
                  className="px-6 py-2.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-lg border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                >
                  Open in New Tab
                </button>
                <button
                  onClick={() => setResume(false)}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;