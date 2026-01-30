// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp";

import "./main.css";

const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

function handleSubmit(person) {
  console.log("New row:", person);
}
// Initial render:
root.render(<MyApp handleSubmit={handleSubmit}/>);

