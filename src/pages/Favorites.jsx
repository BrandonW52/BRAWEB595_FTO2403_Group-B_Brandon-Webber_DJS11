// Favorites page

// imports react modules
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

// imports favorites store
import useFavoritesStore from "../zustand/FavoritesStore";

import Player from "../components/layout/Player";

// imports svg icons
import backArrowIcon from "../assets/navigation-back-arrow-svgrepo-com.svg";
import playButton from "../assets/play-button-svgrepo-com.svg";
import favoritedIcon from "../assets/favorite-filled-svgrepo-com.svg";
import filterIcon from "../assets/filter-svgrepo-com.svg";
import disabledFilterIcon from "../assets/filter-slash-svgrepo-com.svg";

export default function Favorites() {
  // Sets up variables from favorites store
  const { favorites, toggleFavorite } = useFavoritesStore();

  // Sets up search params from react router
  const [searchParams, setSearchParams] = useSearchParams();

  // Sets use state for displaying filters
  const [showFilters, setShowFilters] = useState(false);

  // Gets filter type from url
  const filterType = searchParams.get("type");

  // Filters favorites array by show season and episode
  let displayedFavorites = favorites.sort((a, b) => {
    let check = a.podcastId - b.podcastId;
    if (check !== 0) return check;

    check = a.season - b.season;
    if (check !== 0) return check;

    return a.episode - b.episode;
  });

  // Handles unfavoriting by creating a episode object and passing it to favorite store
  const handleFavClick = (favorite) => {
    const episodeObject = {
      podcastId: favorite.podcastId,
      podcastTitle: favorite.podcastTitle,
      season: favorite.season,

      episode: favorite.episode,
      episodeTitle: favorite.episodeTitle,
      episodeFile: favorite.episodeFile,
    };

    // Calls the function with the crated object
    toggleFavorite(episodeObject);
  };

  // Handles playing episode by creating a episode object and passing it to favorite store
  const handleplayClick = (favorite) => {
    const episodeObject = {
      podcastId: favorite.podcastId,
      podcastTitle: favorite.podcastTitle,
      season: favorite.season,

      episode: favorite.episode,
      episodeTitle: favorite.episodeTitle,
      episodeFile: favorite.episodeFile,
    };

    // Calls the function with the crated object
    Player(episodeObject);
  };

  // Filter check that returns filtered favorites array with the use of .sort
  if (filterType == "z-a") {
    displayedFavorites = favorites.sort((a, b) =>
      a.episodeTitle.localeCompare(b.episodeTitle)
    );
  } else if (filterType == "a-z") {
    displayedFavorites = favorites.sort((a, b) =>
      b.episodeTitle.localeCompare(a.episodeTitle)
    );
  } else if (filterType == "oldest") {
    displayedFavorites = favorites.sort(
      (a, b) => new Date(a.added) - new Date(b.added)
    );
  } else if (filterType == "newest") {
    displayedFavorites = favorites.sort(
      (b, a) => new Date(a.added) - new Date(b.added)
    );
  } else {
    displayedFavorites = favorites.sort((a, b) => {
      let check = a.podcastId - b.podcastId;
      if (check !== 0) return check;

      check = a.season - b.season;
      if (check !== 0) return check;

      return a.episode - b.episode;
    });
  }

  // Creates favorite element
  const favoriteElement = displayedFavorites.map((favorite, index) => (
    <div key={index} className="bg-grey rounded-xl p-4 mx-4">
      <h3 className="font-bold text-accent">{favorite.podcastTitle}</h3>

      <div className="grid grid-cols-2 gap-1">
        <h4 className="text-light-grey">Season: {favorite.season}</h4>
        <h4 className="text-light-grey">Episode: {favorite.episode}</h4>
        <h4>{favorite.episodeTitle}</h4>

        <button onClick={() => handleplayClick(favorite)}>
          <img className="h-4" src={playButton} alt="play button" />
        </button>

        <button onClick={() => handleFavClick(favorite)}>
          <img className="h-4" src={favoritedIcon} alt="cartoon heart icon" />
        </button>
      </div>
      <p className="text-sm text-light-grey text-right">{favorite.added}</p>
    </div>
  ));

  // Handles filter change by checking if it exists if not sets it
  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  // Checks if favorits is empty if so hides filter div
  useEffect(() => {
    if (!favorites.length) {
      setShowFilters(false);
    }
  }, [favorites]);

  // Renders main element
  return (
    <>
      <div className="bg-grey rounded-xl p-4 my-3 mx-4">
        <div className="flex items-center justify-between">
          {/* Links back to podcasts page */}
          <Link
            to={`..`}
            relative="path"
            className="flex items-center content-center gap-2"
          >
            <img
              className="rounded-full p-1 h-8 bg-accent"
              src={backArrowIcon}
              alt="back arrow"
            />
            <h1 className="text-white">Back to Podcasts</h1>
          </Link>

          {/* Toggles filter div */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            disabled={!favorites.length}
          >
            <img
              src={favorites.length ? filterIcon : disabledFilterIcon}
              alt="filter icon"
              className="h-8"
            />
          </button>
        </div>

        {/* Filter div */}
        <div
          className={`${
            showFilters ? "grid" : "hidden"
          } grid-cols-3 gap-1 my-3 lg:gap-4`}
        >
          {/* filtering buttons */}
          <button
            onClick={() => handleFilterChange("type", "a-z")}
            className={`border border-light-grey rounded-lg  text-white ${
              filterType === "a-z" ? "bg-accent" : ""
            }`}
          >
            A-Z
          </button>

          <button
            onClick={() => handleFilterChange("type", "z-a")}
            className={`border border-light-grey rounded-lg  text-white ${
              filterType === "z-a" ? "bg-accent" : ""
            }`}
          >
            Z-A
          </button>

          <button
            onClick={() => handleFilterChange("type", "oldest")}
            className={`border border-light-grey rounded-lg  text-white ${
              filterType === "oldest" ? "bg-accent" : ""
            }`}
          >
            Oldest
          </button>

          <button
            onClick={() => handleFilterChange("type", "newest")}
            className={`border border-light-grey rounded-lg  text-white ${
              filterType === "newest" ? "bg-accent" : ""
            }`}
          >
            Newest
          </button>

          {/* clear filtering button */}
          <button
            onClick={() => handleFilterChange("type", null)}
            className="text-light-grey"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Favorite element if favorite array empty displays alt */}
      <div className="flex flex-col gap-3 mb-32">
        {favorites.length ? (
          favoriteElement
        ) : (
          <h1 className="self-center text-2xl text-accent mt-16">
            Nothing here...
          </h1>
        )}
      </div>
    </>
  );
}
