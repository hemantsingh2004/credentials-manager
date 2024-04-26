import React from "react";

function Email({ email, setEmail, handleKeyDown }) {
  return (
    <div className="form-field">
      <label htmlFor="email-used">Email Used</label>
      <input
        type="email"
        name="email-used"
        id="email-used"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-field-input"
        placeholder="Enter Email Used"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Email;
