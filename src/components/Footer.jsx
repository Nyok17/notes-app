import React, { useContext } from 'react'
import '../styles/notes.css'
import { GlobalContext } from '../context'

const Footer = () => {
  const{currentYear} = useContext(GlobalContext)

  return (
    <div className='footer'>
      <p>Copyright © {currentYear} </p>
    </div>
  )
}

export default Footer