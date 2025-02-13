import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import './CSS/loginsignup.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

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

    const requestData = {
      account: {
        name, 
        phone_number: formattedPhone,
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
        toast.success('Sign up successful! Please log in.');
        setError('');
        setName('');
        setPhone('');
        setEmail('');
        setPassword('');

        // Automatically show login form after a delay
        setTimeout(() => {
          navigate('/login'); // Navigate to the Login page
        }, 2000);
      } else {
        setError(data?.message || 'Something went wrong. Please try again.');
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
        <h1>Sign Up</h1>
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

        <p className="loginsignup-login">
          Already have an account? <button onClick={() => navigate('/login')}>Log In</button> {/* Use navigate here */}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
