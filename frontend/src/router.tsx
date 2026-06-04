import { RootLayout } from "@/components/layout/root-layout";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { PostDetail } from "@/pages/PostDetail";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
