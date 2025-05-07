const config = {
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api', // Default to localhost:5000/api
  headers: {
    'Content-Type': 'application/json',
  },
};

export default config;
