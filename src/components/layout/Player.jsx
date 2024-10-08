// Basic footer

// imports zustand stores
import useCurrentlyPlayingStore from "../../zustand/CurrentlyPlaying";
import useFavoritesStore from "../../zustand/FavoritesStore";

// imports svg icons
import unFavoritedIcon from "../../assets/favorite-svgrepo-com.svg";
import favoritedIcon from "../../assets/favorite-filled-svgrepo-com.svg";

export default function Player() {
  // Sets up variables from favorites store
  const { favorites, toggleFavorite } = useFavoritesStore();
  const { currentEpisode } = useCurrentlyPlayingStore();

  // Checks if the current episode is favorited
  const isFavorite = (passedEpisode) => {
    return favorites.some((favorite) => {
      return (
        favorite.podcastId == passedEpisode.podcastId &&
        favorite.season == passedEpisode.season &&
        favorite.episode == passedEpisode.episode
      );
    });
  };

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

  const beforeUnloadHandler = (event) => {
    // Recommended
    event.preventDefault();

    // Included for legacy support, e.g. Chrome/Edge < 119
    event.returnValue = true;
  };

  // If there is an episode in currentEpisode it prevents window close
  if (currentEpisode) {
    window.addEventListener("beforeunload", beforeUnloadHandler);
  } else {
    window.removeEventListener("beforeunload", beforeUnloadHandler);
  }

  return (
    <div className="fixed bottom-0 w-full flex flex-col items-center  gap-2 p-4 bg-grey text-white">
      <audio controls className="bg-grey">
        <source src={currentEpisode.episodeFile} type="audio/mpeg" />
      </audio>

      <div className="flex gap-8 ">
        <h1>{currentEpisode.episodeTitle}</h1>

        <button onClick={() => handleFavClick(currentEpisode)}>
          <img
            className="h-8"
            src={isFavorite(currentEpisode) ? favoritedIcon : unFavoritedIcon}
            alt="cartoon heart icon"
          />
        </button>
      </div>
    </div>
  );
}
