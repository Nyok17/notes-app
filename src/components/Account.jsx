import React, { useEffect, useContext } from 'react';
import '../styles/account.css';
import { GlobalContext } from '../context';

const Account = () => {
    const {isOpen, setIsOpen, profileRef, userData, handleLogout} = useContext(GlobalContext)
 

  const toggleProfile = () => setIsOpen(!isOpen);

 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileRef, setIsOpen]);
  

  return (
    <div className="profile-container" ref={profileRef}>
      <button className="profile-icon" onClick={toggleProfile}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>

      {isOpen && (
        <div className="profile-dropdown">
          <div className="user-email">{userData?.email || "your.email@example.com"}</div>

          <div className="profile-image">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <div className="greeting">Hi, {userData?.name || "User"}</div>

          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  )
    
};

export default Account;