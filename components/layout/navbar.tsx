"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/types"
import { LogOut, Menu, X, Settings, Home, Flame, ShoppingCart, Package, Bell, Map, UtensilsCrossed } from "lucide-react"
import { useState, useEffect } from "react"
import { signOut } from "@/lib/supabase"
import { useRouter, usePathname } from "next/navigation"

interface NavbarProps {
  user?: User | null
}

const navLinks = [
  { href: "/streaks", label: "Streaks", icon: Flame },
  { href: "/shopping", label: "Shopping", icon: ShoppingCart },
  { href: "/food", label: "Food Menu", icon: UtensilsCrossed },
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
    <nav className="sticky top-0 z-50 w-full border-b border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-950/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: "var(--brand)" }}>
              CN
            </div>
            <span className="font-bold text-stone-900 dark:text-stone-50 text-lg">ClearNest</span>
          </Link>

          {/* Desktop Nav Links */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={pathname === href
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"}
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
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                    Guest
                  </span>
                )}
                <Link href="/settings">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ background: "linear-gradient(135deg, var(--brand), #52a47b)" }}
                    title={user?.email ?? "Guest"}
                  >
                    {initials}
                  </div>
                </Link>
                <Link href="/settings">
                  <Button size="sm" variant="ghost" className="hidden lg:flex items-center gap-1 text-stone-500">
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
                  <Button variant="ghost" size="sm" className="text-stone-600">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="btn-brand">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
          <div className="px-4 py-3 space-y-1">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-2 text-stone-600">
                <Home className="w-4 h-4" /> Dashboard
              </Button>
            </Link>
            {isAuthenticated && navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setIsOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-2 ${pathname === href
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20"
                    : "text-stone-600"}`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              </Link>
            ))}
            {isAuthenticated && (
              <Link href="/settings" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2 text-stone-600">
                  <Settings className="w-4 h-4" /> Settings
                </Button>
              </Link>
            )}
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
              {isAuthenticated ? (
                <>
                  {isGuest && (
                    <p className="text-xs text-stone-500 px-3 py-2 font-medium">
                      Guest mode — data not saved
                    </p>
                  )}
                  {user?.email && (
                    <p className="text-xs text-stone-500 px-3 py-2">{user.email}</p>
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
                    <Button variant="ghost" className="w-full justify-start text-stone-600">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full btn-brand mt-1">Get Started</Button>
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
