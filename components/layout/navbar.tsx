"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/types"
import { LogOut, Menu, X, Settings, Home, Flame, ShoppingCart, Package, Bell, Map } from "lucide-react"
import { useState, useEffect } from "react"
import { signOut } from "@/lib/supabase"
import { useRouter, usePathname } from "next/navigation"

interface NavbarProps {
  user?: User | null
}

const navLinks = [
  { href: "/streaks", label: "Streaks", icon: Flame },
  { href: "/shopping", label: "Shopping", icon: ShoppingCart },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/reminders", label: "Reminders", icon: Bell },
  { href: "/roadmap", label: "Roadmap", icon: Map },
]

export function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setIsGuest(typeof window !== "undefined" && localStorage.getItem("guest_mode") === "true")
  }, [])

  const handleSignOut = async () => {
    setIsOpen(false)
    if (isGuest) {
      localStorage.removeItem("guest_mode")
      router.push("/")
    } else {
      await signOut()
      router.push("/")
    }
  }

  const isAuthenticated = !!user || isGuest

  const initials = user?.email
    ? user.email.split(/[@.\s]/).filter(Boolean).slice(0, 2).map((s) => s[0].toUpperCase()).join("")
    : "G"

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <div className="text-xl font-bold text-slate-900 dark:text-slate-50">
              🏠 ClearNest
            </div>
          </Link>

          {/* Desktop Nav Links */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={pathname === href ? "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" : ""}
                  >
                    {label}
                  </Button>
                </Link>
              ))}
            </div>
          )}

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {isGuest && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                    Guest
                  </span>
                )}
                {/* Avatar */}
                <Link href="/settings">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:opacity-90 transition-opacity" title={user?.email ?? "Guest"}>
                    {initials}
                  </div>
                </Link>
                <Link href="/settings">
                  <Button size="sm" variant="ghost" className="hidden lg:flex items-center gap-1">
                    <Settings className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSignOut}
                  className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 flex items-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="btn-golden">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="px-4 py-3 space-y-1">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Home className="w-4 h-4" /> Dashboard
              </Button>
            </Link>
            {isAuthenticated && navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setIsOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-2 ${pathname === href ? "bg-orange-50 text-orange-600 dark:bg-orange-900/20" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              </Link>
            ))}
            {isAuthenticated && (
              <Link href="/settings" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings className="w-4 h-4" /> Settings
                </Button>
              </Link>
            )}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              {isAuthenticated ? (
                <>
                  {isGuest && (
                    <p className="text-xs text-yellow-700 dark:text-yellow-400 px-3 py-2 font-medium">
                      Guest mode — data not saved
                    </p>
                  )}
                  {user?.email && (
                    <p className="text-xs text-slate-500 px-3 py-2">{user.email}</p>
                  )}
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4" />
                    {isGuest ? "Exit Guest Mode" : "Sign Out"}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full btn-golden mt-1">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
