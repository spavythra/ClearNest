import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to get current user
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error("Error getting current user:", error)
    return null
  }

  return user
}

// Helper function to get current session
export async function getCurrentSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    console.error("Error getting session:", error)
    return null
  }

  return session
}

// Helper function to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Error signing out:", error)
    return false
  }

  return true
}
