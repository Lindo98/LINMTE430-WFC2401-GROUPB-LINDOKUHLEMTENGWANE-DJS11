import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Carousel from "../Components/carousel";

/**
 * Renders the HomePage component.
 *
 * @return {JSX.Element} The rendered HomePage component.
 */
function HomePage() {
  const [previews, setPreviews] = useState([]);
  const [filterOption, setFilterOption] = useState("none");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPreviews(data);
        setIsLoading(false); // Set loading state to false when data is fetched
      });
  }, []);

  const genreMapping = {
    1: "Personal Growth",
    2: "Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  const sortPreviews = useMemo(() => {
    return (previewsToSort) => {
      switch (filterOption) {
        case "titleAsc":
          return [...previewsToSort].sort((a, b) =>
            a.title.localeCompare(b.title)
          );
        case "titleDesc":
          return [...previewsToSort].sort((a, b) =>
            b.title.localeCompare(a.title)
          );
        case "dateAsc":
          return [...previewsToSort].sort(
            (a, b) => new Date(a.updated) - new Date(b.updated)
          );
        case "dateDesc":
          return [...previewsToSort].sort(
            (a, b) => new Date(b.updated) - new Date(a.updated)
          );
        default:
          return previewsToSort;
      }
    };
  }, [filterOption]);

  const filterPreviewsByGenre = useMemo(() => {
    return (previewsToFilter) => {
      if (selectedGenre === "all") {
        return previewsToFilter;
      }
      return previewsToFilter.filter((preview) =>
        preview.genres.includes(parseInt(selectedGenre))
      );
    };
  }, [selectedGenre]);

  const sortedAndFilteredPreviews = useMemo(() => {
    return filterPreviewsByGenre(sortPreviews(previews));
  }, [filterPreviewsByGenre, sortPreviews, previews]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setSearchResults([]);
    }
  };

  /**
   * Handles the submission of a search query by filtering the previews based on the search query.
   *
   * @param {Event} e - The event object triggering the function.
   * @return {void} Sets the search results state to the filtered previews.
   */

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredResults = previews.filter((item) => {
      const itemTitle = item.title.toLowerCase();
      const query = searchQuery.toLowerCase();
      return itemTitle.includes(query);
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

  const displayPreviews =
    searchResults.length > 0 ? searchResults : sortedAndFilteredPreviews;

  return (
    <main className="max-w-7xl mx-auto sm:m-4">
      {isLoading ? (
        <div className="loader  text-5xl font-bold mt-60 text-center">
          Loading...
        </div>
      ) : (
        <>
          <Carousel />
          <div className="max-w-7xl mx-auto mt-20 flex flex-wrap m-6">
            <div className="mr-4 mb-4">
              <label
                htmlFor="filterOption"
                className="mr-2 text-m font-semibold"
              >
                Filter:
              </label>
              <select
                id="filterOption"
                className="px-2 py-1 text-m border border-gray-300 rounded-md focus:outline-none"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
              >
                <option value="none">None</option>
                <option value="titleAsc">Title A-Z</option>
                <option value="titleDesc">Title Z-A</option>
                <option value="dateAsc">Oldest First</option>
                <option value="dateDesc">Newest First</option>
              </select>
            </div>
            <div className="mr-4 mb-4">
              <label
                htmlFor="genreFilter"
                className="mr-2 text-m font-semibold"
              >
                Genre:
              </label>
              <select
                id="genreFilter"
                className="px-2 py-1 text-m border rounded-md focus:outline-none"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="all">All</option>
                {Object.entries(genreMapping).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <form
                className="search-bar flex items-center"
                onSubmit={handleSearchSubmit}
              >
                <input
                  className="search-input px-2 text-m border rounded-md focus:outline-none mr-2"
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                {searchResults.length > 0 && (
                  <button
                    className="clear-search-btn px-4 py-1 bg-red-500 text-white rounded-md ml-2"
                    onClick={clearSearchResults}
                  >
                    Clear
                  </button>
                )}
              </form>
            </div>
          </div>
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 rounded-lg"
            style={{ backgroundColor: "#f7f7f2" }}
          >
            {displayPreviews.map((preview) => (
              <div key={preview.id} className="">
                <div className="m-4 p-4 shadow-2xl rounded-lg">
                  <Link to={`${preview.id}`}>
                    <div className="image-container">
                      <img
                        className="image"
                        src={preview.image}
                        alt={preview.title}
                      />
                      <div className="overlay">
                        <button></button>
                      </div>
                    </div>
                  </Link>
                  <h3 className="font-semibold mt-4 text-lg">
                    {preview.title}
                  </h3>
                  <p className="text-sm pt-1">
                    Genres:{" "}
                    {preview.genres
                      .map((genreId) => genreMapping[genreId])
                      .join(", ")}
                  </p>
                  <p className="text-sm pt-1">
                    Updated: {new Date(preview.updated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default HomePage;
