import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredResults = favorites.filter((item) => {
      const itemName = item.title.toLowerCase();
      const query = searchQuery.toLowerCase();
      return itemName.includes(query);
    });

    setSearchResults(filteredResults);
  };

  const clearSearchResults = () => {
    setSearchResults([]);
    setSearchQuery("");
  };

  return (
    <header
      className="max-w-7xl mx-auto sm:m-4 mt-8 mb-10 justify-between flex items-center rounded-lg"
      style={{ backgroundColor: "#f7f7f2" }}
    >
      <div className="logo">
        <Link to="/home">
          <img src="./src/images/logo.png" alt="logo" className="logo" />
        </Link>
      </div>
      <div>
        <Link to="/favorites">
          <button
            className="favorites-btn px-2 py-1 text-m border rounded-md"
            style={{ backgroundColor: "#f7f7f2" }}
          >
            Favorites ({favorites.length})
          </button>
        </Link>
      </div>
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className="search-btn" type="submit">
          Search
        </button>
        {searchResults.length > 0 && (
          <button className="clear-search-btn" onClick={clearSearchResults}>
            Clear Search
          </button>
        )}
      </form>
      {searchResults.length > 0 && (
        <div className="search-results">
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result.title}</li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
