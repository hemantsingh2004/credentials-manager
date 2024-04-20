import React, { useState } from "react";
import Username from "./username";
import Password from "./password";
import Register from "./register";

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUsernameChange = (value) => {
    const newUsername = value;
    setUsername(() => newUsername);
  };

  const handlePasswordChange = (value) => {
    const newPassword = value;
    setPassword(() => newPassword);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const passwordRegex = /^(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (usernameRegex.test(username)) {
      if (passwordRegex.test(password)) {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              username: username,
              password: password,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setMessage("Login successful!");
          } else {
            setMessage(data.message); // Assuming server sends an error message
            setUsername("");
          }
        } else {
        setMessage("Password doesn't obey defined form");
        setPassword("");
      }
    } else {
      setMessage("Username doesn't obey defined form");
      setUsername("");
    }
  };

  const isButtonDisabled = !username || !password;

  return (
    <div className="form">
      <form onSubmit={handleFormSubmit}>
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
        <button
          type="submit"
          disabled={isButtonDisabled}
          className={isButtonDisabled ? "disabled" : "enabled"}
        >
          Login
        </button>
      </form>
      <Register />
    </div>
  );
}

export default Form;