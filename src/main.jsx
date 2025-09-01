import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./router/router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-urbanist">
      <RouterProvider router={router}></RouterProvider>
    </div>
  </StrictMode>
);
