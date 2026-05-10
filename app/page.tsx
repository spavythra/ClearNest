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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Implement authentication check
    setUser(null)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border b-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">ClearNest</h1>
          <p className="text-slate-600 mb-8">
            Keep your family organized with streaks, shopping lists, inventory tracking, and more.
          </p>
          <div className="space-y-3">
            <Link href="/auth/login">
              <Button className="w-full">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" className="w-full">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Welcome, {user?.email}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Streaks Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <Flame className="w-6 h-6 text-orange-500" />
                <Link href="/streaks">
                  <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Streaks</h2>
              <p className="text-slate-600 text-sm mb-4">
                Track your daily habits and maintain streaks
              </p>
              <Link href="/streaks">
                <Button variant="outline" className="w-full">
                  View Streaks
                </Button>
              </Link>
            </Card>

            {/* Shopping List Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <ShoppingCart className="w-6 h-6 text-blue-500" />
                <Link href="/shopping">
                  <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2">Shopping List</h2>
              <p className="text-slate-600 text-sm mb-4">
                Manage your family's shopping needs
              </p>
              <Link href="/shopping">
                <Button variant="outline" className="w-full">
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
