import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Week from "./Pages/Week";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/week" element={<Week />} />
    </Routes>
  );
};

export default AllRoutes;
