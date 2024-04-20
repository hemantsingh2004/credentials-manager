import React, { useState, useEffect } from "react";

function Username({value, onChange, message}){
    const [usernameError, setUsernameError] = useState("");
    const [placeholderRed, changePlaceholder] = useState('');
    const normalInp = () => {
        changePlaceholder(false)
    }
    useEffect(() => {
      if(message==="Username doesn't obey defined form" || message === "Username taken already"){
        changePlaceholder(message);
      }
    }, [message]);

    const checkUsername = () => {
        const userRegex = /^[a-zA-Z0-9_]+$/;
        if (!userRegex.test(value)) {
      setUsernameError(
        "Username can only contain alphanumeric and underscore'_'"
      );
    } else {
      setUsernameError("");
    }
    };
    return(
        <div className="username-field">
        <div className="field">
            <label htmlFor="uname">Username : </label>
            <input
          type="text"
          value={value}
          onChange={(e) => {
                            // normalInp(); //This effect was discarded later
                            checkUsername();
                            onChange(e);
                        }}
          placeholder={placeholderRed ? placeholderRed : "Enter a username"}
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