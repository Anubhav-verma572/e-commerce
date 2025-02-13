import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CSS/loginsignup.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      account: {
        email,
        password,
      },
    };

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://postive-ayurveda-backend-dark-glitter-9173.fly.dev/accounts/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const token = response.headers.get('Authorization')?.split(' ')[1];
        if (token) {
          toast.success('Successfully logged in!');
          localStorage.setItem('authToken', token);

          setTimeout(() => {
            // Redirect after login
            window.location.href = '/';
          }, 2000);
        } else {
          setError('Login successful, but no token received.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData?.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Log In</h1>
        <form className="loginsignup-fields" onSubmit={handleLoginSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="exampleInputEmail1" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="exampleInputPassword1" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Please wait...' : 'Log In'}
          </button>
        </form>

        <p className="loginsignup-login">
          Don't have an account? <button onClick={()=> navigate('/signup')}>Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
