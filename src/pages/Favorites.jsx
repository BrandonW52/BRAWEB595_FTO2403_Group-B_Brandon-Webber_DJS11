import { Link } from "react-router-dom";

import useFavoritesStore from "../zustand/FavoritesStore";

import backArrowURl from "../assets/navigation-back-arrow-svgrepo-com.svg";
import playButton from "../assets/play-button-svgrepo-com.svg";
import favoritedIcon from "../assets/favorite-filled-svgrepo-com.svg";
import unFavoritedIcon from "../assets/favorite-svgrepo-com.svg";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavoritesStore();

  const isFavorite = (episodeTitle) => {
    return favorites.some((favorite) => favorite.title == episodeTitle);
  };

  const handleFavClick = (episode) => {
    toggleFavorite(episode);
  };

  const favoriteElement = favorites.map((episode, index) => (
    <div key={index} className="flex justify-between">
      <img className="h-4" src={playButton} alt="" />
      <h4 className="text-white">{episode.title}</h4>

      <button onClick={() => handleFavClick(episode)}>
        <img
          className="h-4"
          src={isFavorite(episode.title) ? favoritedIcon : unFavoritedIcon}
          alt=""
        />
      </button>
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
