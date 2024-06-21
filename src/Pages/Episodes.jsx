import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";

const Episodes = ({ episodes }) => {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [images, setImages] = useState({});
  const audioRef = useRef(null);

  useEffect(() => {
    fetchImages();
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setFavorites(storedFavorites);
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("https://podcast-api.netlify.app/id/shows");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handlePlay = (episode) => {
    if (currentEpisode && currentEpisode.title === episode.title) {
      audioRef.current.play();
    } else {
      setCurrentEpisode(episode);
      if (audioRef.current) {
        audioRef.current.src =
          episode.audioUrl ||
          "https://podcast-api.netlify.app/placeholder-audio.mp3";
        audioRef.current.play();
      }
    }
  };

  const toggleFavorite = (episode) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      if (updatedFavorites[episode.id]) {
        delete updatedFavorites[episode.id];
      } else {
        updatedFavorites[episode.id] = episode;
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const isFavorite = (episode) => {
    return !!favorites[episode.id];
  };

  const EpisodeDescription = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <p className="p-4">
        {isExpanded || description.length <= 30
          ? description
          : `${description.slice(0, 30)}... `}
        {description.length > 30 && (
          <button className="text-bold ml-6" onClick={toggleDescription}>
            {isExpanded ? "Read less" : "Read more..."}
          </button>
        )}
      </p>
    );
  };

  return (
    <div className="episodes mt-4">
      <h2 className="text-2xl font-bold mb-2 mt-10">Episodes</h2>
      <div
        className="max-w-7xl mx-auto mb-20 rounded-lg"
        style={{ backgroundColor: "#f7f7f2" }}
      >
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-2 rounded-lg">
          {episodes.map((episode, index) => (
            <div
              key={index}
              className="episode-item m-4 p-4 shadow-2xl rounded-lg"
            >
              <img src={images[episode.id]} alt="" className="" />
              <h3 className="p-4">{episode.title}</h3>
              <EpisodeDescription description={episode.description} />
              <div className="flex items-center">
                <button
                  className="text-white px-4 py-1 ml-4 text-sm border rounded-md mt-2"
                  style={{ backgroundColor: "#c5d86d" }}
                  onClick={() => handlePlay(episode)}
                >
                  {currentEpisode && currentEpisode.title === episode.title
                    ? "Playing"
                    : "Play"}
                </button>
                <FaHeart
                  className={`ml-4 cursor-pointer ${
                    isFavorite(episode) ? "text-red-500" : "text-gray-500"
                  }`}
                  onClick={() => toggleFavorite(episode)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <audio
        ref={audioRef}
        controls
        className="fixed bottom-0 left-0 w-full text-white p-2"
        style={{ backgroundColor: "#f7f7f2" }}
      >
        <source
          src="https://podcast-api.netlify.app/placeholder-audio.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

Episodes.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      audioUrl: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Episodes;
