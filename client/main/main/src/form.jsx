import React, { useState } from 'react';

const FormComponent = () => {
  const [formKey, setFormKey] = useState(0); // Key to force re-mounting of the form

  const toggleForm = () => {
    setFormKey((prevKey) => prevKey + 1); // Increment key to remount the form
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <div>
      <button onClick={toggleForm}>Toggle Form</button>
      <Form key={formKey} onSubmit={handleSubmit} />
    </div>
  );
};

const Form = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
