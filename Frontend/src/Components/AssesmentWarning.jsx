import React, { useEffect, useState } from 'react';

const AssessmentWarning = ({ seconds,message  }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, visible]);

  if (!visible || timeLeft <= 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg shadow-md text-sm font-medium flex items-center justify-between gap-3 min-w-[300px]">
      <div className="flex items-center gap-2">
       {message}
        <span className="text-xs font-semibold text-red-600">
          ({timeLeft}s)
        </span>
      </div>
      <button
        className="text-yellow-800 hover:text-red-600 text-xl font-bold"
        onClick={() => setVisible(false)}
        title="Dismiss"
      >
        &times;
      </button>
    </div>
  );
};

export default AssessmentWarning;
