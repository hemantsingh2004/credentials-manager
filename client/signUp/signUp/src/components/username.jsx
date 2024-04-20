import React, { useState, useEffect } from "react";

function Username({value, onChange, message}){
    const [usernameError, setUsernameError] = useState("");
    const [placeholderRed, changePlaceholder] = useState('');
    const normalInp = () => {
        changePlaceholder(false)
    }
    useEffect(() => {
      if(message==="Username doesn't obey defined form" || message === "Username taken already" || message === "Same Username and Password Used"){
        changePlaceholder(message);
      }
    }, [message]);

    const checkUsername = (value) => {
        const userRegex = /^[a-zA-Z0-9_]+$/;
        if (!userRegex.test(value)) {
      setUsernameError(
        "Username can only contain alphanumeric and underscore'_'"
      );
    } else {
      setUsernameError("");
    }
    };

    const handlePaste = (inpValue) => {
    checkUsername(inpValue);
    // onChange(value)
  };

  const handleChange = (inpValue) => {
    checkUsername(inpValue);
    onChange(inpValue);
  };

    return(
        <div className="username-field">
        <div className="field">
            <label htmlFor="uname">Username : </label>
            <input
          type="text"
          value={value}
          onChange={(e) => {handleChange(e.target.value);}}
          onPaste={(e) => {handlePaste(e.clipboardData.getData("text/plane"));}}
          placeholder={placeholderRed ? placeholderRed : "Enter a username"}
          autoComplete="off"
          name = "uname"
          id = "uname"
          spellCheck='false'
          className={placeholderRed ? 'placeholder-red' : ''}
          required
        />
        </div>
        {usernameError && <p className="field-error">{usernameError}</p>}
        </div>
    )
}

export default Username;