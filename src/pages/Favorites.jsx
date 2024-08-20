import { Link } from "react-router-dom";

import useFavoritesStore from "../zustand/FavoritesStore";

import backArrowURl from "../assets/navigation-back-arrow-svgrepo-com.svg";
import playButton from "../assets/play-button-svgrepo-com.svg";
import favoritedIcon from "../assets/favorite-filled-svgrepo-com.svg";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavoritesStore();

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

  function mergeSeasonsInArray(arr) {
    const mergedMap = new Map();

    arr.forEach((podcast) => {
      if (mergedMap.has(podcast.podcastId)) {
        const existingPodcast = mergedMap.get(podcast.podcastId);

        podcast.seasons.forEach((season) => {
          const existingSeason = existingPodcast.seasons.find(
            (s) => s.season === season.season
          );

          if (existingSeason) {
            existingSeason.episodes = [
              ...existingSeason.episodes,
              ...season.episodes,
            ];
          } else {
            existingPodcast.seasons.push(season);
          }
        });
      } else {
        mergedMap.set(podcast.podcastId, JSON.parse(JSON.stringify(podcast)));
      }
    });

    return Array.from(mergedMap.values());
  }

  const favoritesMerged = mergeSeasonsInArray(favorites);

  const favoriteElement = favoritesMerged.map((favorite) => (
    <div key={favorite.podcastId} className="flex flex-col">
      <h4 className="font-bold text-accent">{favorite.podcastTitle}</h4>
      {favorite.seasons?.map((season) => {
        return (
          <div key={favorite.podcastId + season.season}>
            <h5 className="text-light-grey">Season: {season.season}</h5>{" "}
            {season.episodes?.map((episode) => (
              <div
                key={favorite.podcastId + season.season + episode}
                className="flex justify-between"
              >
                <img className="h-4" src={playButton} alt="" />
                <h4 className="text-white">{episode.title}</h4>

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

  return (
    <div className="bg-grey rounded-xl p-4 my-3 mx-4 mb-16">
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

      <div className="flex flex-col gap-2 mb-4">
        {favorites.length ? (
          favoriteElement
        ) : (
          <h1 className="self-center text-2xl text-accent">Nothing here...</h1>
        )}
      </div>
    </div>
  );
}
