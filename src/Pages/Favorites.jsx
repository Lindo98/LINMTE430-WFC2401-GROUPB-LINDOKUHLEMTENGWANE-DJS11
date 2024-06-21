import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  const [favorites, setFavorites] = useState({});

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

  return (
    <div className="favorites-container max-w-7xl mx-auto mt-8">
      <Header />
      <h2 className="text-2xl font-bold mb-4 m-4">Your Favorites</h2>
      {Object.keys(favorites).length === 0 ? (
        <p className="m-4">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(favorites).map((episode) => (
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

const FavoriteItem = ({ episode, removeFavorite }) => (
  <div className="favorite-item bg-white p-4 rounded-lg shadow-md">
    <img
      src={episode.image}
      alt={episode.title}
      className="w-full h-48 object-cover rounded-md mb-2"
    />
    <h3 className="text-lg font-semibold mb-2">{episode.title}</h3>
    <p className="text-sm text-gray-600 mb-2">
      {episode.description.slice(0, 100)}...
    </p>
    <div className="flex justify-between items-center">
      <Link to={`/seasons`} className="text-blue-500 hover:underline">
        Go to Show
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

export default Favorites;
