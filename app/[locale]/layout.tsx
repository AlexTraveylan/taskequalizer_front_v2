import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { getCurrentLocale } from "@/locales/server"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Provider } from "./provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Task Equalizer",
  description: "Task Equalizer is a task management application for families.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = getCurrentLocale()

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Provider locale={locale}>
          <Header />
        </Provider>
        <div className="container mx-auto py-8">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
