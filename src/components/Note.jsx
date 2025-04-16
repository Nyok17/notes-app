import React, { useContext } from 'react';
import '../styles/notes.css';
import { GlobalContext } from '../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Note = ({id, title, content}) => {
  const{deleteNote} = useContext(GlobalContext) 

  
  return (
    
    <div className='grid-item'>
    <div className='note'>
      <h1>{title}</h1>
      <p>{content}</p>
      <button className='deletebtn' onClick={()=> deleteNote(id)}><FontAwesomeIcon icon={faTrash} /></button>
    </div>
    </div>
  )
}

export default Note