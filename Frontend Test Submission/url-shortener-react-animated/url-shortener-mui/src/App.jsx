import React from "react";
import { Routes, Route } from "react-router-dom";
import UrlForm from "./components/UrlForm";
import Redirector from "./components/Redirector";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UrlForm />} />
      <Route path="/:shortcode" element={<Redirector />} />
    </Routes>
  );
}

export default App;