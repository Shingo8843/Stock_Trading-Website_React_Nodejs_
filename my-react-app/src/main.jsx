import React from "react";
import ReactDOM from "react-dom";
import { SearchProvider } from "./SearchContext";
import App from "./App";

ReactDOM.render(
  <SearchProvider>
    <App />
  </SearchProvider>,
  document.getElementById("root")
);
