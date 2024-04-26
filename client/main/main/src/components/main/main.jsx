import React, {useEffect, useState} from 'react';
import "../../../public/css/main.css";
import AddAccountForm from '../form/form';
import ShowCredentials from './showCredentials';
import CustomSelect from './sortButton';
import SearchBar from './searchBar';

function Main(){
    const addUrl = "../../../public/assets/svg/add_logo.svg";
    const sortUrl = "../../../public/assets/svg/sort_logo.svg";

    const [searchValue, setSearchValue] = useState("");
    const [selectedOption, setSelectedOption] = useState("Accounts");
    const [formKey, setFormKey] = useState(0); // Key to force re-mounting of the form
    const [formHidden, setFormHidden] = useState(true);
    const [credentials, setCredentials] = useState([]);
    const toggleForm = () => {
    setFormHidden(!formHidden);
    setFormKey((prevKey) => prevKey + 1); // Increment key to remount the form
  };

  useEffect(() => {
    const fetchData = async() => {
    const rawHeaderOptions = {keywords : searchValue,};
    const options = JSON.stringify(rawHeaderOptions);
    const getCredentials = await fetch("/api/getCredentials", {method: "POST", headers: {"Content-Type": "application/json", options}});
    const data = await getCredentials.json();
    setCredentials(data.result);
    }

    fetchData();
  }, [searchValue, formHidden])

    return(
        <div className="main">
            <div className="add-account-form" hidden={formHidden}><AddAccountForm formKey={formKey} toggleForm={toggleForm}/></div>
            <div className="option-bar">
                <div className="add">
                    <button onClick={toggleForm}>Add <img src={addUrl} alt="Add logo" /></button>
                </div>
                <div className="options">
                    <CustomSelect sortUrl={sortUrl} setSelectedOption={setSelectedOption} />
                    <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
                </div>
            </div>
            <ShowCredentials selectedOption={selectedOption} credentials={credentials}/>
        </div>
    )
}

export default Main;