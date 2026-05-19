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
  ArrowRight,
  UserPlus,
  Users,
  Zap,
} from "lucide-react"

const FEATURES = [
  {
    icon: <Flame className="w-6 h-6 text-white" />,
    bg: "bg-emerald-600",
    title: "Streaks & Habits",
    desc: "Build daily habits together. Track each member's progress and celebrate milestones as a family.",
  },
  {
    icon: <ShoppingCart className="w-6 h-6 text-white" />,
    bg: "bg-blue-600",
    title: "Shopping List",
    desc: "Shared real-time grocery list with categories, sticky items, and one-tap tick-off when done.",
  },
  {
    icon: <UtensilsCrossed className="w-6 h-6 text-white" />,
    bg: "bg-amber-600",
    title: "Meal Planner",
    desc: "Plan the whole week's meals in one place. Monday to Sunday, breakfast through dinner sorted.",
  },
  {
    icon: <Package className="w-6 h-6 text-white" />,
    bg: "bg-teal-600",
    title: "Inventory",
    desc: "Know exactly what's in your pantry and cupboards. Get low-stock alerts before you run out.",
  },
  {
    icon: <Bell className="w-6 h-6 text-white" />,
    bg: "bg-indigo-600",
    title: "Task Board",
    desc: "Kanban board for household tasks. Assign, prioritise, and move cards to done — together.",
  },
  {
    icon: <Map className="w-6 h-6 text-white" />,
    bg: "bg-stone-600",
    title: "Family Roadmap",
    desc: "Plan bigger household projects across quarters with a shared visual progress timeline.",
  },
]

const HOW_IT_WORKS = [
  {
    icon: <UserPlus className="w-6 h-6" style={{ color: "var(--brand)" }} />,
    step: "1",
    title: "Create your household",
    desc: "Sign up free in seconds. No credit card, no setup hassle.",
  },
  {
    icon: <Users className="w-6 h-6" style={{ color: "var(--brand)" }} />,
    step: "2",
    title: "Invite your family",
    desc: "Share the space with everyone at home. Each person gets their own view.",
  },
  {
    icon: <Zap className="w-6 h-6" style={{ color: "var(--brand)" }} />,
    step: "3",
    title: "Stay in sync",
    desc: "Updates are instant. Tick off a shopping item and everyone sees it immediately.",
  },
]

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
        <div
          className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent"
          style={{ borderColor: "var(--brand)", borderTopColor: "transparent" }}
        />
      </div>
    )
  }

  if (!user && !isGuest) {
    return (
      <div className="min-h-screen bg-stone-50">

        {/* ── Top nav ────────────────────────────────────────── */}
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "var(--brand)" }}
            >
              CN
            </div>
            <span className="text-xl font-bold text-white drop-shadow">ClearNest</span>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="sm"
                style={{ borderColor: "rgba(255,255,255,0.55)", color: "#fff", background: "rgba(255,255,255,0.10)" }}
                className="backdrop-blur-sm hover:bg-white/20"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="btn-golden">Get started</Button>
            </Link>
          </div>
        </header>

        {/* ── Hero ───────────────────────────────────────────── */}
        <section
          className="relative min-h-[500px] flex items-center pt-24 pb-24 px-6"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(14, 38, 27, 0.86) 0%, rgba(20, 52, 36, 0.72) 100%),
              url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80')
            `,
            backgroundSize: "cover",
            backgroundPosition: "center 45%",
          }}
        >
          <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-5 w-full">
            <div
              className="inline-flex items-center gap-2 border text-sm font-semibold px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.12)",
                borderColor: "rgba(255,255,255,0.30)",
                color: "rgba(255,255,255,0.90)",
              }}
            >
              <Flame className="w-4 h-4" />
              Built for households that want to stay in sync
            </div>

            <h1
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                color: "#fff",
                lineHeight: 1.08,
              }}
            >
              Your Family&apos;s<br />Command Centre
            </h1>

            <p
              className="text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.82)", maxWidth: "38rem" }}
            >
              ClearNest brings habits, shopping, meal planning, inventory, tasks, and family roadmap into one shared space — so every member stays in sync.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-1">
              <Link href="/auth/signup">
                <Button className="btn-golden py-3 px-8 text-base">
                  Start for free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="py-3 px-8 text-base backdrop-blur-sm hover:bg-white/20"
                  style={{ borderColor: "rgba(255,255,255,0.45)", color: "#fff", background: "rgba(255,255,255,0.10)" }}
                >
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Stats bar ──────────────────────────────────────── */}
        <div className="flex justify-center" style={{ background: "var(--brand-deep)" }}>
          {[
            { value: "6", label: "Tools in one app" },
            { value: "Free", label: "No credit card needed" },
            { value: "Real-time", label: "Sync across devices" },
            { value: "No ads", label: "Private & clean" },
          ].map((s, i, arr) => (
            <div
              key={s.label}
              className="flex-1 flex flex-col items-center gap-0.5 py-4 px-2"
              style={{
                maxWidth: 200,
                borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
              }}
            >
              <strong className="text-xl font-extrabold text-white leading-none">{s.value}</strong>
              <span className="text-xs text-center" style={{ color: "rgba(255,255,255,0.65)" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Features ───────────────────────────────────────── */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-bold mb-3 text-gradient-gold"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
            >
              Everything your household needs
            </h2>
            <p className="text-stone-500 max-w-md mx-auto text-sm leading-relaxed">
              Six connected tools, one shared space. No juggling between apps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-luxe p-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.bg}`}>
                  {f.icon}
                </div>
                <h3 className="text-base font-bold mb-2 text-stone-900">{f.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────── */}
        <section className="py-16 px-6" style={{ background: "var(--brand-light)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="font-bold mb-3 text-gradient-gold"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
              >
                Organised in minutes
              </h2>
              <p className="text-stone-500 max-w-sm mx-auto text-sm">
                Three steps to a calmer, more coordinated household.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {HOW_IT_WORKS.map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center gap-3">
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: "#fff", border: "2px solid var(--brand)", boxShadow: "0 4px 14px rgba(45,106,79,0.18)" }}
                    >
                      {item.icon}
                    </div>
                    <span
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold text-white"
                      style={{ background: "var(--brand)" }}
                    >
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900">{item.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ─────────────────────────────────────── */}
        <section
          className="py-20 px-6 text-center"
          style={{ background: "linear-gradient(135deg, var(--brand-deep) 0%, #2d6a4f 100%)" }}
        >
          <h2
            className="font-bold mb-4 text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Ready to bring clarity home?
          </h2>
          <p className="text-lg mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.80)" }}>
            Free to start, no credit card required. Your household deserves one good app.
          </p>
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="py-4 px-10 text-base font-semibold shadow-lg hover:opacity-90 transition-opacity"
              style={{ background: "#fff", color: "var(--brand-deep)" }}
            >
              Get started for free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </section>

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
