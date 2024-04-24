import React, {useState} from 'react';
import "../../../public/css/main.css";
import AddAccountForm from '../form/form';

function Main(){
    const addUrl = "../../../public/assets/svg/add_logo.svg";
    const sortUrl = "../../../public/assets/svg/sort_logo.svg";

    const [formKey, setFormKey] = useState(0); // Key to force re-mounting of the form
    const [formHidden, setFormHidden] = useState(true);
    const toggleForm = () => {
    setFormHidden(!formHidden);
    setFormKey((prevKey) => prevKey + 1); // Increment key to remount the form
  };

    return(
        <div className="main">
            <div className="add-account-form" hidden={formHidden}><AddAccountForm formKey={formKey} toggleForm={toggleForm}/></div>
            <div className="option-bar">
                <div className="add">
                    <button onClick={toggleForm}>Add <img src={addUrl} alt="Add logo" /></button>
                </div>
                <div className="options">
                    <div className="sort-option">
                        <button>Sort <img src={sortUrl} alt="Sort logo" /></button>
                    </div>
                    <div className="search-bar">
                        <input type="text" name="searchBar" id="searchBar"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;