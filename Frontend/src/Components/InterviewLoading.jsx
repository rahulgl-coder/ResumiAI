
import React, { useState, useEffect } from "react";

export const InterviewLoader = () => {
  const messages = [
    "Preparing your questions...",
    "Warming up the interview engine...",
    "Double-checking question accuracy...",
    "Loading topic-specific challenges...",
    "Polishing tricky scenarios...",
    "Almost ready to begin..."
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Interview</h2>
          <p className="text-gray-600 transition-all duration-500">{messages[messageIndex]}</p>
        </div>
      </div>
    </div>
  );
};
