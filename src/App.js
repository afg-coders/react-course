import React from "react";
import { Container, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoPage from "./pages/todo.page";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoPage />,
  },
  {
    path: "todo",
    element: <div>Todo Page</div>,
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Container size={"xl"}>
            <TodoPage />
          </Container>
        </MantineProvider>
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
