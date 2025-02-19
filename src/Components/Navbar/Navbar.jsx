import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Correctly import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import { ShopContext } from '../../Context/ShopContext'; // Import ShopContext to access cart data

const Navbar = () => {
  const [menu, setMenu] = useState('Shop');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const { cartItems } = useContext(ShopContext); // Access cartItems from the context

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
    toast.success('Logout successful!', {
      autoClose: 1000, // Set the toast to auto-close after 1 second
    });
    navigate('/'); // Redirect to the homepage or any other route
  };

  // Calculate the total quantity of items in the cart
  const getCartItemCount = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
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
            <button>login</button>
          </Link> // Display "Log In" button if not logged in
        )}
        <Link style={{ textDecoration: 'none' }} to='/cart'>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getCartItemCount()}</div> {/* Display total count */}
      </div>

      {/* Corrected ToastContainer component */}
      <ToastContainer />
    </div>
  );
};

export default Navbar;
