import { create } from "zustand";

const useFavoritesStore = create((set) => ({
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],

  toggleFavorite: (episodeObject) => {
    set((state) => {
      const favorites = [...state.favorites];

      const existingIndex = favorites.findIndex((favorite) => {
        return (
          favorite.podcastId === episodeObject.podcastId &&
          favorite.seasons.some((season) => {
            return (
              season.season === episodeObject.seasons[0].season &&
              season.episodes.some(
                (ep) =>
                  ep.episode === episodeObject.seasons[0].episodes[0].episode
              )
            );
          })
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

// Rewrite so it looks something like this
// object = {
//     podcastId: 123,
//     season: 2,
//     episode: {
//         title: "episode 1",
//         description: "ep 1 desc",
//         episode: 1,
//         file: "#"
//     }
// }

// then check all to see if it exists
// Add time stamp when added
