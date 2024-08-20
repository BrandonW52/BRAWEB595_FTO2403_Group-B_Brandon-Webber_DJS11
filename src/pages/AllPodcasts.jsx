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

  const filterGenres = searchParams.get("genres");
  const filterOrder = searchParams.get("order");
  const filterRelease = searchParams.get("release");

  useEffect(() => {
    if (!podcasts) {
      console.log("Fetching podcasts");
      fetchAllPodcasts();
    }
  }, [podcasts, fetchAllPodcasts]);

  let displayedPodcasts = podcasts;

  if (filterGenres) {
    displayedPodcasts = podcasts.filter((podcast) =>
      podcast.genres.includes(+filterGenres)
    );
  }

  if (filterOrder) {
    displayedPodcasts = podcasts.reverse();
  }

  if (filterRelease == "newest") {
    displayedPodcasts = podcasts
      .sort((a, b) => new Date(a.updated) - new Date(b.updated))
      .reverse();
  }

  if (filterRelease == "oldest") {
    displayedPodcasts = podcasts.sort(
      (a, b) => new Date(a.updated) - new Date(b.updated)
    );
  }

  // const displayedPodcasts = filterGenres
  //   ? podcasts.filter((podcast) => podcast.genres.includes(+filterGenres))
  //   : podcasts;

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
    console.log(value);
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
          <div className="flex p-4 gap-4 mt-2 rounded-lg bg-grey">
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
          <button onClick={() => handleFilterChange("genres", 1)}>
            Personal Growth
          </button>
          <button onClick={() => handleFilterChange("genres", 2)}>
            Investigative Journalism
          </button>
          <button onClick={() => handleFilterChange("genres", 9)}>
            Kids and Family
          </button>
          <button onClick={() => handleFilterChange("genres", 3)}>
            History
          </button>
          <button onClick={() => handleFilterChange("genres", 4)}>
            Comedy
          </button>
          <button onClick={() => handleFilterChange("genres", 5)}>
            Entertainment
          </button>
          <button onClick={() => handleFilterChange("genres", 6)}>
            Business
          </button>
          <button onClick={() => handleFilterChange("genres", 7)}>
            Fiction
          </button>
          <button onClick={() => handleFilterChange("genres", 8)}>News</button>

          <button onClick={() => handleFilterChange("order", null)}>A-Z</button>

          <button onClick={() => handleFilterChange("order", 1)}>Z-A</button>

          <button onClick={() => handleFilterChange("release", "oldest")}>
            Oldest
          </button>

          <button onClick={() => handleFilterChange("release", "newest")}>
            Newest
          </button>

          <button
            onClick={() => {
              handleFilterChange("genres", null);
              handleFilterChange("order", null);
              handleFilterChange("release", null);
            }}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-2 mb-14">{podcastElements}</div>
    </>
  );
}
