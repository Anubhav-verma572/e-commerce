import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import './CSS/loginsignup.css';

const LoginSignup = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false); // State to toggle login form visibility

  // Handle sign-up submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setError('You must agree to the terms and conditions');
      return;
    }

    // Ensure phone is a string and remove any non-numeric characters
    const formattedPhone = phone.replace(/[^0-9]/g, ''); // Keep only numbers

    if (formattedPhone.length === 0) {
      setError('Phone number cannot be empty');
      return;
    }

    // Prepare the data to send to the API
    const requestData = {
      account: {
        name, 
        phone_number: formattedPhone, // Phone number as string of digits
        email, 
        password,
      },
    };

    setLoading(true);

    try {
      const response = await fetch('https://postive-ayurveda-backend-dark-glitter-9173.fly.dev/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        // Show toast for successful sign-up
        toast.success('Sign up successful! Please log in.');
        setError('');
        setName('');
        setPhone('');
        setEmail('');
        setPassword('');

        // After showing success message, automatically show login form after a delay
        setTimeout(() => {
          setIsLoginFormVisible(true); // Switch to the login form after 2 seconds
        }, 2000);
      } else {
        // Log the full error response to help debug
        console.log('API error details:', data);
        setError(data?.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.log('Network or other error:', error);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      account: {
        email,
        password,
      },
    };

    setLoading(true);
    setError(''); // Clear any existing errors

    try {
      const response = await fetch('https://postive-ayurveda-backend-dark-glitter-9173.fly.dev/accounts/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        // Show toast for successful login
        toast.success('Successfully logged in!');

        // Wait for the toast to be shown before redirecting
        setTimeout(() => {
          // Save the token in localStorage
          localStorage.setItem('authToken', data.token); // Store the token in localStorage

          // Redirect to homepage on successful login
          navigate('/'); // Assuming '/home' is your homepage route
        }, 2000); // 2-second delay to allow the toast to be visible
      } else {
        setError(data?.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle between sign-up and login forms
  const handleLoginToggle = () => {
    setIsLoginFormVisible(!isLoginFormVisible); // Toggle the login form visibility
    setError(''); // Clear error message when toggling forms
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{isLoginFormVisible ? 'Log In' : 'Sign Up'}</h1>

        {!isLoginFormVisible && (
          <form className="loginsignup-fields" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Enter Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Enter Phone Number" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
            <input 
              type="email" 
              placeholder="Enter Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />

            {error && <p className="error-message">{error}</p>}

            <div className="loginsignup-agree">
              <input 
                type="checkbox" 
                id="terms" 
                checked={termsAccepted} 
                onChange={() => setTermsAccepted(!termsAccepted)} 
              />
              <label htmlFor="terms">By continuing, I agree to the Terms of Use & Privacy Policy.</label>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Please wait...' : 'Continue'}
            </button>
          </form>
        )}

        {isLoginFormVisible && (
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
        )}

        {isLoginFormVisible && error && (
          <p className="signup-prompt">
            Don't have an account? <button onClick={handleLoginToggle}>Sign Up</button>
          </p>
        )}

        <p className="loginsignup-login">
          {isLoginFormVisible ? (
            <span>Don't have an account? <button onClick={handleLoginToggle}>Sign Up</button></span>
          ) : (
            <span>Already have an account? <button onClick={handleLoginToggle}>Log In</button></span>
          )}
        </p>
      </div>

      {/* ToastContainer to display toast messages */}
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
