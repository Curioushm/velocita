import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router-dom

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // --- Mock Login Logic ---
    // In a real app, you would call your authentication API here
    // For demonstration, let's assume some users are admins
    const adminEmail = 'naihritmukherjee05@gmail.com';
    const adminPassword = '123456';

    let userData = null;
    if (email === adminEmail && password === adminPassword) {
      userData = { id: 1, name: 'Admin NM', email: adminEmail, role: 'admin' };
    } else if (email === 'user@example.com' && password === 'userpass') { // Example normal user
      userData = { id: 2, name: 'Normal User', email: 'user@example.com', role: 'user' };
    }
    // --- End Mock Login Logic ---

    if (userData) {
      // Store user data/token as needed (e.g., in localStorage or context)
      console.log('Login successful:', userData);

      if (userData.role === 'admin') {
        navigate('/admin-dashboard'); // Redirect admin to admin dashboard
      } else {
        navigate('/home'); // Redirect normal user to their home page
      }
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
