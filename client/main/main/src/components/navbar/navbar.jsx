import React from 'react';
import Logo from './logo';
import Links from './links';
import '../../../public/css/navbar.css';

function Navbar(){
    return(
        <div className='navbar'>
            <Logo />
            <Links />
        </div>
    )
}

export default Navbar;