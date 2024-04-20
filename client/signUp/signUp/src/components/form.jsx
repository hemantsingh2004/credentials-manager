import React, { useState } from "react";
import Name from "./name";
import Email from "./email";
import Username from "./username";
import Password from "./password";
import ConfirmPassword from "./confirmPassword";
import WarningPopup from "./warning";
import Message from "./messages";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(() => newName);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(() => newEmail);
  };

  const handleUsernameChange = (value) => {
    const newUsername = value;
    setUsername(() => newUsername);
  };

  const handlePasswordChange = (value) => {
    const newPassword = value;
    setPassword(() => newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPassword(() => newPassword);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const passwordRegex = /^(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if(username !== password){
    if (usernameRegex.test(username)) {
      if (passwordRegex.test(password)) {
        if (confirmPassword === password) {
          const response = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              name: name,
              username: username,
              password: password,
              email: email,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setMessage("Registration successful!");
          } else {
            setMessage(data.error); // Assuming server sends an error message
            setUsername("");
          }
        } else {
          setMessage("Passwords don't Match");
          setPassword("");
          setConfirmPassword("");
        }
      } else {
        setMessage("Password doesn't obey defined form");
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      setMessage("Username doesn't obey defined form");
      setUsername("");
    }
  }else{
    setMessage("Same Username and Password Used");
    setConfirmPassword('');
    setPassword('');
    setUsername('');
  }
  };

  const isButtonDisabled =
    !username || !password || !confirmPassword || !email || !name;

  return (
    <div className="form">
      <form onSubmit={handleFormSubmit}>
        <Name name={name} onChange={handleNameChange} />
        <Email email={email} onChange={handleEmailChange} />
        <Username
          value={username}
          onChange={handleUsernameChange}
          message={message}
        />
        <Password
          password={password}
          onChange={handlePasswordChange}
          message={message}
        />
        <ConfirmPassword
          confirmPassword={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button
          type="submit"
          disabled={isButtonDisabled}
          className={isButtonDisabled ? "disabled" : "enabled"}
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
