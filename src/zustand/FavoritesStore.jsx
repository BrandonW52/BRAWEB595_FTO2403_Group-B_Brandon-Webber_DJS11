import { create } from "zustand";

const useFavoritesStore = create((set) => ({
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],

  toggleFavorite: (episode) => {
    set((state) => {
      const favorites = [...state.favorites];

      const existingIndex = favorites.findIndex(
        (favorite) => favorite.title == episode.title
      );

      if (existingIndex >= 0) {
        favorites.splice(existingIndex, 1);
      } else {
        favorites.push(episode);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));

      return { favorites };
    });
  },
}));

export default useFavoritesStore;
