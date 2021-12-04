import React from 'react'
import "./searchBar.css"

function SearchBar() {
    return (
        <div>
            <form className="search-box">
                <input type="text" placeholder=" " />
                <button type="reset">  </button>
            </form>
        </div>
    )
}

export default SearchBar
