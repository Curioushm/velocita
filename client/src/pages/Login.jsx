import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'; // Import icons

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      // Optional: Clear the state from location so message doesn't reappear on refresh
      // navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // --- Mock Login Logic ---
    const adminEmail = 'naihritmukherjee05@gmail.com';
    const adminPassword = '123456';
    let userData = null;

    // Check registered users from localStorage first
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const foundUser = registeredUsers.find(
      (user) => user.email === email && user.password === password // Comparing plain password for mock
    );

    if (foundUser) {
      userData = foundUser; // This user will have role 'user' as set during registration
    } else if (email === adminEmail && password === adminPassword) {
      userData = { id: 1, name: 'Admin NM', email: adminEmail, role: 'admin' };
    }
    // Removed the generic 'user@example.com' to prioritize registered users and admin
    // --- End Mock Login Logic ---

    if (userData) {
      setUser(userData); // Set user in AuthContext
      localStorage.setItem('userInfo', JSON.stringify(userData)); // Optionally, keep localStorage sync
      console.log('Login successful:', userData);

      if (userData.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/'); // Navigate to home/root for normal users
      }
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="bg-gray-50 py-12 min-h-screen flex items-center justify-center">
      <div className="container-custom max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
              <p className="text-gray-600">Sign in to continue to VELOCITA ELECTRONICS</p>
            </div>

            {message && (
              <div className="bg-green-50 text-green-600 p-3 rounded-md mb-6 text-sm">
                {message}
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {/* Optional: Add a "Forgot password?" link here if needed */}
              {/* <div className="text-right mb-6">
                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-dark">
                  Forgot password?
                </Link>
              </div> */}

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center"
                // disabled={loading} // Assuming you might add a loading state later
              >
                <span className="flex items-center">
                  Sign In <FiLogIn className="ml-2" />
                </span>
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:text-primary-dark font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
