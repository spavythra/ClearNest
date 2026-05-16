import {
  DAYS,
  MEALS,
  emptyWeek,
  isValidPlan,
  loadPlan,
  savePlan,
  setMeal,
  clearDay,
  isDayEmpty,
  FOOD_STORAGE_KEY,
  type WeekPlan,
} from "@/lib/food"

// ── emptyWeek ────────────────────────────────────────────────

describe("emptyWeek", () => {
  it("returns an object with all seven days", () => {
    const week = emptyWeek()
    expect(Object.keys(week)).toHaveLength(DAYS.length)
    DAYS.forEach((day) => expect(week).toHaveProperty(day))
  })

  it("every day has three meal slots", () => {
    const week = emptyWeek()
    DAYS.forEach((day) => {
      MEALS.forEach((meal) => {
        expect(week[day][meal]).toBe("")
      })
    })
  })

  it("returns a new object each call (no shared reference)", () => {
    const a = emptyWeek()
    const b = emptyWeek()
    a.Monday.Breakfast = "Oats"
    expect(b.Monday.Breakfast).toBe("")
  })
})

// ── isValidPlan ──────────────────────────────────────────────

describe("isValidPlan", () => {
  it("returns true for a valid week plan", () => {
    expect(isValidPlan(emptyWeek())).toBe(true)
  })

  it("returns false for null", () => {
    expect(isValidPlan(null)).toBe(false)
  })

  it("returns false for a plain string", () => {
    expect(isValidPlan("Monday")).toBe(false)
  })

  it("returns false when a day is missing", () => {
    const partial = emptyWeek() as Partial<WeekPlan>
    delete partial.Monday
    expect(isValidPlan(partial)).toBe(false)
  })

  it("returns false when a meal value is not a string", () => {
    const bad = emptyWeek() as Record<string, Record<string, unknown>>
    bad.Monday.Breakfast = 42
    expect(isValidPlan(bad)).toBe(false)
  })
})

// ── loadPlan / savePlan ──────────────────────────────────────

function makeMockStorage(initial: Record<string, string> = {}): Storage {
  const store: Record<string, string> = { ...initial }
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { Object.keys(store).forEach((k) => delete store[k]) },
    key: (i: number) => Object.keys(store)[i] ?? null,
    get length() { return Object.keys(store).length },
  }
}

describe("loadPlan", () => {
  it("returns an empty week when storage has no data", () => {
    const storage = makeMockStorage()
    expect(loadPlan(storage)).toEqual(emptyWeek())
  })

  it("restores a previously saved plan", () => {
    const plan = emptyWeek()
    plan.Monday.Breakfast = "Porridge"
    plan.Friday.Dinner = "Pizza"
    const storage = makeMockStorage({ [FOOD_STORAGE_KEY]: JSON.stringify(plan) })
    expect(loadPlan(storage)).toEqual(plan)
  })

  it("returns an empty week when storage contains malformed JSON", () => {
    const storage = makeMockStorage({ [FOOD_STORAGE_KEY]: "not-json{" })
    expect(loadPlan(storage)).toEqual(emptyWeek())
  })

  it("returns an empty week when parsed data fails validation", () => {
    const storage = makeMockStorage({ [FOOD_STORAGE_KEY]: JSON.stringify({ bad: "data" }) })
    expect(loadPlan(storage)).toEqual(emptyWeek())
  })
})

describe("savePlan", () => {
  it("writes the plan to storage under the correct key", () => {
    const storage = makeMockStorage()
    const plan = emptyWeek()
    plan.Tuesday.Lunch = "Soup"
    savePlan(plan, storage)
    expect(storage.getItem(FOOD_STORAGE_KEY)).toBe(JSON.stringify(plan))
  })

  it("round-trips correctly via loadPlan", () => {
    const storage = makeMockStorage()
    const plan = emptyWeek()
    plan.Wednesday.Dinner = "Pasta"
    savePlan(plan, storage)
    expect(loadPlan(storage)).toEqual(plan)
  })
})

// ── setMeal / clearDay / isDayEmpty ──────────────────────────

describe("setMeal", () => {
  it("updates the correct meal without mutating the original", () => {
    const original = emptyWeek()
    const updated = setMeal(original, "Monday", "Breakfast", "Eggs")
    expect(updated.Monday.Breakfast).toBe("Eggs")
    expect(original.Monday.Breakfast).toBe("")
  })

  it("trims whitespace from the meal value", () => {
    const plan = emptyWeek()
    expect(setMeal(plan, "Tuesday", "Lunch", "  Salad  ").Tuesday.Lunch).toBe("Salad")
  })

  it("other days are unchanged", () => {
    const plan = emptyWeek()
    const updated = setMeal(plan, "Monday", "Breakfast", "Toast")
    DAYS.filter((d) => d !== "Monday").forEach((day) => {
      expect(updated[day]).toEqual(plan[day])
    })
  })
})

describe("clearDay", () => {
  it("resets all meals for a day to empty string", () => {
    let plan = emptyWeek()
    plan = setMeal(plan, "Thursday", "Breakfast", "Yoghurt")
    plan = setMeal(plan, "Thursday", "Dinner", "Stew")
    const cleared = clearDay(plan, "Thursday")
    MEALS.forEach((meal) => expect(cleared.Thursday[meal]).toBe(""))
  })

  it("does not affect other days", () => {
    let plan = emptyWeek()
    plan = setMeal(plan, "Monday", "Lunch", "Soup")
    plan = setMeal(plan, "Thursday", "Lunch", "Soup")
    const cleared = clearDay(plan, "Thursday")
    expect(cleared.Monday.Lunch).toBe("Soup")
  })

  it("does not mutate the original plan", () => {
    let plan = emptyWeek()
    plan = setMeal(plan, "Friday", "Breakfast", "Muesli")
    clearDay(plan, "Friday")
    expect(plan.Friday.Breakfast).toBe("Muesli")
  })
})

describe("isDayEmpty", () => {
  it("returns true when all meals are empty", () => {
    expect(isDayEmpty(emptyWeek(), "Monday")).toBe(true)
  })

  it("returns false when at least one meal is set", () => {
    const plan = setMeal(emptyWeek(), "Monday", "Breakfast", "Toast")
    expect(isDayEmpty(plan, "Monday")).toBe(false)
  })
})
