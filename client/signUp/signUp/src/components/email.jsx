import React from "react";

function Email(){
    return(
        <div className="field">
            <label htmlFor="mail">Email Id : </label>
            <input type="email" name="mail" id="mail" placeholder="Enter Your Email Id" spellCheck='false' required/>
        </div>
    )
}

export default Email;