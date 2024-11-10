import React, { useState } from 'react';
import searchIcon from '../images/search-icon.png'
import searchPanelStyle from '../styles/searchPanel.module.css'

//this is the whole search panel on top of the property list page.
function SearchPanel({ onSearch, onSort, searchesFound }) {
    //the parameter is a callback function to pass the searched value to whatever parent component that uses it.
    //the searchesfound parameter is what we use to set the #searches found label,we recieve it from prop list page.


    const handleInputChange = (e) => {//function for passing the search input typed in value to propertiy list page.
        const value = e.target.value;
        onSearch(value);
    };
    const handleSelectChange=(e)=>{//function for passing the selected option to propertiy list page.
        const option = e.target.value
        onSort(option)
    }
    return (
        <div className={searchPanelStyle.searchDiv}>
            <label id='searchResult'><b>#{searchesFound} Searches Found</b></label>
            <div className={searchPanelStyle.search}>
                <img src={searchIcon} alt='search-icon' />
                <input type="text" placeholder="  Search place by name" onChange={handleInputChange}></input>
            </div>
            <select onChange={handleSelectChange}>
                <option value=''>Filter by</option>
                <option value="property_name">name</option>
                <option value="price">price</option>
            </select>
        </div>
    );
}
export default SearchPanel