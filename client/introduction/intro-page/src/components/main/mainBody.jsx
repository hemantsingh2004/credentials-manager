import React, { useState, useEffect } from 'react';
import Content from './content';
import Buttons from './buttons';
import '../../../public/css/mainBody.css';

function MainBody(){
    return(
        <div className='mainBody'>
            <Content />
            <Buttons />
        </div>
    )
}

export default MainBody;