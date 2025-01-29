import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'

const Navbar = () => {

   const [menu,setmenu]= useState("Shop");


  return (
    <div className='navbar' >
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{ setmenu("Shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="Shop"?<hr/>:<></>}</li>
            <li onClick={()=>{ setmenu("Men")}}> <Link style={{textDecoration:'none'}} to='/Men'>Men</Link> {menu==="Men"?<hr/>:<></>}</li>
            <li onClick={()=>{ setmenu("Women")}}><Link style={{textDecoration:'none'}} to='/Women'>Women</Link>{menu==="Women"?<hr/>:<></>}</li>
            <li onClick={()=>{ setmenu("Kids")}}> <Link style={{textDecoration:'none'}} to='/Kids'>Kids</Link>{menu==="Kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link style={{textDecoration:'none'}} to='/login'><button>Login</button></Link>
            <Link style={{textDecoration:'none'}} to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">0</div>
        </div>
    </div>
  )
}

export default Navbar