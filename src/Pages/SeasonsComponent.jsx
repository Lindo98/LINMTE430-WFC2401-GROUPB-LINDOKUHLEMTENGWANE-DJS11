import React, { useState } from "react";
import PropTypes from "prop-types";
import Episodes from "./Episodes"; // Import the EpisodesComponent

/**
 * Renders a component that displays a dropdown menu of seasons and their corresponding episodes.
 *
 * @param {Object} props - The props object containing the seasons data.
 * @param {Array} props.seasons - An array of objects representing each season, with each object containing a "title" property.
 * @return {JSX.Element} The rendered component.
 */

const Seasons = ({ seasons }) => {
  const [selectedSeason, setSelectedSeason] = useState("");

  /**
   * Updates the selected season based on the value selected in the dropdown menu.
   *
   * @param {Event} event - The event object triggered by the user's selection.
   * @return {void} This function does not return anything.
   */

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
