import React from "react";

function Name({name, onChange}){
    return(
        <div className="field">
            <label htmlFor="name">Full Name : </label>
            <input type="text" name="name" id="name" placeholder="Enter Your Name" spellCheck='false' value={name} onChange={onChange} autoComplete="off" required/>
        </div>
    )
}

export default Name;