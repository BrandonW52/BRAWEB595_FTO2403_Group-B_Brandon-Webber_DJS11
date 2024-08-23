// A zustand store for handling favorites array

// imports zustand function for creating store
import { create } from "zustand";

// Declares favorite store
const useCurrentlyPlayingStore = create((set) => ({
  // Fetches favorites from local storage
  currentEpisode: JSON.parse(localStorage.getItem("playing")) || [],

  // Function to toggle favorites by checking if it exists
  togglePlaying: (episodeObject) => {
    set({ currentEpisode: episodeObject });

    localStorage.setItem("playing", JSON.stringify(episodeObject));
  },
}));

export default useCurrentlyPlayingStore;
