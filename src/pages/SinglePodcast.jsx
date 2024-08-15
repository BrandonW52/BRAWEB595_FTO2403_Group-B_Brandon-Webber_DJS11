import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import usePodcastStore from "../zustand/Store";

import imgURl from "../assets/navigation-back-arrow-svgrepo-com.svg";

export default function SinglePodcast() {
  const { podcastId } = useParams();

  const { fetchSinglePodcast } = usePodcastStore();

  const [podcast, setPodcast] = useState(null);
  const [showMore, SetShowMore] = useState(false);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const result = await fetchSinglePodcast(podcastId);
        setPodcast(result);
      } catch (error) {
        console.log("error fetching", error);
      }
    };

    fetchPodcast();
  }, [podcastId, fetchSinglePodcast]);

  console.log(podcast);

  const seasonsElement = podcast?.seasons.map((season) => {
    return (
      <div key={season.season} className="flex gap-2">
        <img className="h-12 rounded-lg" src={season.image} alt="" />
        <h1 className="my-auto text-white">{season.title}</h1>
      </div>
    );
  });

  return (
    <>
      {/* Top card for displaying podcast info */}
      <div className="bg-grey rounded-xl p-4 my-3 mx-4">
        <Link to={`..`} relative="path">
          <div className="flex content-center gap-2 mb-3">
            <img
              className="rounded-full p-1 h-8 bg-accent"
              src={imgURl}
              alt=""
            />
            <h1 className="text-white">Back to Podcasts</h1>
          </div>
        </Link>

        <div className="flex gap-2 mb-4">
          <img className="rounded-lg h-32" src={podcast?.image} alt="" />
          <div className="flex flex-col justify-between">
            <h1 className="text-white font-bold text-xl">{podcast?.title}</h1>
            <h4 className="text-white">Genres: {podcast?.genres}</h4>
            <h4 className="text-white">Seasons: {podcast?.seasons.length}</h4>
          </div>
        </div>
        <p className="mt-auto text-white text-sm">
          Last Upload: {podcast?.updated.substring(0, 10)}
        </p>

        <p className="text-white">
          {showMore
            ? podcast?.description
            : `${podcast?.description.substring(0, 150)}...`}
          <button
            className="ml-4 text-accent"
            onClick={() => SetShowMore(!showMore)}
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        </p>

        <hr className="text-white m-2 "></hr>
      </div>

      {/* Card containg seasons/episodes */}
      <div className="bg-grey rounded-xl p-4 my-3 mx-4">
        <h2 className="text-accent font-bold text-lg">Seasons</h2>

        <div className="grid grid-cols-1 gap-4">{seasonsElement}</div>
      </div>
    </>
  );
}
