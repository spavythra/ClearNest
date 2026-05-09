"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/types"
import { LogOut, Menu } from "lucide-react"
import { useState } from "react"
import { signOut } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface NavbarProps {
  user?: User | null
}

export function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              🏠 ClearNest
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                <Link href="/streaks">
                  <Button variant="ghost">Streaks</Button>
                </Link>
                <Link href="/shopping">
                  <Button variant="ghost">Shopping</Button>
                </Link>
                <Link href="/inventory">
                  <Button variant="ghost">Inventory</Button>
                </Link>
                <Link href="/reminders">
                  <Button variant="ghost">Reminders</Button>
                </Link>
                <Link href="/roadmap">
                  <Button variant="ghost">Roadmap</Button>
                </Link>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="hidden sm:block text-sm text-slate-600 dark:text-slate-400">
                  {user.email}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && user && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800">
          <div className="px-4 py-2 space-y-1">
            <Link href="/streaks">
              <Button variant="ghost" className="w-full justify-start">
                Streaks
              </Button>
            </Link>
            <Link href="/shopping">
              <Button variant="ghost" className="w-full justify-start">
                Shopping
              </Button>
            </Link>
            <Link href="/inventory">
              <Button variant="ghost" className="w-full justify-start">
                Inventory
              </Button>
            </Link>
            <Link href="/reminders">
              <Button variant="ghost" className="w-full justify-start">
                Reminders
              </Button>
            </Link>
            <Link href="/roadmap">
              <Button variant="ghost" className="w-full justify-start">
                Roadmap
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
