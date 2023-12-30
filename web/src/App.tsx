import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Reader from "./pages/Reader";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dash from "./pages/Dash";
import axios from "axios";
import { ResponseType } from "./types/global";
import { setAccessToken } from "./accessToken";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dash />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reader",
    element: <Reader />,
  },
]);

const App: React.FC = () => {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
