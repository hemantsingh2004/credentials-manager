import React from "react";

function FormFields({ formFields, setFormFields, closeUrl }) {

//   const handleChange = (index, key, value) => {
//     const newInputs = [...formFields];
//     newInputs[index][key] = value;
//     setFormFields(newInputs);
//   };

// const handleChange = (index, key, value) => {
//   console.log("handleChange called with index:", index, "key:", key, "value:", value);
//   const newInputs = formFields.map((pair, i) => {
//     if (i === index) {
//       return {
//         ...pair,
//         [key]: value,
//       };
//     }
//     return pair;
//   });
//   setFormFields(newInputs);
// };

const handleChange = (index, key, value) => {
  setFormFields(prevFormFields => {
    return prevFormFields.map((pair, i) => {
      if (i === index) {
        return {
          ...pair,
          [key]: value,
        };
      }
      return pair;
    });
  });
};

const handleRemove = (index) => {
    const newInputs = formFields.filter((pair, i) => i !== index);
    setFormFields(newInputs);
  };

  const PairInput = ({
    label,
    value,
    labelPlaceholder,
    valuePlaceholder,
    index,
  }) => {
    return (
      <>
        <input
          value={label}
          onChange={(e) => handleChange(index, "label", e.target.value)}
          placeholder={labelPlaceholder}
          type="text"
          className="form-field-label-input"
        />
        <input
          value={value}
          onChange={(e) => handleChange(index, "value", e.target.value)}
          placeholder={valuePlaceholder}
          type="text"
          className="form-field-value-input"
        />
        <button onClick={() => handleRemove(index)} className="remove-pair-input"> <img src={closeUrl} alt="Remove Fields" /> </button>
      </>
    );
  };

  return formFields.map((pair, index) => (
    <div className="form-field" key={index}>
      <PairInput
        label={pair.label}
        value={pair.value}
        labelPlaceholder={`Label ${index + 1}`}
        valuePlaceholder={`Value ${index + 1}`}
        index={index}
      />
    </div>
  ));
}

export default FormFields;