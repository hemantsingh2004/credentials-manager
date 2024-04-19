import React, { useState } from "react";
import Name from "./name";
import Email from "./email";
import Username from "./username";
import Password from "./password";
import ConfirmPassword from "./confirmPassword";
import WarningPopup from "./warning";
import Message from "./messages";

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(() => newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPassword(() => newPassword);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(confirmPassword, password);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (passwordRegex.test(password)){
    if (confirmPassword === password) { 
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
      } else {
        setMessage(data.message); // Assuming server sends an error message
        setUsername("");
      }
    } else {
      setMessage("Passwords don't Match");
      setPassword("");
    }
  }else{
    setMessage("Password doesn't obey defined form");
    setPassword('');
  }
  };
  return (
    <div className="form">
      <form onSubmit={handleFormSubmit}>
        <Name />
        <Email />
        <Username
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          message={message}
        />
        <Password password={password} onChange={handlePasswordChange} message={message}/>
        <ConfirmPassword
          confirmPassword={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button
          type="submit"
          // className={}
        >
          Register
        </button>
        <br />
        <Message message={message} />
      </form>
      <WarningPopup />
    </div>
  );
}

export default Form;
