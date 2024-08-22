import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import usePodcastStore from "../zustand/Store";

import Loading from "./Loading";
import Error from "./Error";

import favoriteImg from "../assets/favorite-filled-svgrepo-com.svg";
import filterImg from "../assets/filter-svgrepo-com.svg";

export default function AllPodcasts() {
  const { podcasts, error, loading, fetchAllPodcasts } = usePodcastStore();

  const [searchParams, setSearchParams] = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);

  const filterType = searchParams.get("type");

  useEffect(() => {
    if (!podcasts) {
      console.log("Fetching podcasts");
      fetchAllPodcasts();
    }
  }, [podcasts, fetchAllPodcasts]);

  let displayedPodcasts = podcasts;
  const filterGenres = [
    "Personal Growth",
    "Investigative Journalism",
    "History",
    "Comedy",
    "Entertainment",
    "Business",
    "Fiction",
    "News",
    "Kids and Family",
  ];

  if (filterGenres.includes(filterType)) {
    displayedPodcasts = podcasts.filter((podcast) =>
      podcast.genres.includes(filterType)
    );
  } else if (filterType == "a-z") {
    displayedPodcasts = podcasts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filterType == "z-a") {
    displayedPodcasts = podcasts.sort((a, b) => b.title.localeCompare(a.title));
  } else if (filterType == "oldest") {
    displayedPodcasts = podcasts.sort(
      (a, b) => new Date(a.updated) - new Date(b.updated)
    );
  } else if (filterType == "newest") {
    displayedPodcasts = podcasts.sort(
      (b, a) => new Date(a.updated) - new Date(b.updated)
    );
  } else {
    displayedPodcasts = podcasts?.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  const podcastElements = displayedPodcasts?.map((podcast) => {
    return (
      <div key={podcast.id} className="rounded-lg p-4 bg-grey">
        <Link to={podcast.id}>
          <img className="rounded-lg" src={podcast.image} alt="" />
          <h1 className="text-white font-bold">{podcast.title}</h1>
          <p className="text-white">Genre/s: {podcast.genres.join(", ")}</p>
          <p className="text-white">Seasons: {podcast.seasons}</p>
          <p className="text-light-grey">
            Last updated: {podcast.updated.substring(0, 10)}
          </p>
        </Link>
      </div>
    );
  });

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

  if (loading) {
    return Loading();
  }

  if (error) {
    return Error(error);
  }

  return (
    <>
      {/* Playists */}
      <Link to="favorites">
        <div className="p-2">
          <div className="flex items-center p-4 gap-4 mt-2 rounded-lg bg-grey">
            <img className="h-5 rounded-lg" src={favoriteImg} alt="" />
            <h1 className="my-auto text-white text-xl font-bold">Favorites</h1>
          </div>
        </div>
      </Link>

      {/* Podcasts */}
      <div className="flex flex-col items-center p-2 gap-4 mt-2 mx-2 rounded-lg bg-grey">
        <div className="flex items-center justify-between w-full px-4">
          <h1 className="text-accent text-center text-2xl">All Podcasts</h1>

          <button onClick={() => setShowFilters(!showFilters)}>
            <img src={filterImg} alt="filter icon" className="h-10" />
          </button>
        </div>

        {/* Filter div */}
        <div className={`${showFilters ? "grid" : "hidden"} grid-cols-3 gap-1`}>
          {/* Genres buttons */}
          <button
            onClick={() => handleFilterChange("type", "Personal Growth")}
            className={`border border-light-grey rounded-lg  text-white ${
              filterType === "Personal Growth" ? "bg-accent" : ""
            }`}
          >
            Personal Growth
          </button>
          <button
            onClick={() =>
              handleFilterChange("type", "Investigative Journalism")
            }
            className={`border border-light-grey rounded-lg  text-white ${
              filterType === "Investigative Journalism" ? "bg-accent" : ""
            }`}
          >
            Investigative Journalism
          </button>
          <button
            onClick={() => handleFilterChange("type", "Kids and Family")}
            className={`border border-light-grey rounded-lg  text-white ${
              filterType === "Kids and Family" ? "bg-accent" : ""
            }`}
          >
            Kids and Family
          </button>
          <button
            onClick={() => handleFilterChange("type", "History")}
            className={`border border-light-grey rounded-lg  text-white ${
              filterType === "History" ? "bg-accent" : ""
            }`}
          >
            History
          </button>
          <button
            onClick={() => handleFilterChange("type", "Comedy")}
            className={`border border-light-grey rounded-lg  text-white ${
              filterType === "Comedy" ? "bg-accent" : ""
            }`}
          >
            Comedy
          </button>
          <button
            onClick={() => handleFilterChange("type", "Entertainment")}
            className={`border border-light-grey rounded-lg  text-white ${
              filterType === "Entertainment" ? "bg-accent" : ""
            }`}
          >
            Entertainment
          </button>
          <button
            onClick={() => handleFilterChange("type", "Business")}
            className={`border border-light-grey rounded-lg  text-white ${
              filterType === "Business" ? "bg-accent" : ""
            }`}
          >
            Business
          </button>
          <button
            onClick={() => handleFilterChange("type", "Fiction")}
            className={`border border-light-grey rounded-lg  text-white ${
              filterType === "Fiction" ? "bg-accent" : ""
            }`}
          >
            Fiction
          </button>
          <button
            onClick={() => handleFilterChange("type", "News")}
            className={`border border-light-grey rounded-lg  text-white ${
              filterType === "News" ? "bg-accent" : ""
            }`}
          >
            News
          </button>

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
      <div className="grid grid-cols-2 gap-4 p-2 mb-14">{podcastElements}</div>
    </>
  );
}
