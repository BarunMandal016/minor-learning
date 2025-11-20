'use client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import React from 'react'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      gcTime: 60 * 1000,
    },
  },
})

export default function TanStackQueryClientProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
