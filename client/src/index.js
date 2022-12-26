import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Contex from "./store/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Contex>
    <App />
  </Contex>
  // </React.StrictMode>
);
