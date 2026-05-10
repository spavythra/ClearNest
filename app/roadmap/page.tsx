"use client"

import { Navbar } from "@/components/layout/navbar"
import { Map, CheckCircle2, Circle, AlertCircle } from "lucide-react"

interface RoadmapItem {
  phase: string
  quarter: string
  status: "completed" | "in-progress" | "planned" | "blocked"
  items: Array<{
    name: string
    status: "completed" | "in-progress" | "planned" | "blocked"
  }>
}

const roadmapData: RoadmapItem[] = [
  {
    phase: "Phase 1: MVP Foundation",
    quarter: "Q2 2026 (May - June)",
    status: "in-progress",
    items: [
      { name: "User Authentication (Gmail OAuth)", status: "completed" },
      { name: "Lavish Indian Design System", status: "completed" },
      { name: "Kanban Board Interface", status: "completed" },
      { name: "Streaks Feature", status: "in-progress" },
      { name: "Shopping List Management", status: "completed" },
      { name: "Inventory Tracking", status: "completed" },
      { name: "Database Schema & RLS", status: "completed" },
      { name: "API Endpoints", status: "in-progress" },
      { name: "Real-time Supabase Sync", status: "planned" },
      { name: "Vercel Deployment", status: "planned" },
    ],
  },
  {
    phase: "Phase 2: Enhanced UX",
    quarter: "Q3 2026 (July - September)",
    status: "planned",
    items: [
      { name: "Push Notifications", status: "planned" },
      { name: "Advanced Analytics Dashboard", status: "planned" },
      { name: "Task Comments & Discussions", status: "planned" },
      { name: "Email Digest (Daily/Weekly)", status: "planned" },
      { name: "Mobile Optimization", status: "planned" },
      { name: "Dark Mode Complete Testing", status: "planned" },
      { name: "Offline Support (PWA)", status: "planned" },
      { name: "Performance Optimization", status: "planned" },
    ],
  },
  {
    phase: "Phase 3: Scaling",
    quarter: "Q4 2026 (October - December)",
    status: "planned",
    items: [
      { name: "React Native Mobile App", status: "planned" },
      { name: "Third-party API Integrations", status: "planned" },
      { name: "Advanced Family Roles", status: "planned" },
      { name: "Data Export (PDF, CSV)", status: "planned" },
      { name: "Multi-language Support", status: "planned" },
      { name: "AI-powered Recommendations", status: "planned" },
      { name: "Business Team Features", status: "planned" },
    ],
  },
]

const statusConfig = {
  completed: {
    icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    badge: "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200",
  },
  "in-progress": {
    icon: <Circle className="w-5 h-5 text-yellow-600" />,
    color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    badge: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200",
  },
  planned: {
    icon: <Circle className="w-5 h-5 text-slate-400" />,
    color: "bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800",
    badge: "bg-slate-100 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200",
  },
  blocked: {
    icon: <AlertCircle className="w-5 h-5 text-red-600" />,
    color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    badge: "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200",
  },
}

export default function RoadmapPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen scenic-overlay bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="decoration-top-right" />
        <div className="decoration-bottom-left" />

        <div className="container-scenic py-12 relative z-10">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Map className="w-10 h-10 text-indigo-600 animate-float" />
              <h1 className="text-5xl font-bold text-gradient-gold">Roadmap</h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Our vision for building the perfect family organization tool
            </p>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {(
              [
                "completed",
                "in-progress",
                "planned",
                "blocked",
              ] as const
            ).map((status) => (
              <div
                key={status}
                className="card-luxe p-4 flex items-center gap-3"
              >
                {statusConfig[status].icon}
                <span className="text-sm font-medium capitalize">{status}</span>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {roadmapData.map((phase, idx) => (
              <div key={idx} className="relative">
                {/* Phase Header */}
                <div
                  className={`card-luxe p-6 mb-6 border-l-4 ${
                    statusConfig[phase.status].color
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{phase.phase}</h2>
                      <p className="text-slate-600 dark:text-slate-400">
                        {phase.quarter}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${statusConfig[phase.status].badge}`}
                    >
                      {phase.status === "in-progress"
                        ? "In Progress"
                        : phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                  {phase.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className={`card-luxe p-4 flex items-start gap-3 border-l-2 ${
                        statusConfig[item.status].color
                      }`}
                    >
                      <div className="pt-1">
                        {statusConfig[item.status].icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p
                          className={`text-xs mt-1 ${
                            statusConfig[item.status].badge
                          } inline-block px-2 py-1 rounded`}
                        >
                          {item.status === "in-progress"
                            ? "In Progress"
                            : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                {idx < roadmapData.length - 1 && (
                  <div className="flex justify-center my-12">
                    <div className="text-3xl">⬇️</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Future Vision */}
          <div className="card-luxe p-8 mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
            <h3 className="text-2xl font-bold mb-4">🚀 Future Vision</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2">Long-term Goals</h4>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li>✨ AI-powered task recommendations</li>
                  <li>🌍 Multi-language support</li>
                  <li>📊 Advanced business analytics</li>
                  <li>🔌 Third-party integrations</li>
                  <li>📱 Native mobile apps</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Community Feedback</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  We actively listen to user feedback and adjust our roadmap accordingly.
                  Have a feature request?{" "}
                  <a href="mailto:feedback@clearnest.app" className="text-orange-600 dark:text-orange-400 font-semibold">
                    Let us know!
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="card-luxe p-6 text-center">
              <p className="text-3xl font-bold text-gradient-gold">
                {roadmapData.reduce((acc, phase) => acc + phase.items.filter(i => i.status === 'completed').length, 0)}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Features Completed
              </p>
            </div>
            <div className="card-luxe p-6 text-center">
              <p className="text-3xl font-bold text-yellow-600">
                {roadmapData.reduce((acc, phase) => acc + phase.items.filter(i => i.status === 'in-progress').length, 0)}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                In Development
              </p>
            </div>
            <div className="card-luxe p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">
                {roadmapData.reduce((acc, phase) => acc + phase.items.filter(i => i.status === 'planned').length, 0)}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Planned Features
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
