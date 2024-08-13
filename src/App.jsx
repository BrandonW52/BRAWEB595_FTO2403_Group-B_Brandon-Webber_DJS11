import { React } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Layout from "./components/layout/Layout";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{
  /* <>
      <h1 className="text-red-500 text-3xl font-bold underline">
        Hello world!
      </h1>
    </> */
}
