import type { Metadata } from "next"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "@/styles/globals.css"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "ClearNest - Family Organisation App",
  description: "Keep your family organised with streaks, shopping lists, inventory tracking, reminders, and more.",
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-950 flex flex-col min-h-screen">
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  )
}
