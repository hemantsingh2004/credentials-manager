import React, { useState, useEffect } from 'react';
import Copyright from './copyright';
import '../../../public/css/footer.css';

function Footer(){
    return (
        <div className='footer'>
            <Copyright />
        </div>
    )
}

export default Footer;