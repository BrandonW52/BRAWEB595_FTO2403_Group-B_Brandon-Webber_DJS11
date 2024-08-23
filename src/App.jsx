import { React } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllPodcasts from "./pages/AllPodcasts";
import SinglePodcast from "./pages/SinglePodcast";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

import Layout from "./components/layout/Layout";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AllPodcasts />} />
          <Route path="/:podcastId" element={<SinglePodcast />} />
          <Route path="/favorites" element={<Favorites />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
