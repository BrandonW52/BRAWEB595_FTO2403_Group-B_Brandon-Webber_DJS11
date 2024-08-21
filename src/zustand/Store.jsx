import { create } from "zustand";

const usePodcastStore = create((set) => ({
  podcasts: JSON.parse(localStorage.getItem("podcasts")) || null,
  error: null,
  loading: false,

  fetchAllPodcasts: async () => {
    set({ loading: true });
    try {
      let allPodcasts = JSON.parse(localStorage.getItem("podcasts"));

      if (!allPodcasts) {
        const response = await fetch("https://podcast-api.netlify.app");
        allPodcasts = await response.json();

        allPodcasts = allPodcasts.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

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

        allPodcasts = allPodcasts.map((podcast) => {
          const mappedGenres = podcast.genres.map((genre) => genreKeys[genre]);

          return { ...podcast, genres: mappedGenres };
        });

        localStorage.setItem("podcasts", JSON.stringify(allPodcasts));
        set({ podcasts: allPodcasts, error: null });
      }
    } catch (error) {
      set({ podcasts: null, error });
    }

    set({ loading: false });
  },

  fetchSinglePodcast: async (podcastId) => {
    set({ loading: true });
    try {
      // Calls Podcast show api
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${podcastId}`
      );

      const singlePodcast = await response.json();

      set({ loading: false });

      return singlePodcast;
    } catch (error) {
      set({ error, loading: false });
      return null;
    }
  },
}));

export default usePodcastStore;
