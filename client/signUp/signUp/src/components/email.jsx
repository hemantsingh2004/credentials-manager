import React from "react";

function Email({email, onChange}){
    return(
        <div className="field">
            <label htmlFor="mail">Email Id : </label>
            <input type="email" name="mail" id="mail" placeholder="Enter Your Email Id" spellCheck='false' value={email} onChange={onChange} required/>
        </div>
    )
}

export default Email;