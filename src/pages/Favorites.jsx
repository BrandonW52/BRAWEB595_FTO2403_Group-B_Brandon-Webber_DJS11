import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import getMergeFavorites from "../components/helper-functions/getMergeFavorites";

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

  const handleFavClick = (favorite, season, episode) => {
    const episodeObject = {
      podcastId: favorite.podcastId,
      podcastTitle: favorite.podcastTitle,
      podcastGeners: favorite.podcastGeners,
      seasons: [
        { season: season.season, title: season.title, episodes: [episode] },
      ],
    };

    toggleFavorite(episodeObject);
  };

  let displayedFilteredFavorites;

  let displayedFavorites = getMergeFavorites(favorites);

  let allEpisodes = favorites.flatMap((podcast) => {
    return podcast.seasons.flatMap((season) => {
      return season.episodes.map((episode) => episode);
    });
  });

  if (filterType == "a-z") {
    displayedFilteredFavorites = allEpisodes.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (filterType == "z-a") {
    displayedFilteredFavorites = allEpisodes.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  } else if (filterType == "oldest") {
    const temp = allEpisodes;
    displayedFilteredFavorites = temp.sort(
      (a, b) => new Date(a.added) - new Date(b.added)
    );
  } else if (filterType == "newest") {
    const temp = allEpisodes;
    displayedFilteredFavorites = temp.sort(
      (b, a) => new Date(a.added) - new Date(b.added)
    );
  } else {
    displayedFavorites = getMergeFavorites(favorites);
  }

  const filteredElement = displayedFilteredFavorites?.map((episode, index) => {
    return (
      <div key={index} className="flex items-center justify-between gap-1">
        <img className="h-4" src={playButton} alt="" />
        <h4 className="text-white text-wrap">
          {`${episode.title.substring(0, 21)}...`}
        </h4>
        <p className="text-sm text-light-grey">{episode.added}</p>
      </div>
    );
  });

  const favoriteElement = displayedFavorites.map((favorite) => (
    <div key={favorite.podcastId} className="flex flex-col">
      <h4 className="font-bold text-accent">{favorite.podcastTitle}</h4>
      {favorite.seasons?.map((season) => {
        return (
          <div key={favorite.podcastId + season.season}>
            <h5 className="text-light-grey">Season: {season.season}</h5>{" "}
            {season.episodes?.map((episode) => (
              <div
                key={favorite.podcastId + season.season + episode.episode}
                className="flex items-center justify-between gap-1"
              >
                <img className="h-4" src={playButton} alt="" />
                <h4 className="text-white text-wrap">
                  {`${episode.title.substring(0, 21)}...`}
                </h4>
                <p className="text-sm text-light-grey">{episode.added}</p>

                <button
                  onClick={() => handleFavClick(favorite, season, episode)}
                >
                  <img className="h-4" src={favoritedIcon} alt="" />
                </button>
              </div>
            ))}
          </div>
        );
      })}
      <hr className="text-light-grey"></hr>
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
    <div className="bg-grey rounded-xl p-4 my-3 mx-4 mb-16">
      <div className="flex items-center justify-between mb-3">
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
        className={`${showFilters ? "grid" : "hidden"} grid-cols-3 gap-1 mb-3`}
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
        <button onClick={() => handleFilterChange("type", null)}>Clear</button>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {searchParams === null ? filteredElement : favoriteElement}
      </div>
    </div>
  );
}

// favorites.length ? (
//   searchParams ? (
//     filteredElement
//   ) : (
//     favoriteElement
//   )
// ) : (
//   <h1 className="self-center text-2xl text-accent">Nothing here...</h1>
// )

// favorites.length ? (
//   favoriteElement
// ) : (
//   <h1 className="self-center text-2xl text-accent">Nothing here...</h1>
// )
