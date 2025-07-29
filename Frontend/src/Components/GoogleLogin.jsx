// // GoogleLoginButton.jsx
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';

// import axios from 'axios';
// import PropTypes from 'prop-types';

// const GoogleLoginButton = ({ onSuccessLogin }) => {
//   const handleSuccess = async (credentialResponse) => {
//     try {
//       const decoded = jwt_decode(credentialResponse.credential);
//       console.log("Decoded Google User:", decoded);

//       const res = await axios.post('http://localhost:5000/auth/google', {
//         token: credentialResponse.credential,
//       });

//       onSuccessLogin(res.data); // Pass user data to parent
//     } catch (err) {
//       console.error('Google login failed', err);
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       <GoogleLogin
//         onSuccess={handleSuccess}
//         onError={() => console.log('Google Login Failed')}
//       />
//     </GoogleOAuthProvider>
//   );
// };

// GoogleLoginButton.propTypes = {
//   onSuccessLogin: PropTypes.func.isRequired,
// };

// export default GoogleLoginButton;

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const GoogleLoginButton = ({ buttonText = "Sign In with Google", onSuccessLogin }) => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Decoded User Info:", decoded);

      const res = await axios.post('http://localhost:5000/auth/google', {
        token: credentialResponse.credential,
      });

      if (onSuccessLogin) {
        onSuccessLogin(res.data);
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log('Login Failed')}
        text={buttonText} // optional, depending on your button style
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

