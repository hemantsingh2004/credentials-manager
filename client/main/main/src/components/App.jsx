import React, { useEffect, useState } from 'react'
import Navbar from './navbar/navbar';
import Main from './main/main';
import '../../public/css/styles.css';
import NoUser from './noUser/noUser';

function App() {
  const [isUser, setUser] = useState(false);

  useEffect(() => {
    const checkUserStatus = async() => {
      const response = await fetch("/api/user");
      if(response.status === 200){
        setUser(true);
      }else{
        setUser(false);
      }
    }
// Initially check user status
    checkUserStatus();

    // Periodically check user status every minute
    const intervalId = setInterval(checkUserStatus, 60000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []
)

  return (
  <div className='container'>
    {isUser && <Navbar />}
    {isUser && <Main />}
    {!isUser && <NoUser />}
  </div>);
}

export default App
