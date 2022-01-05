import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();
test('renders learn react link', () => {
  render(<QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>);
});
