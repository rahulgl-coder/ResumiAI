

import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import toast from 'react-hot-toast';
import SignInModal from './Signup';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ allowedRoles, redirectTo,role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Sign in first to use the features");
      setIsOpen(true);
    }
  }, [token]);

  if (!token) {
    return (
      <SignInModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          navigate(redirectTo); 
        }}
        role={role}
      />
    );
  }

  try {
    const { role } = JSON.parse(atob(token.split('.')[1]));

    if (allowedRoles.includes(role)) {
      return <Outlet />;
    }

    toast.error("Unauthorized access");
    return <Navigate to="/unauthorized" replace />;
  } catch (error) {
    toast.error("Invalid session, please sign in again");
    return <Navigate to={redirectTo} replace />;
  }
};

export default ProtectedRoute;
