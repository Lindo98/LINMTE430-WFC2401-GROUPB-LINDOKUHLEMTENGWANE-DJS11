import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import SeasonsComponent from "./SeasonsComponent";

const Seasons = () => {
  const params = useParams();
  const [seasons, setSeasons] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${params.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setSeasons(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the episodes:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center text-6xl mt-50 font-semi-bold">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error fetching the episodes: {error.message}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-4 mb-20 sm:m-4 items-center rounded-lg">
      <div className="max-w-7xl mx-auto mb-10 h-80 ">
        <img
          src={seasons.image}
          alt={seasons.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold mb-4">{seasons.title}</h1>
      <p className="mb-4 text-m ">{seasons.description}</p>
      <p className=" font-bold mb-4 text-lg pt-4 pb-4">
        {seasons.genres.map((genre, index) => (
          <span key={index} className="mr-4">
            {genre}
          </span>
        ))}
      </p>

      <SeasonsComponent seasons={seasons.seasons} />

      <div className="max-w-7xl mx-auto grid grid-cols-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Seasons;
