'use client';

import type React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const makeQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } });

let browserQueryClient: QueryClient | undefined;

export const getQueryCLient = () => {
  // Server: always make a new query client
  if (typeof window === 'undefined') {
    return makeQueryClient();
  }

  // Browser: make a new query client if we don't already have one
  // This is very important so we don't re-make a new client if React
  // supsends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
};

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const queryClient = getQueryCLient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Providers;
