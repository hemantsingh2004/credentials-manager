import React, { useEffect, useState } from "react";

function Password({ password, onChange, message }) {
  const [passwordError, setPasswordError] = useState("");
  const [placeholderRed, changePlaceholder] = useState("");

  const normalInp = () => {
    //Later, This function wasn't used.
    changePlaceholder(false);
  };
  useEffect(() => {
    if (
      message === "Passwords don't Match" ||
      message === "Password doesn't obey defined form" ||
      message === "Same Username and Password Used"
    ) {
      changePlaceholder(message);
    }
  }, [message]);

  const checkPassword = (password) => {
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const passwordRegex = /^(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long."
      );
    } else {
      setPasswordError("");
    }
  };

  const handlePaste = (value) => {
    checkPassword(value);
    // onChange(value)
  };

  const handleChange = (value) => {
    checkPassword(value);
    onChange(value);
  };

  return (
    <div className="password-field">
      <div className="field">
        <label htmlFor="pass">Password : </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          onPaste={(e) => {
            handlePaste(e.clipboardData.getData("text/plain"));
          }}
          placeholder={placeholderRed ? placeholderRed : "Enter password"}
          autoComplete="off"
          spellCheck="false"
          name="pass"
          id="pass"
          className={placeholderRed ? "placeholder-red" : ""}
          required
        />
      </div>
      {passwordError && <p className="field-error">{passwordError}</p>}
    </div>
  );
}

export default Password;
