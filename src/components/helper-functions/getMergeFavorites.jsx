export default function getMergeFavorites(arr) {
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

// function mergeSeasonsInArray(arr) {
//   const mergedMap = new Map();

//   arr.forEach((podcast) => {
//     if (mergedMap.has(podcast.podcastId)) {
//       const existingPodcast = mergedMap.get(podcast.podcastId);

//       podcast.seasons.forEach((season) => {
//         const existingSeason = existingPodcast.seasons.find(
//           (s) => s.season === season.season
//         );

//         if (existingSeason) {
//           existingSeason.episodes = [
//             ...existingSeason.episodes,
//             ...season.episodes,
//           ];
//         } else {
//           existingPodcast.seasons.push(season);
//         }
//       });
//     } else {
//       mergedMap.set(podcast.podcastId, JSON.parse(JSON.stringify(podcast)));
//     }
//   });

//   return Array.from(mergedMap.values());
// }
