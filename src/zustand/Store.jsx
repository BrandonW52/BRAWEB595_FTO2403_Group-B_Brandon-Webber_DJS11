import { create } from "zustand";

const usePodcastStore = create((set) => ({
  podcasts: JSON.parse(localStorage.getItem("podcasts")) || null,
  error: null,

  fetchAllPodcasts: async () => {
    try {
      let allPodcasts = JSON.parse(localStorage.getItem("podcasts"));

      if (!allPodcasts) {
        const response = await fetch("https://podcast-api.netlify.app");
        allPodcasts = await response.json();

        allPodcasts = allPodcasts.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        localStorage.setItem("podcasts", JSON.stringify(allPodcasts));
        set({ podcasts: allPodcasts, error: null });
      }
    } catch (error) {
      set({ podcasts: null, error });
      console.log("error fetcing podcasts", error);
    }
  },

  fetchSinglePodcast: async (podcastId) => {
    try {
      // Calls Podcast show api
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${podcastId}`
      );

      const singlePodcast = await response.json();

      return singlePodcast;
    } catch (error) {
      console.error("error fetching product: ", error);
      set({ error });
      return null;
    }
  },
}));

export default usePodcastStore;
