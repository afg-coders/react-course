import React from 'react';
import { Container, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from './router/router';
import { useThemeStore } from './store/theme.store';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();
function App() {
  const { theme } = useThemeStore();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: theme, loader: 'dots' }}
      >
        <BrowserRouter>
          <Container size={'xl'}>
            <Router />
          </Container>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
