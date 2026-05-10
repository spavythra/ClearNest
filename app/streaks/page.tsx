"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Flame, Plus, Calendar, TrendingUp } from "lucide-react"

interface Streak {
  id: string
  name: string
  description?: string
  created_at: string
  current_days?: number
  longest_days?: number
}

export default function StreaksPage() {
  const [streaks, setStreaks] = useState<Streak[]>([
    {
      id: "1",
      name: "Morning Exercise",
      description: "30 minutes of physical activity",
      created_at: new Date().toISOString(),
      current_days: 15,
      longest_days: 32,
    },
    {
      id: "2",
      name: "Reading",
      description: "Read for at least 20 minutes",
      created_at: new Date().toISOString(),
      current_days: 8,
      longest_days: 45,
    },
    {
      id: "3",
      name: "Family Dinner",
      description: "Dinner together at home",
      created_at: new Date().toISOString(),
      current_days: 22,
      longest_days: 60,
    },
  ])
  const [showForm, setShowForm] = useState(false)
  const [newStreak, setNewStreak] = useState({
    name: "",
    description: "",
  })

  const handleAddStreak = () => {
    if (newStreak.name.trim()) {
      const streak: Streak = {
        id: Math.random().toString(),
        name: newStreak.name,
        description: newStreak.description,
        created_at: new Date().toISOString(),
        current_days: 0,
        longest_days: 0,
      }
      setStreaks([...streaks, streak])
      setNewStreak({ name: "", description: "" })
      setShowForm(false)
    }
  }

  const completeStreakToday = (id: string) => {
    setStreaks(
      streaks.map((streak) =>
        streak.id === id
          ? { ...streak, current_days: (streak.current_days || 0) + 1 }
          : streak
      )
    )
  }

  const totalActive = streaks.length
  const averageDays =
    Math.round(
      streaks.reduce((sum, s) => sum + (s.current_days || 0), 0) / totalActive
    ) || 0

  return (
    <>
      <Navbar />
      <div className="min-h-screen scenic-overlay bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="decoration-top-right" />
        <div className="decoration-bottom-left" />

        <div className="container-scenic py-12 relative z-10">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Flame className="w-10 h-10 text-orange-500 animate-float" />
              <h1 className="text-5xl font-bold text-gradient-gold">Streaks</h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Build daily habits and maintain your streak consistency
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card-luxe p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">
                    Active Streaks
                  </p>
                  <p className="text-4xl font-bold text-gradient-gold">
                    {totalActive}
                  </p>
                </div>
                <Flame className="w-12 h-12 text-orange-500 opacity-20" />
              </div>
            </div>

            <div className="card-luxe p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">
                    Average Days
                  </p>
                  <p className="text-4xl font-bold text-gradient-royal">
                    {averageDays}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-purple-500 opacity-20" />
              </div>
            </div>

            <div className="card-luxe p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">
                    Best Streak
                  </p>
                  <p className="text-4xl font-bold text-gradient-peacock">
                    {Math.max(...streaks.map((s) => s.longest_days || 0), 0)}
                  </p>
                </div>
                <Calendar className="w-12 h-12 text-blue-500 opacity-20" />
              </div>
            </div>
          </div>

          {/* Add Streak Form */}
          {showForm && (
            <div className="card-luxe p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Create New Streak</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Streak Name
                  </label>
                  <input
                    type="text"
                    value={newStreak.name}
                    onChange={(e) =>
                      setNewStreak({ ...newStreak, name: e.target.value })
                    }
                    placeholder="e.g., Morning Meditation"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description (optional)
                  </label>
                  <textarea
                    value={newStreak.description}
                    onChange={(e) =>
                      setNewStreak({ ...newStreak, description: e.target.value })
                    }
                    placeholder="What is this streak about?"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 h-24"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleAddStreak}
                    className="btn-golden flex-1"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Streak
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="btn-golden mb-12 py-3 px-6 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Streak
            </Button>
          )}

          {/* Streaks List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streaks.map((streak) => (
              <div key={streak.id} className="card-luxe p-6 hover:animate-glow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {streak.name}
                    </h3>
                    {streak.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {streak.description}
                      </p>
                    )}
                  </div>
                  <Flame className="w-6 h-6 text-orange-500" />
                </div>

                {/* Current Streak */}
                <div className="mb-6">
                  <div className="streak-badge text-center mb-4">
                    🔥 {streak.current_days || 0} Days
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 text-center">
                    Longest: {streak.longest_days || 0} days
                  </div>
                </div>

                {/* Complete Button */}
                <Button
                  onClick={() => completeStreakToday(streak.id)}
                  className="btn-golden w-full py-2"
                >
                  Complete Today
                </Button>
              </div>
            ))}
          </div>

          {streaks.length === 0 && !showForm && (
            <div className="card-luxe p-12 text-center">
              <Flame className="w-16 h-16 text-orange-500 opacity-30 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No Streaks Yet</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Create your first streak to start building daily habits
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="btn-golden"
              >
                Create Your First Streak
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
