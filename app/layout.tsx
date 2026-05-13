import "./globals.css"
import { Header } from "./componentes/header"
import { Footer } from "./componentes/footer"
import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">

        <Header />

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Toaster richColors position="top-right" />
          {children}
        </main>

        <Footer />

      </body>
    </html>
  )
}