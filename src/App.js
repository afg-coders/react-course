import React from "react";
import { Container, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoPage from "./pages/todo.page";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import PostDetail from "./pages/posts/detail.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoPage />,
  },
  {
    path: "todo",
    element: <div>Todo Page</div>,
  },
  {
    path: "post/:post_id",
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
