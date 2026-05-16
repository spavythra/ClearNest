export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const

export const MEALS = ["Breakfast", "Lunch", "Dinner"] as const

export type MealKey = typeof MEALS[number]
export type DayKey = typeof DAYS[number]
export type WeekPlan = Record<DayKey, Record<MealKey, string>>

export const FOOD_STORAGE_KEY = "clearnest_food_menu"

export function emptyWeek(): WeekPlan {
  return Object.fromEntries(
    DAYS.map((day) => [day, { Breakfast: "", Lunch: "", Dinner: "" }])
  ) as WeekPlan
}

export function isValidPlan(value: unknown): value is WeekPlan {
  if (typeof value !== "object" || value === null) return false
  return DAYS.every((day) => {
    const dayObj = (value as Record<string, unknown>)[day]
    if (typeof dayObj !== "object" || dayObj === null) return false
    return MEALS.every(
      (meal) => typeof (dayObj as Record<string, unknown>)[meal] === "string"
    )
  })
}

export function loadPlan(storage: Storage = typeof localStorage !== "undefined" ? localStorage : ({} as Storage)): WeekPlan {
  try {
    const raw = storage.getItem(FOOD_STORAGE_KEY)
    if (!raw) return emptyWeek()
    const parsed: unknown = JSON.parse(raw)
    return isValidPlan(parsed) ? parsed : emptyWeek()
  } catch {
    return emptyWeek()
  }
}

export function savePlan(
  plan: WeekPlan,
  storage: Storage = typeof localStorage !== "undefined" ? localStorage : ({} as Storage)
): void {
  storage.setItem(FOOD_STORAGE_KEY, JSON.stringify(plan))
}

export function setMeal(plan: WeekPlan, day: DayKey, meal: MealKey, value: string): WeekPlan {
  return {
    ...plan,
    [day]: { ...plan[day], [meal]: value.trim() },
  }
}

export function clearDay(plan: WeekPlan, day: DayKey): WeekPlan {
  return { ...plan, [day]: { Breakfast: "", Lunch: "", Dinner: "" } }
}

export function isDayEmpty(plan: WeekPlan, day: DayKey): boolean {
  return MEALS.every((meal) => !plan[day][meal])
}
