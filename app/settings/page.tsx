"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { supabase, signOut } from "@/lib/supabase"
import { User } from "@/lib/types"
import {
  Settings,
  User as UserIcon,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Check,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isGuest, setIsGuest] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [saved, setSaved] = useState(false)
  const router = useRouter()

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
  }, [])

  const handleSignOut = async () => {
    if (isGuest) {
      localStorage.removeItem("guest_mode")
    } else {
      await signOut()
    }
    router.push("/")
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const displayName = isGuest ? "Guest User" : (user?.email ?? "")
  const initials = displayName
    .split(/[@.\s]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join("")

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen scenic-overlay bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="decoration-top-right" />
        <div className="decoration-bottom-left" />

        <div className="container-scenic py-12 relative z-10 max-w-3xl">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-10 h-10 text-slate-600 animate-float" />
              <h1 className="text-5xl font-bold text-gradient-brand">Settings</h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Manage your account and preferences
            </p>
          </div>

          {/* Profile Card */}
          <div className="card-elevated p-8 mb-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-orange-500" />
              Profile
            </h2>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {initials || "?"}
              </div>
              <div className="flex-1">
                <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {isGuest ? "Guest User" : displayName}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {isGuest ? "Not signed in — data won't be saved" : "Authenticated via Supabase"}
                </p>
                {isGuest && (
                  <Button
                    size="sm"
                    className="btn-brand mt-3"
                    onClick={() => router.push("/auth/login")}
                  >
                    Sign in to save data
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Preferences Card */}
          <div className="card-elevated p-8 mb-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-500" />
              Preferences
            </h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Receive reminders and streak alerts
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    notifications ? "bg-orange-500" : "bg-slate-300 dark:bg-slate-600"
                  }`}
                  aria-label="Toggle notifications"
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                      notifications ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Switch to dark theme
                  </p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    darkMode ? "bg-orange-500" : "bg-slate-300 dark:bg-slate-600"
                  }`}
                  aria-label="Toggle dark mode"
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                      darkMode ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <Button
              onClick={handleSave}
              className={`mt-6 btn-brand flex items-center gap-2 ${saved ? "opacity-80" : ""}`}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                "Save Preferences"
              )}
            </Button>
          </div>

          {/* Security Card */}
          <div className="card-elevated p-8 mb-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Security
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="font-medium">Authentication</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {isGuest ? "Guest mode — no account" : "Google OAuth / Email"}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isGuest ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200" : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"}`}>
                  {isGuest ? "Guest" : "Signed In"}
                </span>
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <div className="card-elevated p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-600 dark:text-red-400">
              <LogOut className="w-5 h-5" />
              {isGuest ? "Exit Guest Mode" : "Sign Out"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              {isGuest
                ? "This will clear guest mode and return to the home page."
                : "You will be signed out from all devices."}
            </p>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              {isGuest ? "Exit Guest Mode" : "Sign Out"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
