import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from './router/router';
import { BrowserRouter } from 'react-router-dom';
import { useThemeStore } from './store/theme.store';

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
          <Router />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
