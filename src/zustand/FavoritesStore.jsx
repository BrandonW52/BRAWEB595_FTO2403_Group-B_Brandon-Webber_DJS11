import { create } from "zustand";

const useFavoritesStore = create((set) => ({
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],

  toggleFavorite: (episodeObject) => {
    set((state) => {
      const favorites = [...state.favorites];

      const existingIndex = favorites.findIndex((favorite) => {
        return (
          favorite.podcastId === episodeObject.podcastId &&
          favorite.season === episodeObject.season &&
          favorite.episode === episodeObject.episode
        );
      });

      if (existingIndex >= 0) {
        favorites.splice(existingIndex, 1);
      } else {
        favorites.push(episodeObject);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));

      return { favorites };
    });
  },
}));

export default useFavoritesStore;
