"use client"

import { HeroUIProvider } from '@heroui/react'
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient} >
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </QueryClientProvider>
  )
}