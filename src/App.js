import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Shop from './Pages/Shop';
import Footer from './Components/Footer/Footer';
import SignUp from './Pages/SignUp';  
import Login from './Pages/login';    
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from '../src/Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/Men' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/Women' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/Kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productid' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/signup' element={<SignUp />} /> {/* Use SignUp component */}
          <Route path='/login' element={<Login />} />   {/* Use Login component */}
        </Routes>
        <Footer />
        {/* ToastContainer to display notifications */}
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
