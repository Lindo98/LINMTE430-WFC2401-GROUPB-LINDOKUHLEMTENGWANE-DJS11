import React, { useState } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <footer className="music-player">
      <div className="player-controls">
        <button onClick={togglePlay}>
          {isPlaying ? (
            <i className="fas fa-pause"></i>
          ) : (
            <i className="fas fa-play"></i>
          )}
        </button>
      </div>
      <div className="track-info">
        <span className="track-name">Track Name</span>
        <span className="artist-name">Artist Name</span>
      </div>
    </footer>
  );
};

export default MusicPlayer;
