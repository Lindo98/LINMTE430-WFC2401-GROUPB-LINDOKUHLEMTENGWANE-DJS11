import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * A function to handle the submission of a search query.
 *
 * @param {Event} e - The event object triggering the function.
 * @return {void} No return value.
 */

const Header = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  /**
   * Updates the search query and clears the search results if the query is empty.
   *
   * @param {Event} e - The input change event.
   * @return {void}
   */

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setSearchResults([]);
    }
  };

  /**
   * Handles the submission of a search query by filtering the favorites based on the search query.
   *
   * @param {Event} e - The event object triggering the function.
   * @return {void} Sets the search results state to the filtered favorites.
   */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredResults = favorites.filter((item) => {
      const itemName = item.title.toLowerCase();
      const query = searchQuery.toLowerCase();
      return itemName.includes(query);
    });

    setSearchResults(filteredResults);
  };

  /**
   * Clears the search results and resets the search query.
   *
   * @return {void} No return value.
   */
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
      <Link to="/">
        <button className="logout-btn ">Log Out</button>
      </Link>
    </header>
  );
};

export default Header;
