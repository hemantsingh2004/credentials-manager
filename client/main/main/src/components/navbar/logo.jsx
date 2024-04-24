import React from 'react';

function Logo(){
    const imgSrc = '../../../public/assets/svg/account_credentials_logo.svg';

    return(
        <div className='navbar-logo'>
            <div className='logo'>
                <img src={imgSrc} alt='account credential logo' />
                <h1>CREDENTIALS MANAGER</h1>
            </div>
        </div>
    )
}

export default Logo