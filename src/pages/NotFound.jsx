import { Link } from "react-router-dom";

import backArrowIcon from "../assets/navigation-back-arrow-svgrepo-com.svg";

export default function NotFound() {
  return (
    <div className=" bg-grey rounded-xl p-4 my-16 mx-4">
      <h1 className="text-error text-5xl">404</h1>
      <p className="text-white">You have ventured too far...</p>
      <Link to="/" className="flex items-center content-center gap-2 py-12">
        <img
          className="rounded-full p-1 h-8 bg-accent"
          src={backArrowIcon}
          alt=""
        />
        <h1 className="text-white">Back to Podcasts</h1>
      </Link>
    </div>
  );
}
