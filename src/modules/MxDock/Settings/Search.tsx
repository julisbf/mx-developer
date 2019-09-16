import React from 'react';

/**
 * Search modal will open
 * when any DOM element with the id `mendix-header-search-button` is clicked
 */

const Search = () => (
    <button
        className="MxDock__search hidden"
        id="mendix-header-search-button"
        type="button"
    >
        Search
    </button>
);

export default Search;
