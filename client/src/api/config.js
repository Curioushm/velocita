const config = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? '/api'
    : 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default config;
