import React from "react";

function AccountName({ AccountName, setAccountName }) {
  return (
    <div className="form-field">
      <label htmlFor="account">Account Name</label>
      <input
        type="text"
        name="account"
        id="account"
        value={AccountName}
        onChange={(e) => setAccountName(e.target.value)}
        className="form-field-input"
        placeholder="Enter New Account"
        required
      />
    </div>
  );
}

export default AccountName;
