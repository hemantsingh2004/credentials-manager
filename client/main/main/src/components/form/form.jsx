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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAccount = {
      accountName: accountName,
      signUpType: signUpType,
      email: email,
    };
    if(signUpType === "email"){
      newAccount.password = password;
    } else if(signUpType === "third-party"){
      newAccount.thirdParty = thirdParty;
    }
    formFields.forEach(obj => {
      newAccount[`otherDetail-${obj.label}`] = obj.value;
    })
    console.log(newAccount);
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
  }

  return (
    <div className="add-account">
      <h3>Add Account Credentials</h3>
      <form key={formKey} onSubmit={handleSubmit}>
        <AccountName accountName={accountName} setAccountName={setAccountName} />
        <SignUpType setSignUpType={setSignUpType} thirdPary={thirdParty} setThirdParty={setThirdParty} isThirdParty={isThirdParty} setIsThirdParty={setIsThirdParty} signUpType={signUpType} password={password} setPassword={setPassword} isPassword={isPassword} setIsPassword={setIsPassword}/>
        <Email email={email} setEmail={setEmail} />
        <FormFields formFields={formFields} setFormFields={setFormFields} closeUrl={closeUrl} addUrl={addUrl}/>
        <Buttons/>
        <button className="close-button" onClick={handleClose} type="button"><img src={closeUrl} alt="close logo" /></button>
      </form>
      <p>*Don't forget to add the fields before submitting</p>
    </div>
  );
};

export default AddAccountForm;