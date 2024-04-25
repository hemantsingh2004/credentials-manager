import React, { useState } from "react";

function FormFields({ formFields, setFormFields, closeUrl, addUrl }) {
  const [newPair, setNewPair] = useState({ label: "", value: "" });

  const handleChange = (index, key, value) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index] = {
      ...updatedFormFields[index],
      [key]: value
    };
    setFormFields(updatedFormFields);
  };

  const handleAddField = () => {
    if (newPair.label !== "" && newPair.value !== "") {
      setFormFields(prevFormFields => [...prevFormFields, newPair]);
      setNewPair({ label: "", value: "" });
    } else {
      alert("Please fill in both the label and value fields.");
    }
  };

  const handleRemove = (index) => {
    const newInputs = formFields.filter((pair, i) => i !== index);
    setFormFields(newInputs);
  };

  return (
    <>
      {formFields.map((pair, index) => (
        <div className="form-field" key={index}>
          <input
            value={pair.label}
            onChange={(e) => handleChange(index, "label", e.target.value)}
            placeholder={`Label ${index + 1}`}
            type="text"
            className="form-field-label-input"
            disabled={true}
          />
          <input
            value={pair.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
            placeholder={`Value ${index + 1}`}
            type="text"
            className="form-field-value-input"
            disabled={true}
          />
          <button onClick={() => handleRemove(index)} className="remove-pair-input" type="button">
            <img src={closeUrl} alt="Remove Fields" />
          </button>
        </div>
      ))}
      <div className="form-field">
        <input
          value={newPair.label}
          onChange={(e) => setNewPair({ ...newPair, label: e.target.value })}
          placeholder="New Label"
          type="text"
          className="form-field-label-input"
        />
        <input
          value={newPair.value}
          onChange={(e) => setNewPair({ ...newPair, value: e.target.value })}
          placeholder="New Value"
          type="text"
          className="form-field-value-input"
        />
        <button onClick={handleAddField} className="add-pair-input" type="button">
          <img src={addUrl} alt="Add Field Pairs" />
        </button>
      </div>
    </>
  );
}

export default FormFields;
