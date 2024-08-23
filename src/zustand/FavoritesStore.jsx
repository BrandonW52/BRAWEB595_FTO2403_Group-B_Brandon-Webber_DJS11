// A zustand store for handling favorites array

// imports zustand function for creating store
import { create } from "zustand";

// Declares favorite store
const useFavoritesStore = create((set) => ({
  // Fetches favorites from local storage
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],

  // Function to toggle favorites by checking if it exists
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

      // Handles favorite change by adding or removing favorited episode
      if (existingIndex >= 0) {
        favorites.splice(existingIndex, 1);
      } else {
        favorites.push(episodeObject);
      }

      // Stores favorites to local storage
      localStorage.setItem("favorites", JSON.stringify(favorites));

      return { favorites };
    });
  },
}));

export default useFavoritesStore;
