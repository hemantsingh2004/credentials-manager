import React from "react";

function SearchBar({searchValue, setSearchValue}) {
    return(<div className="search-bar">
        <input type="text" name="searchBar" id="searchBar" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="By Account Name"/>
    </div>)
}

export default SearchBar;