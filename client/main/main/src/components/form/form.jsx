import React, {useState} from "react";
import "../../../public/css/form.css"

function AddAccountForm({formKey, toggleForm}){
    const closeUrl = "../../../public/assets/svg/close_logo.svg";

    const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
    toggleForm();
  };

    const handleClost = () => {
        // Handling closing the form
        toggleForm();
    }

  return (
    <div className="add-account">
        <h3>Add Account Credentials</h3>
      <form key={formKey} onSubmit={handleSubmit}>
        <div className="form-field"></div>
        <div className="buttons">
        <button className="add-button">Add field</button>
        <button type="submit" className="submit-button">Submit</button>
        </div>
        <button className="close-button"><img src={closeUrl} alt="close logo" /></button>
      </form>
    </div>
  );
};

export default AddAccountForm;