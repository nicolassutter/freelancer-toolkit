import { router } from "./router";
import { RouterProvider } from "@tanstack/solid-router";
import "./app.css";
import { QueryClientProvider } from "@tanstack/solid-query";
import { queryClient } from "./utils/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
