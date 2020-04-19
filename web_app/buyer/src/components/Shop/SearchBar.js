import React from './node_modules/react';

import './SearchBar.css';

const SearchBar = props => {
    // const searchicon = () => {
    //     return <i class="fas fa-search"></i>
    // }

    return (
    <div className="search-bar">
        <input 
            className="search-bar-input form-control form-control-lg form-control-borderless" 
            onChange={props.handleInput} 
            type="search" 
            placeholder="Search for products" 
        />
    </div>
    )
};

export default SearchBar;