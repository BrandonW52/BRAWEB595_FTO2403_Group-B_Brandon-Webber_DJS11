// A zustand store for handling podcasts api calls

// imports zustand function for creating store
import { create } from "zustand";

// Declares favorite store
const usePodcastStore = create((set) => ({
  // Fetches podcast from local storage
  podcasts: JSON.parse(localStorage.getItem("podcasts")) || null,
  // Sets initail data for error
  error: null,
  // Sets initail data for loading
  loading: false,

  // Function to get all podcasts
  // Podcasts are stored in local storage for a better user experience
  // In a real deployment a check would be setup to check if the DB has been changed
  fetchAllPodcasts: async () => {
    set({ loading: true });
    try {
      // Gets podcast array from local storage
      let allPodcasts = JSON.parse(localStorage.getItem("podcasts"));

      // If the local storage is empty it calls the podcast api
      if (!allPodcasts) {
        // Calls Podcast api
        const response = await fetch("https://podcast-api.netlify.app");
        allPodcasts = await response.json();

        // Sorts podcasts alphabetically
        allPodcasts = allPodcasts.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        // Defines genres based off key values
        // P.S. I know this is a bad way of doing it but I was running out of time
        const genreKeys = {
          1: "Personal Growth",
          2: "Investigative Journalism",
          3: "History",
          4: "Comedy",
          5: "Entertainment",
          6: "Business",
          7: "Fiction",
          8: "News",
          9: "Kids and Family",
        };

        // Maps over allPodcasts to replace the number genre with human readable text
        allPodcasts = allPodcasts.map((podcast) => {
          const mappedGenres = podcast.genres.map((genre) => genreKeys[genre]);

          return { ...podcast, genres: mappedGenres };
        });

        // Sets podacsts to local storage
        localStorage.setItem("podcasts", JSON.stringify(allPodcasts));
        set({ podcasts: allPodcasts, error: null });
      }
    } catch (error) {
      // Sets error
      set({ podcasts: null, error });
    }

    set({ loading: false });
  },

  // Function to get a single podcasts
  fetchSinglePodcast: async (podcastId) => {
    set({ loading: true });
    try {
      // Calls Podcast show api with passed in id
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${podcastId}`
      );

      const singlePodcast = await response.json();

      set({ loading: false });

      // Retuns the fetched sigle podcast
      return singlePodcast;
    } catch (error) {
      // Sets error
      set({ error, loading: false });
      return null;
    }
  },
}));

export default usePodcastStore;
