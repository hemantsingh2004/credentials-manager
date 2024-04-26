import React, { useState } from "react";

function CustomSelect({sortUrl, setSelectedOption}) {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Accounts", "Emails"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="sort-option">
      <button className="select-button" onClick={toggleDropdown}>
        Sort <img src={sortUrl} alt="Sort logo" />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;