"use client"

import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from "@heroui/toast";
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

import { useEffect } from "react";
import { Socket } from "@/lib/socket-io";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (Socket.disconnected) {
      Socket.connect();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <ToastProvider placement="bottom-center" />
        {children}
      </HeroUIProvider>
    </QueryClientProvider>
  )
}