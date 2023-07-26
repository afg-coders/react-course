import React from "react";
import { Container, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoPage from "./pages/todo.page";

const queryClient = new QueryClient();
function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <Container size={"xl"}>
          <TodoPage />
        </Container>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
