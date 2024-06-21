import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "../Components/carousel";

function HomePage() {
  const [previews, setPreviews] = useState([]);
  const [filterOption, setFilterOption] = useState("none");
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPreviews(data);
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

  const sortPreviews = (previews) => {
    switch (filterOption) {
      case "titleAsc":
        return [...previews].sort((a, b) => a.title.localeCompare(b.title));
      case "titleDesc":
        return [...previews].sort((a, b) => b.title.localeCompare(a.title));
      case "dateAsc":
        return [...previews].sort(
          (a, b) => new Date(a.updated) - new Date(b.updated)
        );
      case "dateDesc":
        return [...previews].sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );
      default:
        return previews;
    }
  };

  const filterPreviewsByGenre = (previews) => {
    if (selectedGenre === "all") {
      return previews;
    }
    return previews.filter((preview) =>
      preview.genres.includes(parseInt(selectedGenre))
    );
  };

  const sortedAndFilteredPreviews = filterPreviewsByGenre(
    sortPreviews(previews)
  );

  return (
    <main className="max-w-7xl mx-auto sm:m-4">
      <Carousel />
      <div className="max-w-7xl mx-auto mt-20 flex m-6">
        <div>
          <label htmlFor="filterOption" className="mr-2 text-m font-semibold">
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
        <div>
          <label
            htmlFor="genreFilter"
            className="genre mr-2 text-m font-semibold"
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
      </div>
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 rounded-lg"
        style={{ backgroundColor: "#f7f7f2" }}
      >
        {sortedAndFilteredPreviews.map((preview) => (
          <div key={preview.id} className="">
            <div className="m-4 p-4 shadow-2xl rounded-lg">
              <Link to={`${preview.id}`}>
                {" "}
                <div className="image-container">
                  <img
                    className="image"
                    src={preview.image}
                    alt={preview.title}
                  />
                  <div className="overlay">
                    <button></button>
                  </div>
                </div>{" "}
              </Link>
              <h3 className="font-semibold mt-4 text-lg">{preview.title}</h3>
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
    </main>
  );
}

export default HomePage;
