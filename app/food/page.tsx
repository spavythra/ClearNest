"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { supabase } from "@/lib/supabase"
import { User } from "@/lib/types"
import { UtensilsCrossed, Pencil, Check, X } from "lucide-react"
import {
  DAYS,
  MEALS,
  type MealKey,
  type DayKey,
  type WeekPlan,
  emptyWeek,
  loadPlan,
  savePlan,
  clearDay as clearDayPlan,
  isDayEmpty,
} from "@/lib/food"

interface EditState {
  day: DayKey
  meal: MealKey
  value: string
}

export default function FoodMenuPage() {
  const [user, setUser] = useState<User | null>(null)
  const [plan, setPlan] = useState<WeekPlan>(emptyWeek)
  const [editing, setEditing] = useState<EditState | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? "",
          created_at: data.user.created_at,
        })
      }
    })

    if (typeof window !== "undefined") {
      setPlan(loadPlan(localStorage))
    }
  }, [])

  const startEdit = (day: DayKey, meal: MealKey) => {
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
    if (typeof window !== "undefined") savePlan(updated, localStorage)
    setEditing(null)
  }

  const cancelEdit = () => setEditing(null)

  const handleClearDay = (day: DayKey) => {
    const updated = clearDayPlan(plan, day)
    setPlan(updated)
    if (typeof window !== "undefined") savePlan(updated, localStorage)
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

          <div className="flex items-center gap-3 mb-2">
            <UtensilsCrossed className="w-7 h-7 text-amber-600" />
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">Food Menu</h1>
          </div>
          <p className="text-stone-500 dark:text-stone-400 mb-8">
            Plan the week&apos;s meals for your household. Click any slot to edit.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {DAYS.map((day) => (
              <div
                key={day}
                className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 dark:border-stone-800">
                  <span className="font-semibold text-stone-800 dark:text-stone-100 text-sm">{day}</span>
                  {!isDayEmpty(plan, day) && (
                    <button
                      onClick={() => handleClearDay(day)}
                      className="text-stone-300 hover:text-red-400 transition-colors"
                      aria-label={`Clear ${day}`}
                      title="Clear day"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="divide-y divide-stone-100 dark:divide-stone-800">
                  {MEALS.map((meal) => {
                    const isEditing = editing?.day === day && editing?.meal === meal
                    const value = plan[day][meal]

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
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-5 mt-8 pt-6 border-t border-stone-200 dark:border-stone-800">
            {MEALS.map((meal) => (
              <span key={meal} className={`flex items-center gap-1.5 text-xs font-semibold ${mealColor[meal]}`}>
                <span className={`w-2 h-2 rounded-full inline-block ${mealBg[meal].split(" ")[0].replace("50", "400")}`} />
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
