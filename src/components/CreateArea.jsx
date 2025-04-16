import React, { useContext } from 'react'
import '../styles/notes.css'
import { GlobalContext } from '../context'


const CreateArea = (props) => {
  const{note, handleChange, handleSubmit} = useContext(GlobalContext)


  return (
    <div>
        <form className='notes-form' onSubmit={handleSubmit}>
        <input
        name='title'
        placeholder='Title'
        value={note.title}
        onChange={handleChange}
        />
        <textarea
        name='content'
        placeholder='Content'
        rows={'3'}
        value={note.content}
        onChange={handleChange}
        />
        <button type='submit'>+</button>
        </form>
    </div>
  )
}

export default CreateArea