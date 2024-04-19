import React, { useState, useEffect } from 'react';
import MainBody from './main/mainBody.jsx';
import Navbar from './navbar/navbar.jsx';
import Footer from './footer/footer.jsx';
import '../../public/css/styles.css';

function App() {
  return(
    <div className='container'>
      <Navbar />
      <MainBody />
      <Footer />
    </div>
  )
}

export default App;