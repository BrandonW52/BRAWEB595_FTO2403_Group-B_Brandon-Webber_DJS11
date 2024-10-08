// Basic header

import { Link } from "react-router-dom";

import logoSVG from "../../assets/podcast-logo.svg";

export default function Header() {
  return (
    <header className="bg-grey p-4">
      {/* Logo links back to home page */}
      <Link to="/">
        <div className="flex content-center gap-4">
          <img src={logoSVG} alt="Pod cast logo" className="h-8" />
          <h1 className="text-2xl text-white">PodCast</h1>
        </div>
      </Link>
    </header>
  );
}
