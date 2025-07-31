
// import React from 'react';

// const Unauthorized = () => {
//   return (
//     <div style={{ textAlign: 'center', padding: '2rem' }}>
//       <h1>🚫 403 - Unauthorized</h1>
//       <p>You do not have permission to view this page.</p>
//     </div>
//   );
// };

// export default Unauthorized;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: 'center',
      padding: '3rem',
      backgroundColor: '#fefefe',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#e63946', marginBottom: '1rem' }}>
        🚫 403 - Unauthorized
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#333' }}>
        You do not have permission to view this page.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '0.8rem 2rem',
          fontSize: '1rem',
          backgroundColor: '#1d3557',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#457b9d';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#1d3557';
          e.target.style.transform = 'scale(1)';
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Unauthorized;
