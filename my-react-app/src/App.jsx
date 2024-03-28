// MainContent.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./Footer";
import Search from "./Search/Search";
import Watchlist from "./Watchlist/Watchlist";
import Portfolio from "./Portfolio/Portfolio";
function MainContent() {
  const router = createBrowserRouter([
    { path: "/search", element: <Search /> },
    { path: "/search/:ticker", element: <Search /> },
    { path: "/watchlist", element: <Watchlist /> },
    { path: "/portfolio", element: <Portfolio /> },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Footer />
    </>
  );
}

export default MainContent;
