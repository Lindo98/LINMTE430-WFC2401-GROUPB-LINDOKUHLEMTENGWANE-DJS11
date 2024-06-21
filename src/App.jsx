import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import MusicPlayer from "./Components/MusicPlayer";
import Layout from "./Components/layout";
import Favorites from "./Pages/Favorites";
import Seasons from "./Pages/Seasons";
import Episodes from "./Pages/Episodes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path=":id" element={<Seasons />}>
            <Route path="episodes" element={<Episodes />} />
          </Route>
          <Route path="player" element={<MusicPlayer />} />
        </Route>
        <Route path="favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
