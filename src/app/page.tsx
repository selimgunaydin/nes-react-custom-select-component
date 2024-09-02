"use client";

import HomeView from "@/views/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <main className="container mx-auto">
      <QueryClientProvider client={queryClient}>
        <HomeView />
      </QueryClientProvider>
    </main>
  );
}
