import React from 'react';
import { QueryClient,QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import { worker } from 'mocks/api/browser';

import RouterPage from 'pages/RouterPage';

const queryClient = new QueryClient();

// Start the mocking conditionally.
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={{
        fontFamily: 'Open Sans',
        colorScheme: 'dark',
      }}>
        <RouterPage />
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
