import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/home/Home";
import AuthenticationLayout from "../layouts/AuthenticationLayout";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoute from "../private/PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      }, 
      {path:'/coverage', Component:Coverage},
      {path:'/send-parcel',element:<PrivateRoute><SendParcel></SendParcel></PrivateRoute>}
    ],
  },

  {
    path:'/', Component:AuthenticationLayout , children:[

      {path:'login', Component:Login},
      {path:'register',Component:Register}
    ]
  }
]);
