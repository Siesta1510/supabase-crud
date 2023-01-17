import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import LoadUserProvider from "./context/LoadUserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoadUserProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </LoadUserProvider>
);
