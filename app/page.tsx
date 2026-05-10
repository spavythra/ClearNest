"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Card } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { User } from "@/lib/types"
import {
  Flame,
  ShoppingCart,
  Package,
  Bell,
  Map,
  Plus,
  Settings,
} from "lucide-react"

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [isGuest, setIsGuest] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const guestMode = typeof window !== 'undefined' && localStorage.getItem('guest_mode') === 'true'
    setIsGuest(guestMode)

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? '',
          created_at: data.user.created_at,
        })
      }
      setLoading(false)
    })
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
      <div className="min-h-screen scenic-overlay bg-gradient-marble">
        <div className="decoration-top-right" />
        <div className="decoration-bottom-left" />

        {/* Nav strip */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <div className="text-2xl font-bold text-slate-800">🏠 ClearNest</div>
          <div className="flex gap-3">
            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="btn-golden">Get Started</Button>
            </Link>
          </div>
        </div>

        {/* Hero */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-16 pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-8">
            <Flame className="w-4 h-4" />
            Family-first organisation, beautifully designed
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gradient-gold mb-6 leading-tight">
            Your Family&apos;s<br />Command Centre
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
            ClearNest brings streaks, shopping lists, inventory tracking, reminders and family tasks into one elegant space — so every member of the household stays in sync.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/auth/signup">
              <Button className="btn-golden py-4 px-8 text-lg">
                Start for Free
                <Plus className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="py-4 px-8 text-lg border-orange-300 text-orange-600 hover:bg-orange-50">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {[
              { icon: <Flame className="w-7 h-7 text-orange-500" />, title: "Streaks", desc: "Build daily habits together — track each member's progress and celebrate milestones." },
              { icon: <ShoppingCart className="w-7 h-7 text-blue-500" />, title: "Shopping List", desc: "Shared real-time grocery list with categories, sticky items, and tick-off when done." },
              { icon: <Package className="w-7 h-7 text-green-500" />, title: "Inventory", desc: "Know exactly what's in your pantry. Get low-stock alerts before you run out." },
              { icon: <Bell className="w-7 h-7 text-purple-500" />, title: "Reminders", desc: "Kanban board for household tasks. Assign, prioritise, and move cards to done." },
              { icon: <Map className="w-7 h-7 text-indigo-500" />, title: "Roadmap", desc: "Plan family projects across quarters with a visual progress timeline." },
              { icon: <Settings className="w-7 h-7 text-slate-500" />, title: "Settings", desc: "Personalise notifications, theme, and account preferences in one place." },
            ].map((f) => (
              <div key={f.title} className="card-luxe p-6 text-left">
                <div className="mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gradient-gold mb-2">
              Welcome, {isGuest ? 'Guest' : user?.email}
            </h1>
            {isGuest && (
              <p className="text-slate-600 dark:text-slate-400">You&apos;re browsing in guest mode. <Link href="/auth/login" className="text-orange-600 hover:text-orange-700 font-semibold">Sign in</Link> to save your data.</p>
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
                Manage your family&apos;s shopping needs
              </p>
              <Link href="/shopping">
                <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                  View Shopping List
                </Button>
              </Link>
            </Card>

            {/* Inventory Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-orange-100 dark:border-orange-900/30">
              <div className="flex items-start justify-between mb-4">
                <Package className="w-6 h-6 text-green-500" />
                <Link href="/inventory">
                  <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Inventory</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Track household items and supplies
              </p>
              <Link href="/inventory">
                <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                  View Inventory
                </Button>
              </Link>
            </Card>

            {/* Reminders Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-orange-100 dark:border-orange-900/30">
              <div className="flex items-start justify-between mb-4">
                <Bell className="w-6 h-6 text-purple-500" />
                <Link href="/reminders">
                  <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Reminders</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Set reminders for important tasks
              </p>
              <Link href="/reminders">
                <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                  View Reminders
                </Button>
              </Link>
            </Card>

            {/* Roadmap Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-orange-100 dark:border-orange-900/30">
              <div className="flex items-start justify-between mb-4">
                <Map className="w-6 h-6 text-indigo-500" />
                <Link href="/roadmap">
                  <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Roadmap</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Plan family projects and milestones
              </p>
              <Link href="/roadmap">
                <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                  View Roadmap
                </Button>
              </Link>
            </Card>

            {/* Settings Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-orange-100 dark:border-orange-900/30">
              <div className="flex items-start justify-between mb-4">
                <Settings className="w-6 h-6 text-slate-500" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Settings</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Manage your family and preferences
              </p>
              <Link href="/settings">
                <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
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
