

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { setUser } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';


const GoogleLoginButton = ({ buttonText = "Sign In with Google", onSuccessLogin,role }) => {
  const dispatch=useDispatch()
  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log(decoded);
      

      const res = await axios.post('http://localhost:5000/auth/google', {
        token: credentialResponse.credential,role
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

