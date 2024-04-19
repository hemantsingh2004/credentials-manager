import React, { useState } from "react";

function ConfirmPassword({ confirmPassword, onChange }) {
  return (
    <div className="field">
      <label htmlFor="confirm-pass">Confirm Password : </label>
      <input
        type="password"
        onChange={(e) => {onChange(e)}}
        value={confirmPassword}
        spellCheck='false'        
        placeholder="Enter password"
        name="confirm-pass"
        id="confirm-pass"
        required
      />
    </div>
  );
}

export default ConfirmPassword;