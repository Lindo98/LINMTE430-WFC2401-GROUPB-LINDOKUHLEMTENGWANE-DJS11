import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setFavorites(storedFavorites);
  };

  const removeFavorite = (episode) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      delete updatedFavorites[episode.id];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <div className="favorites-container max-w-7xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
      {Object.keys(favorites).length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(favorites).map((episode) => (
            <div
              key={episode.id}
              className="favorite-item bg-white p-4 rounded-lg shadow-md"
            >
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
                <Link
                  to={`/home/${episode.showId}/episodes`}
                  className="text-blue-500 hover:underline"
                >
                  Go to Show
                </Link>
                <button
                  onClick={() => removeFavorite(episode)}
                  className="text-red-500"
                >
                  <FaHeart />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
