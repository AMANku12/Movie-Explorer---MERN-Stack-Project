import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import axios from 'axios';

const Login = ({ setUser , setLoggedIn}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username: formData.username,
        password: formData.password,
      });
      
      if (response.data.status === "Success") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        setLoggedIn(true);
        navigate("/");
      } else {
        setError(response.data.message);
        setLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Please sign in to continue</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="username"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>

        <div className="auth-links">
          <Link to="/register">Don't have an account? Sign up</Link>
          <div className="divider">or</div>
          <Link to="/" className="back-home">← Back to Home</Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
