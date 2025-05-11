import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux'; // Remove Redux import
import { useContext } from 'react'; // Import useContext
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const AdminRoute = () => {
  // const { userInfo } = useSelector((state) => state.auth); // Remove Redux logic
  const { user } = useContext(AuthContext); // Use AuthContext

  // Check if user exists and has the 'admin' role
  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;