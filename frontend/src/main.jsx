import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormPage from "./Pages/FormPage.jsx";
import getUser from "./loader/getUser.js";
import getConsole from "./loader/getConsole.js";
import Profile from "./Pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      let user = await getUser();
      let Console = await getConsole();
      
      if (user.infomation) {
        if (user.user.firstName) {
          window.open("/profile", "_self");
        } else {
          window.open("/form", "_self");
        }
      }

      return Console;
    },
  },
  {
    path: "/form",
    element: <FormPage />,
    loader: async () => {
      let user = await getUser();
      if (!user.infomation) {
        window.open("/", "_self");
      }

      return user;
    },
  },
  {
    path: "/profile",
    element: <Profile />,
    loader: async () => {
      let user = await getUser();
      if (!user.infomation) {
        window.open("/", "_self");
      }

      if (!user.user.firstName) {
        window.open("/form", "_self");
      }

      return user;
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <div className="w-full h-screen bg-secondary-500 fixed left-0 top-0 -z-10" />
  </React.StrictMode>
);
