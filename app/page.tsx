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
  UtensilsCrossed,
} from "lucide-react"

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [isGuest, setIsGuest] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const guestMode = typeof window !== "undefined" && localStorage.getItem("guest_mode") === "true"
    setIsGuest(guestMode)

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? "",
          created_at: data.user.created_at,
        })
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent" style={{ borderColor: "var(--brand)", borderTopColor: "transparent" }}></div>
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: "var(--brand)" }}>
              CN
            </div>
            <span className="text-xl font-bold text-stone-800">ClearNest</span>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50">
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
          <div className="inline-flex items-center gap-2 border text-sm font-semibold px-4 py-1.5 rounded-full mb-8" style={{ background: "var(--brand-light)", borderColor: "rgba(45,106,79,0.25)", color: "var(--brand-deep)" }}>
            <Flame className="w-4 h-4" />
            Family-first organisation, thoughtfully designed
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gradient-gold mb-6 leading-tight">
            Your Family&apos;s<br />Command Centre
          </h1>

          <p className="text-xl text-stone-600 max-w-2xl mb-10 leading-relaxed">
            ClearNest brings streaks, shopping lists, meal planning, inventory tracking, reminders, and family tasks into one shared space — so every member stays in sync.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/auth/signup">
              <Button className="btn-golden py-4 px-8 text-lg">
                Start for Free
                <Plus className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="py-4 px-8 text-lg border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {[
              { icon: <Flame className="w-7 h-7" style={{ color: "var(--brand)" }} />, title: "Streaks", desc: "Build daily habits together. Track each member's progress and celebrate milestones." },
              { icon: <ShoppingCart className="w-7 h-7 text-blue-600" />, title: "Shopping List", desc: "Shared real-time grocery list with categories, sticky items, and tick-off when done." },
              { icon: <UtensilsCrossed className="w-7 h-7 text-amber-600" />, title: "Food Menu", desc: "Plan the week's meals in one place. Monday to Sunday, breakfast through dinner." },
              { icon: <Package className="w-7 h-7 text-teal-600" />, title: "Inventory", desc: "Know exactly what's in your pantry. Get low-stock alerts before you run out." },
              { icon: <Bell className="w-7 h-7 text-indigo-600" />, title: "Reminders", desc: "Kanban board for household tasks. Assign, prioritise, and move cards to done." },
              { icon: <Map className="w-7 h-7 text-stone-500" />, title: "Roadmap", desc: "Plan family projects across quarters with a visual progress timeline." },
            ].map((f) => (
              <div key={f.title} className="card-luxe p-6 text-left">
                <div className="mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-stone-900">{f.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{f.desc}</p>
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
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gradient-gold mb-2">
              Welcome, {isGuest ? "Guest" : user?.email}
            </h1>
            {isGuest && (
              <p className="text-stone-600 dark:text-stone-400">
                You&apos;re browsing in guest mode.{" "}
                <Link href="/auth/login" className="font-semibold hover:underline" style={{ color: "var(--brand)" }}>
                  Sign in
                </Link>{" "}
                to save your data.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Streaks */}
            <Card className="p-6 hover:shadow-md transition-shadow border-stone-200 dark:border-stone-700">
              <div className="flex items-start justify-between mb-4">
                <Flame className="w-6 h-6" style={{ color: "var(--brand)" }} />
                <Link href="/streaks">
                  <Button size="sm" variant="ghost"><Plus className="w-4 h-4" /></Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Streaks</h2>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">Track daily habits and maintain streaks</p>
              <Link href="/streaks">
                <Button variant="outline" className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50">View Streaks</Button>
              </Link>
            </Card>

            {/* Shopping List */}
            <Card className="p-6 hover:shadow-md transition-shadow border-stone-200 dark:border-stone-700">
              <div className="flex items-start justify-between mb-4">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
                <Link href="/shopping">
                  <Button size="sm" variant="ghost"><Plus className="w-4 h-4" /></Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Shopping List</h2>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">Manage your family&apos;s shopping needs</p>
              <Link href="/shopping">
                <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">View Shopping List</Button>
              </Link>
            </Card>

            {/* Food Menu */}
            <Card className="p-6 hover:shadow-md transition-shadow border-stone-200 dark:border-stone-700">
              <div className="flex items-start justify-between mb-4">
                <UtensilsCrossed className="w-6 h-6 text-amber-600" />
                <Link href="/food">
                  <Button size="sm" variant="ghost"><Plus className="w-4 h-4" /></Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Food Menu</h2>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">Plan the week&apos;s meals for the whole family</p>
              <Link href="/food">
                <Button variant="outline" className="w-full border-amber-500 text-amber-700 hover:bg-amber-50">Plan Meals</Button>
              </Link>
            </Card>

            {/* Inventory */}
            <Card className="p-6 hover:shadow-md transition-shadow border-stone-200 dark:border-stone-700">
              <div className="flex items-start justify-between mb-4">
                <Package className="w-6 h-6 text-teal-600" />
                <Link href="/inventory">
                  <Button size="sm" variant="ghost"><Plus className="w-4 h-4" /></Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Inventory</h2>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">Track household items and supplies</p>
              <Link href="/inventory">
                <Button variant="outline" className="w-full border-teal-500 text-teal-700 hover:bg-teal-50">View Inventory</Button>
              </Link>
            </Card>

            {/* Reminders */}
            <Card className="p-6 hover:shadow-md transition-shadow border-stone-200 dark:border-stone-700">
              <div className="flex items-start justify-between mb-4">
                <Bell className="w-6 h-6 text-indigo-600" />
                <Link href="/reminders">
                  <Button size="sm" variant="ghost"><Plus className="w-4 h-4" /></Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Reminders</h2>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">Set reminders for important tasks</p>
              <Link href="/reminders">
                <Button variant="outline" className="w-full border-indigo-500 text-indigo-700 hover:bg-indigo-50">View Reminders</Button>
              </Link>
            </Card>

            {/* Roadmap */}
            <Card className="p-6 hover:shadow-md transition-shadow border-stone-200 dark:border-stone-700">
              <div className="flex items-start justify-between mb-4">
                <Map className="w-6 h-6 text-stone-500" />
                <Link href="/roadmap">
                  <Button size="sm" variant="ghost"><Plus className="w-4 h-4" /></Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Roadmap</h2>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">Plan family projects and milestones</p>
              <Link href="/roadmap">
                <Button variant="outline" className="w-full border-stone-400 text-stone-600 hover:bg-stone-100">View Roadmap</Button>
              </Link>
            </Card>

            {/* Settings */}
            <Card className="p-6 hover:shadow-md transition-shadow border-stone-200 dark:border-stone-700">
              <div className="flex items-start justify-between mb-4">
                <Settings className="w-6 h-6 text-stone-400" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Settings</h2>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">Manage your family and preferences</p>
              <Link href="/settings">
                <Button variant="outline" className="w-full border-stone-300 text-stone-500 hover:bg-stone-100">Go to Settings</Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
