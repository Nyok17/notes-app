import React, { useContext } from 'react';
import '../styles/auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; 
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { GlobalContext } from '../context';

const Register = () => {
  const{name, email, password, setName, setEmail, setPassword, handleRegister} = useContext(GlobalContext)
    

   

  return (
    <div className="auth-container">
    <div className="auth-box">
      <h2>Create an Account</h2>
      <form className='auth-form' onSubmit={handleRegister}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
        <button type="submit" className="auth-btn">Register</button>
      </form>
      <p>Or continue with</p>
      <div className="social-buttons">
        <button className="google"><FontAwesomeIcon icon={faGoogle}/></button>
        <button className="facebook"><FontAwesomeIcon icon={faFacebook} /></button>
        <button className="instagram"><FontAwesomeIcon icon={faInstagram} /></button>
      </div>
      <p className="switch">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  </div>
  )
}

export default Register
