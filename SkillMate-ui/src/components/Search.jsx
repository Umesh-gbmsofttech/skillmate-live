import React, { useState } from 'react';
import './Search.css';
import searchLOGO from '../assets/search.png';

function Search({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value); // Pass the search query to the parent component
    };

    return (
        <div className="search__bar-container">
            <input
                type="text"
                placeholder="Type to search ..."
                className="search__bar"
                value={query}
                onChange={handleChange}
            />
            <button className="search__button">
                <img src={searchLOGO} alt="search" />
            </button>
        </div>
    );
}

export default Search;