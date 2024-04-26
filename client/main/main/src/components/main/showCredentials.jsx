import React, { useState, useEffect } from "react";

function ShowCredentials({ selectedOption, credentials }) {
  const [expandedCredentialIndices, setExpandedCredentialIndices] = useState([]);

  const toggleCredential = (index) => {
    if (expandedCredentialIndices.includes(index)) {
      // If already expanded, collapse it
      setExpandedCredentialIndices(expandedCredentialIndices.filter(i => i !== index));
    } else {
      // If not expanded, expand it
      setExpandedCredentialIndices([...expandedCredentialIndices, index]);
    }
  };

  credentials.sort((a, b) => {
    let nameA = a.accountName.toLowerCase();
    let nameB = b.accountName.toLowerCase();
    if (selectedOption === "Emails") {
      nameA = a.email ? a.email.toLowerCase() : '';
      nameB = b.email ? b.email.toLowerCase() : '' ;
    }
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  
  return (
    <div className="show-credentials">
      {credentials.map((credential, index) => (
        <div className="fullcredentials" key={index}>
          <div className="credentials" onClick={() => toggleCredential(index)}>
            <div className="credential-account-name">
              <h4>{credential.accountName}</h4>
            </div>
            <div className="credential-sign-up">
              <p>
                {credential.signUpType !== "none" && credential.signUpType} 
                {credential.email && credential.signUpType && <span> &bull; </span>}
                {credential.email}
              </p>    
            </div>
          </div>
          {expandedCredentialIndices.includes(index) && (
            <div className="expanded-details">
              <ul>
                {/* Render parameters from the 'others' object */}
                {Object.entries(credential.others).map(([key, value], paramIndex) => (
                  <li key={`${index}-${paramIndex}`}>
                    {key && value 
                    ? <p><strong>{key === "password" || key === "Third Party" ? key : key.slice(12,)} : </strong>{value}</p>
                : <p><strong>{key === "password" || key === "Third Party" ? key : key.slice(12,)}</strong></p>
                    }
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ShowCredentials;