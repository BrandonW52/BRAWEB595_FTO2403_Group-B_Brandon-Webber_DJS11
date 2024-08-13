// Basic header

import { Link } from "react-router-dom";

import logoImage from "../../assets/podcast-logo.svg";

export default function Header() {
  return (
    <header className="w-full bg-grey p-4">
      <Link to="/">
        <div className="flex content-center gap-4">
          <img src={logoImage} alt="Pod cast logo" className="h-8" />
          <h1 className="text-2xl text-white">PodCast</h1>
        </div>
      </Link>
    </header>
  );
}
