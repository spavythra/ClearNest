export type User = {
  id: string
  email: string
  created_at: string
}

export type Family = {
  id: string
  name: string
  created_at: string
  created_by: string
}

export type FamilyMember = {
  id: string
  family_id: string
  user_id: string
  role: "owner" | "member"
  joined_at: string
}

export type Streak = {
  id: string
  family_id: string
  name: string
  description?: string
  daily_reset_hour: number
  created_by: string
  created_at: string
  updated_at: string
}

export type StreakLog = {
  id: string
  streak_id: string
  user_id: string
  completed_at: string
  date: string
}

export type ShoppingItem = {
  id: string
  family_id: string
  name: string
  category: string
  quantity: number
  unit: string
  is_completed: boolean
  is_sticky: boolean
  created_at: string
  completed_at?: string
}

export type InventoryItem = {
  id: string
  family_id: string
  name: string
  category: string
  quantity: number
  unit: string
  min_quantity: number
  expiry_date?: string
  last_updated: string
  updated_by: string
}

export type Reminder = {
  id: string
  family_id: string
  title: string
  description?: string
  reminder_type: "one-time" | "recurring"
  scheduled_at: string
  frequency?: "daily" | "weekly" | "monthly"
  assigned_to?: string
  is_completed: boolean
  created_by: string
  created_at: string
}

export type Project = {
  id: string
  family_id: string
  name: string
  description?: string
  status: "planning" | "active" | "completed"
  deadline?: string
  created_by: string
  created_at: string
}

export type ProjectTask = {
  id: string
  project_id: string
  title: string
  description?: string
  status: "todo" | "in_progress" | "done"
  assigned_to?: string
  due_date?: string
  created_at: string
}
