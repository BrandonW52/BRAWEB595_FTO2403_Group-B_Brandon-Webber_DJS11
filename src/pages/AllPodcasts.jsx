import { useEffect } from "react";
import { Link } from "react-router-dom";

import usePodcastStore from "../zustand/Store";

import favoriteImg from "../assets/favorite-filled-svgrepo-com.svg";

export default function AllPodcasts() {
  const { podcasts, error, loading, fetchAllPodcasts } = usePodcastStore();

  useEffect(() => {
    if (!podcasts) {
      console.log("Fetching podcasts");
      fetchAllPodcasts();
    }
  }, [podcasts, fetchAllPodcasts]);

  const podcastElements = podcasts?.map((podcast) => {
    return (
      <div key={podcast.id} className="rounded-lg p-4 bg-grey">
        <Link to={podcast.id}>
          <img className="rounded-lg" src={podcast.image} alt="" />
          <h1 className="text-white font-bold">{podcast.title}</h1>
          <p className="text-white">Genre/s: {podcast.genres}</p>
          <p className="text-white">Seasons: {podcast.seasons}</p>
          <p className="text-light-grey">
            Last updated: {podcast.updated.substring(0, 10)}
          </p>
        </Link>
      </div>
    );
  });

  if (loading) {
    return <h1 className="text-white text-center">Loading...</h1>;
  }

  if (error) {
    console.log(error);
    return (
      <div className="rounded-lg py-16 text-center bg-error">
        <h1 className="text-white">Error</h1>
        <p className="text-white">{error.TypeError}</p>
      </div>
    );
  }

  return (
    <>
      {/* Playists */}
      <h1 className="text-white mx-auto text-center py-2">Paylists</h1>
      <hr className="text-white mx-2"></hr>

      <div className="p-2">
        <div className="flex p-4 gap-4 mt-2 rounded-lg bg-grey">
          <img className="h-12 rounded-lg" src={favoriteImg} alt="" />
          <h1 className="my-auto text-white text-xl font-bold">Favorites</h1>
        </div>
      </div>

      {/* Podcasts */}
      <h1 className="text-white mx-auto text-center py-2">All Podcasts</h1>
      <hr className="text-white mx-2"></hr>
      <div className="grid grid-cols-2 gap-4 p-2">{podcastElements}</div>
    </>
  );
}
