import React from 'react'
import './CSS/loginsignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">

          <input type="text" placeholder='Enter Name' />
          <input type="e-mail" placeholder='Enter Email' />
          <input type="password" placeholder='Enter Password' />
        </div>
        <button>Continue </button>
        <p className="loginsignup-login">
          Already have an account? <span>Login Here</span>                      
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By Continuing, i agree to the term of use & privacy policy.</p>
          </div>
        </p>
      </div>
    </div>
  )
}

export default LoginSignup