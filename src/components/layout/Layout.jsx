// Declares the layout for the site
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Player";

export default function Layout() {
  return (
    <div className="min-h-screen lg:w-screen">
      <Header />

      <main className="lg:w-4/5 lg:mx-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
