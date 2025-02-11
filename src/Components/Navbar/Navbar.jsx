import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState('Shop');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status whenever the component re-renders
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // User is logged in if the token exists
    } else {
      setIsLoggedIn(false); // User is logged out if no token exists
    }
  }, [navigate]); // Re-run the effect if navigate changes (like after login or logout)

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token from localStorage
    setIsLoggedIn(false); // Update state to reflect logout
    navigate('/'); // Redirect to the homepage or any other route
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => { setMenu('Shop'); }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === 'Shop' ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu('Men'); }}><Link style={{ textDecoration: 'none' }} to='/Men'>Men</Link>{menu === 'Men' ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu('Women'); }}><Link style={{ textDecoration: 'none' }} to='/Women'>Women</Link>{menu === 'Women' ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu('Kids'); }}><Link style={{ textDecoration: 'none' }} to='/Kids'>Kids</Link>{menu === 'Kids' ? <hr /> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Log Out</button> // Display "Log Out" button if logged in
        ) : (
          <Link style={{ textDecoration: 'none' }} to='/login'>
            <button>Login</button>
          </Link> // Display "Log In" button if not logged in
        )}
        <Link style={{ textDecoration: 'none' }} to='/cart'>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
