import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  const [favorites, setFavorites] = useState({});
  const [sortBy, setSortBy] = useState("recentlyAdded");

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || {};
      setFavorites(storedFavorites);
      console.log("Loaded favorites:", storedFavorites);
    } catch (error) {
      console.error("Failed to parse favorites from localStorage:", error);
      setFavorites({});
    }
  };

  const removeFavorite = (episodeId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      delete updatedFavorites[episodeId];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      console.log("Updated favorites after removal:", updatedFavorites);
      return updatedFavorites;
    });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedFavorites = Object.values(favorites).sort((a, b) => {
    switch (sortBy) {
      case "aToZ":
        return a.title.localeCompare(b.title);
      case "zToA":
        return b.title.localeCompare(a.title);
      case "recentlyAdded":
        return b.dateAdded - a.dateAdded;
      default:
        return 0;
    }
  });

  return (
    <div className="favorites-container max-w-7xl mx-auto mt-8">
      <Header />
      <div className="flex justify-between items-center mb-4 m-4">
        <h2 className="text-2xl font-bold">Your Favorites</h2>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="p-2 border rounded"
        >
          <option value="aToZ">A-Z</option>
          <option value="zToA">Z-A</option>
          <option value="recentlyAdded">Recently Added</option>
        </select>
      </div>
      {Object.keys(favorites).length === 0 ? (
        <p className="m-4">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedFavorites.map((episode) => (
            <FavoriteItem
              key={episode.id}
              episode={episode}
              removeFavorite={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FavoriteItem = ({ episode, removeFavorite }) => {
  const formattedDateTime = new Date(episode.dateAdded).toLocaleString();

  return (
    <div className="favorite-item bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">{episode.title}</h3>
      <p className="text-xl mb-2">Episode {episode.episode}</p>
      <p className="text-sm text-gray-600 mb-2">
        {episode.description.slice(0, 100)}...
      </p>
      <p className="text-xs text-gray-500 mb-2">
        Added on: {formattedDateTime}
      </p>
      <div className="flex justify-between items-center">
        <Link to={`/home`} className="text-blue-500 hover:underline">
          Go to home
        </Link>
        <button
          onClick={() => removeFavorite(episode.episode)}
          className="text-red-500"
        >
          <FaHeart className="ml-4 cursor-pointer text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default Favorites;
