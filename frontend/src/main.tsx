import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./pages/Home.tsx";
import Explore from "./pages/Explore.tsx";
import Results from "./pages/Results.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/navigatecity">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  </BrowserRouter>
);
