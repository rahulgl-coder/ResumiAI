import React, { useState, useEffect, useRef } from 'react';

const MinimalCounters = () => {
  const [candidates, setCandidates] = useState(0);
  const [employers, setEmployers] = useState(0);
  const [placements, setPlacements] = useState(0);
  const countersRef = useRef(null);

  const finalValues = {
    candidates: 1250,
    employers: 350,
    placements: 890
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.unobserve(countersRef.current);
        }
      },
      { threshold: 0.5 }
    );

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    return () => {
      if (countersRef.current) {
        observer.unobserve(countersRef.current);
      }
    };
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCandidates(Math.floor(progress * finalValues.candidates));
      setEmployers(Math.floor(progress * finalValues.employers));
      setPlacements(Math.floor(progress * finalValues.placements));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  return (
    <div 
      ref={countersRef}
      className="w-full bg-gray-800 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
   
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold text-white mb-2">
            {candidates.toLocaleString()}+
          </div>
          <div className="text-xl text-white">Candidates</div>
        </div>
        
     
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold text-white mb-2">
            {employers.toLocaleString()}+
          </div>
          <div className="text-xl text-white">Employers</div>
        </div>
        
      
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold text-white mb-2">
            {placements.toLocaleString()}+
          </div>
          <div className="text-xl text-white">Placements</div>
        </div>
      </div>
    </div>
  );
};

export default MinimalCounters;