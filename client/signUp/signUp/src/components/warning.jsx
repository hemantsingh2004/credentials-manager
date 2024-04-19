import React, {useEffect, useState} from "react";

function WarningPopup(){
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

    const handleClosePopup = () => {
    setShowPopup(false);
  };

    return(
        <div className={showPopup ? "popup" : "popup hidden"}>
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <p>Once the user is registered, Password cannot be changed later. Please remember it.</p>
          </div>
        </div>
    )
}

export default WarningPopup;