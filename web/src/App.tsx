import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Reader from "./pages/Reader";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dash from "./pages/Dash";
import Add from "./pages/Add";
import { UserProvider } from "./context/User";
import { Toaster } from "./components/ui/sonner";

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
    path: "/add",
    element: <Add />,
  },
  {
    path: "/reader/:bookId",
    element: <Reader />,
  },
]);

const App: React.FC = () => {
  return (
    <UserProvider>
      <Toaster />
      <div className="relative transition-colors duration-500 w-[100vw] min-h-[100vh] h-[100%] dark:bg-theme-dark-bg bg-theme-light-bg text-black dark:text-white">
        <RouterProvider router={router} />
      </div>
    </UserProvider>
  );
};

export default App;
