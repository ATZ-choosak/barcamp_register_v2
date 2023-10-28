import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormPage from "./Pages/FormPage.jsx";
import getUser from "./loader/getUser.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      let user = await getUser();
      if (user.infomation) {
        window.open("/form", "_self");
      }

      return user;
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
