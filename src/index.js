import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Store, StoreProvider } from "./Store";

import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider value={Store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StoreProvider>
);
