import React from "react";

function Message({message}){
    return(
        <div className="message">
            <ul>
                <li>Once set, Password can't be changed later.</li>
                <li>Users can not change their credentials in the future.</li>
                {message && <li>{message}</li>}
            </ul>
        </div>
    )
}

export default Message;