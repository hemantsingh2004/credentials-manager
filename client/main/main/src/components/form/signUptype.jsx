import React, { useEffect } from "react";

function SignUpType({
  signUpType,
  setSignUpType,
  isThirdParty,
  setIsThirdParty,
  setThirdParty,
  thirdPary,
  password,
  setPassword,
  isPassword,
  setIsPassword,
  handleKeyDown,
}) {
  const handleOnChange = (value) => {
    setSignUpType(value);
  };

  useEffect(() => {
    if (signUpType === "third-party") {
      setIsThirdParty(true);
      setIsPassword(false);
    } else if (signUpType === "email") {
      setIsThirdParty(false);
      setIsPassword(true);
    } else {
      setIsPassword(false);
      setIsThirdParty(false);
    }
  });

  return (
    <div className="signUpType">
      <div className="form-field">
        <label htmlFor="signup-type">SignUp type</label>
        <select
          name="signup-type"
          id="signup-type"
          onChange={(e) => handleOnChange(e.target.value)}
          className="form-field-input"
          required
        >
          <option value="google">Google</option>
          <option value="email">Email</option>
          <option value="third-party">Third party</option>
          <option value="none">None</option>
        </select>
      </div>
      <input
        type="text"
        name="third-party"
        id="third-party"
        hidden={!isThirdParty}
        value={thirdPary}
        onChange={(e) => setThirdParty(e.target.value)}
        placeholder="Enter Third Party Name"
        onKeyDown={handleKeyDown}
        required={isThirdParty}
      />

      <input
        type="text"
        name="third-party"
        id="third-party"
        hidden={!isPassword}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter The Password Used"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SignUpType;
