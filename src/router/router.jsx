import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/home/Home";
import AuthenticationLayout from "../layouts/AuthenticationLayout";
import Login from "../pages/authentication/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },

  {
    path:'/', Component:AuthenticationLayout , children:[

      {path:'login', Component:Login}
    ]
  }
]);
