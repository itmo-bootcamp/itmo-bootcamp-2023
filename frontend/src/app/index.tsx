import React from 'react';
import { QueryClient,QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';

import RouterPage from 'pages/RouterPage';

const queryClient = new QueryClient();

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
