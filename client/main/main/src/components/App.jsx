import React, { useState } from 'react'
import Navbar from './navbar/navbar';
import Main from './main/main';
import '../../public/css/styles.css';

function App() {
  return (<div className='container'>
    <Navbar />
    <Main />
  </div>);
}

export default App
