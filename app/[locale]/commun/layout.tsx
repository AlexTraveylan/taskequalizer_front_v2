"use client"

import { LanguagePossibles } from "@/lib/app-types"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "../provider"

const queryClient = new QueryClient()

export default function CommunLayout({ params: { locale }, children }: { params: { locale: LanguagePossibles }; children: React.ReactNode }) {
  return (
    <Provider locale={locale}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  )
}
