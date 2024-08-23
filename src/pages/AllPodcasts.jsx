// All podcasts/home page

// imports react modules
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

// imports main store
import usePodcastStore from "../zustand/Store";

// imports loading and error pages
import Loading from "./Loading";
import Error from "./Error";

// imports svg icons
import favoriteIcon from "../assets/favorite-filled-svgrepo-com.svg";
import filterIcon from "../assets/filter-svgrepo-com.svg";

export default function AllPodcasts() {
  // Sets up variables from store
  const { podcasts, error, loading, fetchAllPodcasts } = usePodcastStore();

  // Sets up search params from react router
  const [searchParams, setSearchParams] = useSearchParams();

  // Sets use state for displaying filters
  const [showFilters, setShowFilters] = useState(false);

  // Gets filter type from url
  const filterType = searchParams.get("type");

  // Fetches podcasts if it is not defined or on podcast change
  useEffect(() => {
    if (!podcasts) {
      console.log("Fetching podcasts");
      fetchAllPodcasts();
    }
  }, [podcasts, fetchAllPodcasts]);

  // sets inital state of filtering
  let displayedPodcasts = podcasts;

  // Declares genres for easier filtering
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

  // Filter check that returns filtered podcast array with the use of .sort
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

  // Creates podcast element
  const podcastElements = displayedPodcasts?.map((podcast) => {
    return (
      <div key={podcast.id} className="rounded-lg p-4 bg-grey">
        <Link to={podcast.id}>
          <img
            className="rounded-lg"
            src={podcast.image}
            alt={`${podcast.title} image`}
          />
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

  // Renders loading screan
  if (loading) {
    return Loading();
  }

  // Renders error screen
  if (error) {
    return Error(error);
  }

  // Renders main element
  return (
    <>
      {/* Playists */}
      <Link to="favorites">
        <div className="p-2">
          <div className="flex items-center p-4 gap-4 mt-2 rounded-lg bg-grey">
            <img
              className="h-5 rounded-lg"
              src={favoriteIcon}
              alt="cartoon heart icon"
            />
            <h1 className="my-auto text-white text-xl font-bold">Favorites</h1>
          </div>
        </div>
      </Link>

      {/* Podcasts */}
      <div className="flex flex-col items-center p-2 gap-4 mt-2 mx-2 rounded-lg bg-grey">
        <div className="flex items-center justify-between w-full px-4">
          <h1 className="text-accent text-center text-2xl">All Podcasts</h1>

          {/* Toggles filter div */}
          <button onClick={() => setShowFilters(!showFilters)}>
            <img src={filterIcon} alt="filter icon" className="h-10" />
          </button>
        </div>

        {/* Filter div */}
        <div
          className={`${
            showFilters ? "grid" : "hidden"
          } grid-cols-3 gap-1 lg:grid-cols-9 lg:gap-4`}
        >
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
      {/* Podcasts */}
      <div className="grid grid-cols-2 gap-4 p-2 mb-14 lg:grid-cols-4">
        {podcastElements}
      </div>
    </>
  );
}
