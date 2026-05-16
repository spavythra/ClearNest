"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { supabase } from "@/lib/supabase"
import { User } from "@/lib/types"
import { UtensilsCrossed, Pencil, Check, X } from "lucide-react"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const MEALS = ["Breakfast", "Lunch", "Dinner"] as const

type MealKey = typeof MEALS[number]
type WeekPlan = Record<string, Record<MealKey, string>>

const STORAGE_KEY = "clearnest_food_menu"

function emptyWeek(): WeekPlan {
  return Object.fromEntries(
    DAYS.map((day) => [day, { Breakfast: "", Lunch: "", Dinner: "" }])
  ) as WeekPlan
}

function loadPlan(): WeekPlan {
  if (typeof window === "undefined") return emptyWeek()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : emptyWeek()
  } catch {
    return emptyWeek()
  }
}

function savePlan(plan: WeekPlan) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
}

interface EditState {
  day: string
  meal: MealKey
  value: string
}

export default function FoodMenuPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isGuest, setIsGuest] = useState(false)
  const [plan, setPlan] = useState<WeekPlan>(emptyWeek)
  const [editing, setEditing] = useState<EditState | null>(null)

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
    })

    setPlan(loadPlan())
  }, [])

  const startEdit = (day: string, meal: MealKey) => {
    setEditing({ day, meal, value: plan[day][meal] })
  }

  const commitEdit = () => {
    if (!editing) return
    const updated = {
      ...plan,
      [editing.day]: {
        ...plan[editing.day],
        [editing.meal]: editing.value.trim(),
      },
    }
    setPlan(updated)
    savePlan(updated)
    setEditing(null)
  }

  const cancelEdit = () => setEditing(null)

  const clearDay = (day: string) => {
    const updated = { ...plan, [day]: { Breakfast: "", Lunch: "", Dinner: "" } }
    setPlan(updated)
    savePlan(updated)
  }

  const mealColor: Record<MealKey, string> = {
    Breakfast: "text-amber-600",
    Lunch: "text-emerald-700",
    Dinner: "text-indigo-600",
  }

  const mealBg: Record<MealKey, string> = {
    Breakfast: "bg-amber-50 border-amber-100",
    Lunch: "bg-emerald-50 border-emerald-100",
    Dinner: "bg-indigo-50 border-indigo-100",
  }

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-4 py-10">

          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <UtensilsCrossed className="w-7 h-7 text-amber-600" />
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">Food Menu</h1>
          </div>
          <p className="text-stone-500 dark:text-stone-400 mb-8">
            Plan the week&apos;s meals for your household. Click any slot to edit.
          </p>

          {/* Week grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {DAYS.map((day) => {
              const dayPlan = plan[day]
              const isEmpty = MEALS.every((m) => !dayPlan[m])

              return (
                <div
                  key={day}
                  className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden"
                >
                  {/* Day header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 dark:border-stone-800">
                    <span className="font-semibold text-stone-800 dark:text-stone-100 text-sm">{day}</span>
                    {!isEmpty && (
                      <button
                        onClick={() => clearDay(day)}
                        className="text-stone-300 hover:text-red-400 transition-colors"
                        aria-label={`Clear ${day}`}
                        title="Clear day"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Meal slots */}
                  <div className="divide-y divide-stone-100 dark:divide-stone-800">
                    {MEALS.map((meal) => {
                      const isEditing = editing?.day === day && editing?.meal === meal
                      const value = dayPlan[meal]

                      return (
                        <div key={meal} className="px-4 py-3">
                          <p className={`text-xs font-semibold uppercase tracking-wide mb-1.5 ${mealColor[meal]}`}>
                            {meal}
                          </p>

                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <input
                                autoFocus
                                type="text"
                                value={editing.value}
                                onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") commitEdit()
                                  if (e.key === "Escape") cancelEdit()
                                }}
                                placeholder="Add meal..."
                                className="flex-1 text-sm bg-transparent border-b border-stone-300 dark:border-stone-600 outline-none py-0.5 text-stone-800 dark:text-stone-100 placeholder-stone-300"
                              />
                              <button onClick={commitEdit} className="text-emerald-600 hover:text-emerald-700" aria-label="Save">
                                <Check className="w-4 h-4" />
                              </button>
                              <button onClick={cancelEdit} className="text-stone-400 hover:text-stone-600" aria-label="Cancel">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => startEdit(day, meal)}
                              className={`w-full text-left text-sm rounded-lg px-2 py-1.5 border transition-colors group ${
                                value
                                  ? `${mealBg[meal]} text-stone-700 dark:text-stone-200`
                                  : "border-dashed border-stone-200 dark:border-stone-700 text-stone-300 dark:text-stone-600 hover:border-stone-300 hover:text-stone-400"
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                {value || "Add meal"}
                                {value && (
                                  <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity ml-auto flex-shrink-0" />
                                )}
                              </span>
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-5 mt-8 pt-6 border-t border-stone-200 dark:border-stone-800">
            {MEALS.map((meal) => (
              <span key={meal} className={`flex items-center gap-1.5 text-xs font-semibold ${mealColor[meal]}`}>
                <span className={`w-2 h-2 rounded-full inline-block ${mealBg[meal].split(" ")[0].replace("bg-", "bg-").replace("50", "400")}`} />
                {meal}
              </span>
            ))}
            <span className="text-xs text-stone-400 ml-auto">Saved locally in browser</span>
          </div>
        </div>
      </div>
    </>
  )
}
