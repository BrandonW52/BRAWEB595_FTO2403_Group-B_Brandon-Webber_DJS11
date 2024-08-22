import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import useFavoritesStore from "../zustand/FavoritesStore";

import backArrowURl from "../assets/navigation-back-arrow-svgrepo-com.svg";
import playButton from "../assets/play-button-svgrepo-com.svg";
import favoritedIcon from "../assets/favorite-filled-svgrepo-com.svg";
import filterImg from "../assets/filter-svgrepo-com.svg";
import disabledFilterIcon from "../assets/filter-slash-svgrepo-com.svg";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavoritesStore();

  const [searchParams, setSearchParams] = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);

  const filterType = searchParams.get("type");

  let displayedFavorites = favorites.sort((a, b) => {
    let check = a.podcastId - b.podcastId;
    if (check !== 0) return check;

    check = a.season - b.season;
    if (check !== 0) return check;

    return a.episode - b.episode;
  });

  const handleFavClick = (favorite) => {
    const episodeObject = {
      podcastId: favorite.podcastId,
      podcastTitle: favorite.podcastTitle,
      season: favorite.season,

      episode: favorite.episode,
      episodeTitle: favorite.episodeTitle,
      episodeFile: favorite.episodeFile,
    };

    toggleFavorite(episodeObject);
  };

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
    displayedFavorites = favorites;
  }

  const favoriteElement = displayedFavorites.map((favorite, index) => (
    <div key={index} className="bg-grey rounded-xl p-4 mx-4">
      <h3 className="font-bold text-accent">{favorite.podcastTitle}</h3>
      <h4>Season: {favorite.season}</h4>
      <h4>Episode: {favorite.episode}</h4>
      <h4>{favorite.episodeTitle}</h4>

      <img className="h-4" src={playButton} alt="" />

      <button onClick={() => handleFavClick(favorite)}>
        <img className="h-4" src={favoritedIcon} alt="" />
      </button>
    </div>
  ));

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

  return (
    <>
      <div className="bg-grey rounded-xl p-4 my-3 mx-4">
        <div className="flex items-center justify-between">
          <Link
            to={`..`}
            relative="path"
            className="flex items-center content-center gap-2"
          >
            <img
              className="rounded-full p-1 h-8 bg-accent"
              src={backArrowURl}
              alt=""
            />
            <h1 className="text-white">Back to Podcasts</h1>
          </Link>

          <button
            onClick={() => setShowFilters(!showFilters)}
            disabled={!favorites.length}
          >
            <img
              src={favorites.length ? filterImg : disabledFilterIcon}
              alt="filter icon"
              className="h-8"
            />
          </button>
        </div>

        {/* Filter div */}
        <div
          className={`${
            showFilters ? "grid" : "hidden"
          } grid-cols-3 gap-1 my-3`}
        >
          {/* filtering buttons */}
          <button onClick={() => handleFilterChange("type", "a-z")}>A-Z</button>

          <button onClick={() => handleFilterChange("type", "z-a")}>Z-A</button>

          <button onClick={() => handleFilterChange("type", "oldest")}>
            Oldest
          </button>

          <button onClick={() => handleFilterChange("type", "newest")}>
            Newest
          </button>

          {/* clear filtering button */}
          <button onClick={() => handleFilterChange("type", null)}>
            Clear
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-16">
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
