import React, { useState } from "react";
import PropTypes from "prop-types";
import Episodes from "./Episodes"; // Import the EpisodesComponent

const Seasons = ({ seasons }) => {
  const [selectedSeason, setSelectedSeason] = useState("");

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  return (
    <div className="seasons text-xl font-medium">
      <select
        className="px-2 py-1 text-sm p-4 font-bold border rounded-md focus:outline-none"
        onChange={handleSeasonChange}
        defaultValue=""
      >
        <option value="" disabled>
          Seasons
        </option>
        {seasons.map((season) => (
          <option key={season.title} value={season.title}>
            {season.title}
          </option>
        ))}
      </select>

      {selectedSeason && (
        <Episodes
          episodes={
            seasons.find((season) => season.title === selectedSeason)?.episodes
          }
        />
      )}
    </div>
  );
};

Seasons.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      episodes: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Seasons;
