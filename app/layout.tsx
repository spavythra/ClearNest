import type { Metadata } from "next"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "ClearNest - Family Maintenance App",
  description: "Manage family tasks, streaks, shopping lists, and inventory",
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
      <body className="bg-slate-50 dark:bg-slate-950">
        {children}
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  )
}
