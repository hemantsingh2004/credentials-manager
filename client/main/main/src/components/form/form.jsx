import React, { useEffect, useState } from "react";
import AccountName from "./accountName";
import SignUpType from "./signUptype";
import Email from "./email";
import Buttons from "./buttons";
import FormFields from "./formField";
import "../../../public/css/form.css";

function AddAccountForm({ formKey, toggleForm }) {
  const closeUrl = "../../../public/assets/svg/close_logo.svg";
  const addUrl = "../../../public/assets/svg/add_logo.svg";

  const [accountName, setAccountName] = useState("");
  const [signUpType, setSignUpType] = useState("");
  const [isThirdParty, setIsThirdParty] = useState(false);
  const [thirdParty, setThirdParty] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [formFields, setFormFields] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAccount = {
      accountName: accountName,
      signUpType: signUpType,
      email: email,
    };
    if (signUpType === "email") {
      newAccount.password = password;
    } else if (signUpType === "third-party") {
      newAccount.thirdParty = thirdParty;
    }
    formFields.forEach((obj) => {
      newAccount[`otherDetail-${obj.label}`] = obj.value;
    });
    const credentials = JSON.stringify(newAccount);
    const result = await fetch("/api/addCredential", {
      method: "POST",
      headers: { "Content-Type": "application/json", credentials },
    });

    const data = await result.json();
    console.log(data.result);
    handleClose();
  };

  const handleClose = () => {
    setAccountName("");
    setSignUpType("");
    setIsThirdParty(false);
    setThirdParty("");
    setEmail("");
    setFormFields([]);
    toggleForm();
  };

  return (
    <div className="add-account">
      <h3>Add Account Credentials</h3>
      <form key={formKey} onSubmit={handleSubmit}>
        <AccountName
          accountName={accountName}
          setAccountName={setAccountName}
          handleKeyDown={handleKeyPress}
        />
        <SignUpType
          setSignUpType={setSignUpType}
          thirdPary={thirdParty}
          setThirdParty={setThirdParty}
          isThirdParty={isThirdParty}
          setIsThirdParty={setIsThirdParty}
          signUpType={signUpType}
          password={password}
          setPassword={setPassword}
          isPassword={isPassword}
          setIsPassword={setIsPassword}
          handleKeyDown={handleKeyPress}
        />
        <Email email={email} setEmail={setEmail} handleKeyDown={handleKeyPress} />
        <FormFields
          formFields={formFields}
          setFormFields={setFormFields}
          closeUrl={closeUrl}
          addUrl={addUrl}
          handleKeyDown={handleKeyPress}
        />
        <Buttons />
        <button className="close-button" onClick={handleClose} type="button">
          <img src={closeUrl} alt="close logo" />
        </button>
      </form>
      <p>*Don't forget to add the fields before submitting</p>
      <p className="newValueInfo">*New Value Fields can be omitted in case of no need of them</p>
    </div>
  );
}

export default AddAccountForm;
