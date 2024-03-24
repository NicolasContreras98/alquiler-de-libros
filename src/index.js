import React from "react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

const root = document.getElementById("root"); // Obtén el elemento root

// Utiliza createRoot en lugar de ReactDOM.render
const reactRoot = createRoot(root);

reactRoot.render(
  <Router>
    <App />
  </Router>
);
