

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { setUser } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';


const GoogleLoginButton = ({ buttonText = "Sign In with Google", onSuccessLogin,role }) => {
  const dispatch=useDispatch()
  const BASEURL=import.meta.env.VITE_BASEURL
  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
   
      

      const res = await axios.post(`${BASEURL}/auth/google`, {
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
        text={buttonText} 
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

