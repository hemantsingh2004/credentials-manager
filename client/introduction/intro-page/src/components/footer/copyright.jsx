import React from 'react';

function Copyright(){
    return(
        <div className='copyright'>
            <p>
                Copyrights &copy; {new Date().getFullYear()} <span><a href=''>Hemant Singh</a></span> | All rights preserved!
            </p>
        </div>
    )
}

export default Copyright;