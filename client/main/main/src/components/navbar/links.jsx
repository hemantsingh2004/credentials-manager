import React, { useState, useEffect } from 'react';

const Links = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchName = async () => {
            try {
                const response = await fetch("/api/user");
                const data = await response.json();
                setUsername(data.username);
            } catch (error) {
                console.log('Error fetching username:', error);
            }
        };

        fetchName();
    }, []);

    return (
        <div className='navbar-links'>
            <ul>
                <li>
                    <a href='https://www.linkedin.com/in/chaudhary-hemant-singh/'>Contact</a>
                </li>
                <li>
                    <a href='https://www.linkedin.com/in/chaudhary-hemant-singh/'>About</a>
                </li>
                <li>
                    <div className="user-logo"><p>{username ? username.slice(0, 1).toUpperCase() : "?"}</p></div>
                </li>
            </ul>
        </div>
    );
};

export default Links;
