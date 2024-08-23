// Single podcast page

// imports react modules
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// imports zustand stores
import usePodcastStore from "../zustand/Store";
import useFavoritesStore from "../zustand/FavoritesStore";
import useCurrentlyPlayingStore from "../zustand/CurrentlyPlaying";

// imports loading and error pages
import Loading from "./Loading";
import Error from "./Error";

// imports svg icons
import backArrowIcon from "../assets/navigation-back-arrow-svgrepo-com.svg";
import downArrowIcon from "../assets/down-arrow-svgrepo-com.svg";
import upArrowIcon from "../assets/up-arrow-svgrepo-com.svg";
import playButton from "../assets/play-button-svgrepo-com.svg";
import favoritedIcon from "../assets/favorite-filled-svgrepo-com.svg";
import unFavoritedIcon from "../assets/favorite-svgrepo-com.svg";

export default function SinglePodcast() {
  // Gets podcast id from url
  const { podcastId } = useParams();

  // Sets up variables from store
  const { error, loading, fetchSinglePodcast } = usePodcastStore();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const { togglePlaying } = useCurrentlyPlayingStore();

  // Sets use state for podcast / show more / season index for displaying one season at a time
  const [podcast, setPodcast] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [activeSeasonIndex, setActiveSeasonIndex] = useState(null);

  // Fetches podcast
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

  // Function to toggle one season at a time
  const toggleSeason = (index) => {
    if (activeSeasonIndex === index) {
      setActiveSeasonIndex(null);
    } else {
      setActiveSeasonIndex(index);
    }
  };

  // Function to check if an episode in in favorites and changes fav iconn
  const isFavorite = (podcastId, podcastSeason, episodeEpisode) => {
    return favorites.some((favorite) => {
      return (
        favorite.podcastId == podcastId &&
        favorite.season == podcastSeason &&
        favorite.episode == episodeEpisode
      );
    });
  };

  // Cleans the podcast generes by removing unwanted ones
  const cleanedGenre = podcast?.genres
    ?.filter((genre) => genre !== "All" && genre !== "Featured")
    .join(", ");

  // Function to hangle favoriting episodes by passing the episode object and season number
  const handleFavClick = (episode, season) => {
    const episodeObject = {
      podcastId: podcastId,
      podcastTitle: podcast.title,
      season: season.season,

      episode: episode.episode,
      episodeTitle: episode.title,
      episodeFile: episode.file,

      added: new Date().toJSON().slice(0, 10),
    };

    // Calls the function with the crated object
    toggleFavorite(episodeObject);
  };

  // Function to hangle playing an episodes by passing the episode object and season number
  const handleplayClick = (episode, season) => {
    const episodeObject = {
      podcastId: podcastId,
      podcastTitle: podcast.title,
      season: season.season,

      episode: episode.episode,
      episodeTitle: episode.title,
      episodeFile: episode.file,
    };

    // Calls the function with the crated object
    togglePlaying(episodeObject);
  };

  // Creates podcast season element
  const seasonsElement = podcast?.seasons.map((season, index) => {
    return (
      // Season div
      <div key={season.season} className="flex flex-col w-full gap-2">
        <div className="flex items-center justify-between gap-2">
          <img
            className="h-12 rounded-lg"
            src={season.image}
            alt={`${season.title} image`}
          />
          <h1 className="my-auto text-white">{season.title}</h1>
          <p className="text-sm text-light-grey">
            Episodes: {season.episodes.length}
          </p>
          <button
            className="rounded-full bg-accent"
            onClick={() => toggleSeason(index)}
          >
            <img
              className="rounded-full p-1 h-8 bg-accent"
              src={activeSeasonIndex === index ? upArrowIcon : downArrowIcon}
              alt="toggle season icon"
            />
          </button>
        </div>
        {activeSeasonIndex === index && (
          <>
            {/* episode div */}
            <div className="flex flex-col gap-3">
              {season.episodes.map((episode) => (
                <div key={episode.episode} className="flex justify-between">
                  <button onClick={() => handleplayClick(episode, season)}>
                    <img className="h-4" src={playButton} alt="play button" />
                  </button>

                  <h4 className="text-white">{episode.title}</h4>

                  <button onClick={() => handleFavClick(episode, season)}>
                    <img
                      className="h-4"
                      src={
                        isFavorite(podcastId, season.season, episode.episode)
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
    <div className="h-full pb-14">
      {/* Top card for displaying podcast info */}
      <div className="bg-grey rounded-xl p-4 my-3 mx-4">
        {/* Links back to podcasts/home page */}
        <Link to={`..`} relative="path">
          <div className="flex content-center gap-2 mb-3">
            <img
              className="rounded-full p-1 h-8 bg-accent"
              src={backArrowIcon}
              alt="back arrow icon"
            />
            <h1 className="text-white">Back to Podcasts</h1>
          </div>
        </Link>

        {/* Main podcast info card */}
        <div className="flex gap-2 mb-4">
          <img className="rounded-lg h-32" src={podcast?.image} alt="" />
          <div className="flex flex-col justify-between">
            <h1 className="text-white font-bold text-xl">{podcast?.title}</h1>
            {/* Checks if genere exits if not doesnt render it */}
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
            onClick={() => setShowMore(!showMore)}
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
