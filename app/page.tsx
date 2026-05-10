"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Card } from "@/components/ui/card"
import {
  Flame,
  ShoppingCart,
  Package,
  Bell,
  Map,
  Plus,
  LogOut,
} from "lucide-react"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [isGuest, setIsGuest] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const guestMode = typeof window !== 'undefined' && localStorage.getItem('guest_mode') === 'true'
    setIsGuest(guestMode)
    // TODO: Implement authentication check
    setUser(null)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!user && !isGuest) {
    return (
      <div className="min-h-screen scenic-overlay bg-gradient-marble flex items-center justify-center p-4">
        <div className="decoration-top-right" />
        <div className="decoration-bottom-left" />

        <div className="w-full max-w-md relative z-10">
          <div className="card-luxe p-8 md:p-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
              ClearNest
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              Keep your family organized with streaks, shopping lists, inventory tracking, and more.
            </p>

            <div className="divider-gold mb-8" />

            <div className="space-y-3">
              <Link href="/auth/login">
                <Button className="w-full btn-golden py-3 text-lg">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" className="w-full py-3 text-lg border-orange-300 text-orange-600 hover:bg-orange-50">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar user={user || { email: 'Guest User' }} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gradient-gold mb-2">
              Welcome, {isGuest ? 'Guest' : user?.email}
            </h1>
            {isGuest && (
              <p className="text-slate-600 dark:text-slate-400">You're browsing in guest mode. <Link href="/auth/login" className="text-orange-600 hover:text-orange-700 font-semibold">Sign in</Link> to save your data.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Streaks Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-orange-100 dark:border-orange-900/30">
              <div className="flex items-start justify-between mb-4">
                <Flame className="w-6 h-6 text-orange-500" />
                <Link href="/streaks">
                  <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Streaks</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Track your daily habits and maintain streaks
              </p>
              <Link href="/streaks">
                <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                  View Streaks
                </Button>
              </Link>
            </Card>

            {/* Shopping List Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-orange-100 dark:border-orange-900/30">
              <div className="flex items-start justify-between mb-4">
                <ShoppingCart className="w-6 h-6 text-orange-500" />
                <Link href="/shopping">
                  <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Shopping List</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Manage your family's shopping needs
              </p>
              <Link href="/shopping">
                <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                  View Shopping List
                </Button>
              </Link>
            </Card>

            {/* Inventory Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <Package className="w-6 h-6 text-green-500" />
                <Link href="/inventory">
                  <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Inventory</h2>
              <p className="text-slate-600 text-sm mb-4">
                Track household items and supplies
              </p>
              <Link href="/inventory">
                <Button variant="outline" className="w-full">
                  View Inventory
                </Button>
              </Link>
            </Card>

            {/* Reminders Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <Bell className="w-6 h-6 text-purple-500" />
                <Link href="/reminders">
                  <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Reminders</h2>
              <p className="text-slate-600 text-sm mb-4">
                Set reminders for important tasks
              </p>
              <Link href="/reminders">
                <Button variant="outline" className="w-full">
                  View Reminders
                </Button>
              </Link>
            </Card>

            {/* Roadmap Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <Map className="w-6 h-6 text-indigo-500" />
                <Link href="/roadmap">
                  <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Roadmap</h2>
              <p className="text-slate-600 text-sm mb-4">
                Plan family projects and milestones
              </p>
              <Link href="/roadmap">
                <Button variant="outline" className="w-full">
                  View Roadmap
                </Button>
              </Link>
            </Card>

            {/* Settings Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <LogOut className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Settings</h2>
              <p className="text-slate-600 text-sm mb-4">
                Manage your family and preferences
              </p>
              <Link href="/settings">
                <Button variant="outline" className="w-full">
                  Go to Settings
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
