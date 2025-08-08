


import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const ProtectedRoute = ({ allowedRoles }) => {
  const token = useSelector((state) => state.user.token);
 if (!token) return <Navigate to="/" />;

  try {
    const { role } = JSON.parse(atob(token.split('.')[1])); 

    if (allowedRoles.includes(role)) {
      return <Outlet />;
    }

   return <Navigate to="/unauthorized" />;

  } catch (error) {
    
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
