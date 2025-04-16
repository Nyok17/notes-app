// components/Grid.jsx
import React from 'react';
import '../styles/notes.css'

const Grid = ({ children, variant, columns }) => {
  return (
    <div className={`grid-container ${variant || ''}`}>
      {children}
    </div>
  );
};

export default Grid;


//pip freeze > requirements.txt
