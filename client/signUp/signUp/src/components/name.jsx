import React from "react";

function Name(){
    return(
        <div className="field">
            <label htmlFor="name">Full Name : </label>
            <input type="text" name="name" id="name" placeholder="Enter Your Name" spellCheck='false' required/>
        </div>
    )
}

export default Name;