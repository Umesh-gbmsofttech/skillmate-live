import React, { useState } from 'react';
import './Search.css';
import searchLOGO from '../assets/search.png';

function Search() {
    const [query, setQuery] = useState('');

    const handleSearchMenuClick = () => {
        console.log('Hi User')
    };
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        console.log('Searching for:', query);
        // Add your search functionality here
    };

    return (
        <div className="search__bar-container">
            <button
                onClick={handleSearchMenuClick}
                className='search__bar-container-menu_icon'>
                ☰
            </button>
            <input
                type="text"
                placeholder="Type to search ..."
                className="search__bar"
                value={query}
                onChange={handleChange}
            />
            <button className="search__button" onClick={handleSearch}>
                <img src={searchLOGO} alt="search" />
            </button>
        </div>
    );
}

export default Search;
