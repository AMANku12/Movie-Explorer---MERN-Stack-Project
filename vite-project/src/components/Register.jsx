import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

  const Register = ({setUser, setLoggedIn}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic
    axios.post("http://localhost:3001/api/register", formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log("response from register", response.data);
    }).catch((err)=>{
      console.log("error in registering user", err);
    })
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join us and start exploring movies</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>

        <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
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
            Create Account
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">Already have an account? Sign in</Link>
          <div className="divider">or</div>
          <Link to="/" className="back-home">← Back to Home</Link>
        </div>

        
      </div>
    </div>
  );
};

export default Register;
