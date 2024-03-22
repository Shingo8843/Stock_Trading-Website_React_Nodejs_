import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Container } from "react-bootstrap";
import Search from "./Search/Search";
import Watchlist from "./Watchlist/Watchlist";
import Portfolio from "./Portfolio/Portfolio";

function MainContent() {
  const router = createBrowserRouter([
    { path: "/search", element: <Search /> },
    { path: "/watchlist", element: <Watchlist /> },
    { path: "/portfolio", element: <Portfolio /> },
  ]);
  return <RouterProvider router={router} />;
}

export default MainContent;
