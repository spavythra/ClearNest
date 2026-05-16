"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Lock, ArrowRight, Users } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)

    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${baseUrl}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google")
    } finally {
      setLoading(false)
    }
  }

  const handleGuestLogin = () => {
    localStorage.setItem('guest_mode', 'true')
    window.location.href = "/"
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      window.location.href = "/"
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen scenic-overlay bg-gradient-marble flex items-center justify-center p-4">
      <div className="decoration-top-right" />
      <div className="decoration-bottom-left" />

      <div className="w-full max-w-md relative z-10">
        <div className="card-luxe p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
              ClearNest
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Welcome back to your family hub
            </p>
          </div>

          <div className="divider-gold mb-8" />

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Google Login */}
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full btn-golden mb-4 py-3 text-lg flex items-center justify-center gap-3"
          >
            <Mail className="w-5 h-5" />
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>

          {/* Guest Login */}
          <Button
            onClick={handleGuestLogin}
            disabled={loading}
            variant="outline"
            className="w-full mb-6 py-3 text-lg flex items-center justify-center gap-3 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
          >
            <Users className="w-5 h-5" />
            Continue as Guest
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-300" />
            <span className="text-slate-500 text-sm">or</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-300" />
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full btn-golden py-3 text-lg flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : "Sign In"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center border-t border-slate-200 dark:border-slate-700 pt-6">
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              Don't have an account?
            </p>
            <Link href="/auth/signup">
              <Button variant="outline" className="w-full py-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
