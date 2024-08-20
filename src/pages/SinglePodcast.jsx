import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import usePodcastStore from "../zustand/Store";
import useFavoritesStore from "../zustand/FavoritesStore";

import Loading from "../components/Loading";
import Error from "../components/Error";

import backArrowURl from "../assets/navigation-back-arrow-svgrepo-com.svg";
import downArrowURL from "../assets/down-arrow-svgrepo-com.svg";
import upArrowURL from "../assets/up-arrow-svgrepo-com.svg";
import playButton from "../assets/play-button-svgrepo-com.svg";
import favoritedIcon from "../assets/favorite-filled-svgrepo-com.svg";
import unFavoritedIcon from "../assets/favorite-svgrepo-com.svg";

export default function SinglePodcast() {
  const { podcastId } = useParams();

  const { error, loading, fetchSinglePodcast } = usePodcastStore();
  const { favorites, toggleFavorite } = useFavoritesStore();

  const [podcast, setPodcast] = useState(null);
  const [showMore, SetShowMore] = useState(false);
  const [activeSeasonIndex, setActiveSeasonIndex] = useState(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const result = await fetchSinglePodcast(podcastId);
        setPodcast(result);
      } catch (error) {
        console.log("error fetching", error);
      }
    };

    fetchPodcast();
  }, [podcastId, fetchSinglePodcast]);

  const toggleSeason = (index) => {
    if (activeSeasonIndex === index) {
      setActiveSeasonIndex(null);
    } else {
      setActiveSeasonIndex(index);
    }
  };

  const isFavorite = (podcastId, podcastSeason, episodeTitle) => {
    return favorites.some((favorite) => {
      return (
        favorite.podcastId === podcastId &&
        favorite.seasons.some((season) => {
          return (
            season.season === podcastSeason &&
            season.episodes.some((episode) => episode.title === episodeTitle)
          );
        })
      );
    });
  };

  const cleanedGenre = podcast?.genres
    ?.filter((genre) => genre !== "All" && genre !== "Featured")
    .join(", ");

  const handleFavClick = (episode, season) => {
    episode.added = new Date().toJSON().slice(0, 10);
    const episodeObject = {
      podcastId: podcastId,
      podcastTitle: podcast.title,
      podcastGeners: podcast.genres,
      seasons: [
        { season: season.season, title: season.title, episodes: [episode] },
      ],
    };

    toggleFavorite(episodeObject);
  };

  const seasonsElement = podcast?.seasons.map((season, index) => {
    return (
      <div key={season.season} className="flex flex-col w-full gap-2">
        <div className="flex gap-2">
          <img className="h-12 rounded-lg" src={season.image} alt="" />
          <h1 className="my-auto text-white">{season.title}</h1>
          <button
            className="rounded-full bg-accent"
            onClick={() => toggleSeason(index)}
          >
            <img
              className="rounded-full p-1 h-8 bg-accent"
              src={activeSeasonIndex === index ? upArrowURL : downArrowURL}
            />
          </button>
        </div>
        {activeSeasonIndex === index && (
          <>
            <div className="flex flex-col gap-3">
              {season.episodes.map((episode) => (
                <div key={episode.episode} className="flex justify-between">
                  <img className="h-4" src={playButton} alt="" />
                  <h4 className="text-white">{episode.title}</h4>

                  <button onClick={() => handleFavClick(episode, season)}>
                    <img
                      className="h-4"
                      src={
                        isFavorite(podcastId, season.season, episode.title)
                          ? favoritedIcon
                          : unFavoritedIcon
                      }
                      alt=""
                    />
                  </button>
                </div>
              ))}
            </div>
            <hr className="text-white"></hr>
          </>
        )}
      </div>
    );
  });

  if (loading) {
    return Loading();
  }

  if (error) {
    return Error(error);
  }

  return (
    <div className="h-full pb-14">
      {/* Top card for displaying podcast info */}
      <div className="bg-grey rounded-xl p-4 my-3 mx-4">
        <Link to={`..`} relative="path">
          <div className="flex content-center gap-2 mb-3">
            <img
              className="rounded-full p-1 h-8 bg-accent"
              src={backArrowURl}
              alt=""
            />
            <h1 className="text-white">Back to Podcasts</h1>
          </div>
        </Link>

        <div className="flex gap-2 mb-4">
          <img className="rounded-lg h-32" src={podcast?.image} alt="" />
          <div className="flex flex-col justify-between">
            <h1 className="text-white font-bold text-xl">{podcast?.title}</h1>

            {cleanedGenre?.length > 0 ? (
              <h4 className="text-sm text-white">Genres: {cleanedGenre}</h4>
            ) : null}

            <h4 className="text-sm text-white">
              Seasons: {podcast?.seasons.length}
            </h4>
          </div>
        </div>
        <p className="mt-auto text-white text-sm">
          Last Upload: {podcast?.updated.substring(0, 10)}
        </p>

        <p className="text-white text-sm">
          {showMore
            ? podcast?.description
            : `${podcast?.description.substring(0, 150)}...`}
          <button
            className="ml-4 text-accent"
            onClick={() => SetShowMore(!showMore)}
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        </p>

        <hr className="text-white m-2 "></hr>
      </div>

      {/* Card containg seasons/episodes */}
      <div className="bg-grey rounded-xl p-4 my-3 mx-4">
        <h2 className="text-accent font-bold text-lg">Seasons</h2>

        <div className="grid grid-cols-1 gap-4">{seasonsElement}</div>
      </div>
    </div>
  );
}
