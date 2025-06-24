import { router } from "./router";
import { RouterProvider } from "@tanstack/solid-router";

import "./app.css";
import { createUser } from "./client";

createUser({
  body: {}
})

export default function App() {
  return <RouterProvider router={router} />;
}
