
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from '../src/Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
function App() {
  return (
    <div >

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop/>}></Route>
          <Route path='/Men'   element={<ShopCategory banner = {men_banner}category="men" />}></Route>
          <Route path='/Women' element={<ShopCategory banner = {women_banner} category="women" />}></Route>
          <Route path='/Kids'  element={<ShopCategory  banner = {kid_banner}category="kid" />}></Route>
          <Route path='/product' element={<Product />}>
            <Route path=':productid' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/signup' element={<LoginSignup />}></Route>
        </Routes>
        <Footer/>

      </BrowserRouter>
    </div>
  );
}

export default App;
