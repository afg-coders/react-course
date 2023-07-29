import React from "react";
import { Container, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostDetail from "./pages/posts/detail.page";
import PostsPage from "./pages/post.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PostsPage />,
  },
  {
    path: "todo",
    element: <div>Todo Page</div>,
  },
  {
    path: "post/:id",
    element: <PostDetail />,
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Container size={"xl"}>
          <RouterProvider router={router} />
        </Container>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
