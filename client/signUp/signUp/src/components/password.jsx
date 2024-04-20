import React, { useEffect, useState } from "react";

function Password({ password, onChange, message }) {
  const [passwordError, setPasswordError] = useState("");
  const [placeholderRed, changePlaceholder] = useState('');
    const normalInp = () => {
        changePlaceholder(false)
    }
    useEffect(() => {
      if(message === "Passwords don't Match" || message === "Password doesn't obey defined form"){
        changePlaceholder(message);
      }
    }, [message]);
  // Update password error whenever password changes
  const checkPassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long."
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="password-field">
    <div className="field">
      <label htmlFor="pass">Password : </label>
      <input
        type="password"
        value={password}
        onChange={(e) => {
              // normalInp(); //This Effect was discarder later
              checkPassword();
              onChange(e);
        }}
        placeholder={placeholderRed ? placeholderRed : "Enter password"}
        spellCheck='false'
        name="pass"
        id="pass"
        className={placeholderRed ? 'placeholder-red' : ''}
        // className={message === "Passwords don't Match" ? 'placeholder-red' : ''}
        required
      />
    </div>
    {passwordError && <p className="field-error">{passwordError}</p>}
    </div>
  );
}

export default Password;