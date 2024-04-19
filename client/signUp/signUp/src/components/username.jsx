import React, { useState } from "react";

function Username({value, onChange, message}){
    const [placeholderRed, changePlaceholder] = useState(message==="Username taken already"?true:false);
    const normalInp = () => {
        changePlaceholder(false)
    }
    return(
        <div className="field">
            <label htmlFor="uname">Username : </label>
            <input
          type="text"
          value={value}
          onChange={(e) => {normalInp();
                            onChange(e);}
            }
          placeholder={placeholderRed ? "Username already taken" : "Enter a username"}
          name = "uname"
          id = "uname"
          spellCheck='false'
          className={placeholderRed ? 'placeholder-red' : ''}
          required
        />
        </div>
    )
}

export default Username;