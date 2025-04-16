import React, { useContext, useEffect } from 'react';
import CreateArea from '../components/CreateArea';
import Note from '../components/Note';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GlobalContext } from '../context';
import Grid from '../components/Grid';


const Dashboard = () => {
  const{userData, token, notes, deleteNote, fetchNotes } = useContext(GlobalContext)

  useEffect(()=>{
    if(userData?.id || token){
      fetchNotes()
    }

}, [userData, token,fetchNotes])

  
  return (
    <div>
      <Header />
      <CreateArea />
      <Grid>
      {
        notes.map((noteItem, index) => (
          <Note 
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          deleteNote={deleteNote}
          />
        ))
      }
      </Grid>

      <Footer />
    </div>
  )
}

export default Dashboard