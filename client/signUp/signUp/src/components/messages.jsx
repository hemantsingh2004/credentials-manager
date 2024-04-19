import React from "react";

function Message({message}){
    return(
        <div className="message">
            <ul>
                <li>Once set, Password can't be changed later.</li>
                {message && <li>{message}</li>}
            </ul>
        </div>
    )
}

export default Message;