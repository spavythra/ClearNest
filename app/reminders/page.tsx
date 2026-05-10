"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Bell, Plus } from "lucide-react"
import { KanbanBoard } from "@/components/reminders/KanbanBoard"

export interface Task {
  id: string
  title: string
  description?: string
  column_id: "todo" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high"
  due_date?: string
  assigned_to?: string
  assigned_name?: string
  reminder_type?: "one-time" | "daily" | "weekly" | "monthly"
  is_completed?: boolean
  created_at: string
}

export default function RemindersPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Plan Weekly Grocery Shopping",
      description: "Make list and check inventory",
      column_id: "todo",
      priority: "high",
      due_date: "2026-05-11",
      assigned_to: "user1",
      assigned_name: "Sarah",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Schedule Family Dinner",
      description: "Book restaurant and confirm with family",
      column_id: "in-progress",
      priority: "medium",
      due_date: "2026-05-10",
      assigned_to: "user2",
      assigned_name: "Mom",
      reminder_type: "weekly",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Clean Guest Room",
      description: "Prepare for weekend guests",
      column_id: "review",
      priority: "high",
      due_date: "2026-05-09",
      assigned_to: "user3",
      assigned_name: "John",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Water Plants",
      description: "Water all indoor plants",
      column_id: "done",
      priority: "low",
      assigned_to: "user1",
      assigned_name: "Sarah",
      reminder_type: "daily",
      is_completed: true,
      created_at: new Date().toISOString(),
    },
  ])

  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    due_date: "",
    assigned_to: "",
    reminder_type: "one-time" as const,
  })

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Math.random().toString(),
        ...newTask,
        column_id: "todo",
        created_at: new Date().toISOString(),
      }
      setTasks([...tasks, task])
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        due_date: "",
        assigned_to: "",
        reminder_type: "one-time",
      })
      setShowNewTaskForm(false)
    }
  }

  const handleMoveTask = (taskId: string, newColumnId: Task["column_id"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, column_id: newColumnId } : task
      )
    )
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.column_id === "todo").length,
    inProgress: tasks.filter((t) => t.column_id === "in-progress").length,
    review: tasks.filter((t) => t.column_id === "review").length,
    completed: tasks.filter((t) => t.column_id === "done").length,
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen scenic-overlay bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="decoration-top-right" />
        <div className="decoration-bottom-left" />

        <div className="container-scenic py-8 relative z-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Bell className="w-10 h-10 text-purple-600 animate-float" />
                <h1 className="text-5xl font-bold text-gradient-gold">
                  Reminders & Tasks
                </h1>
              </div>
              <Button
                onClick={() => setShowNewTaskForm(true)}
                className="btn-golden py-3 px-6 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Task
              </Button>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Organize family tasks with Kanban board
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="card-luxe p-4 text-center">
              <p className="text-2xl font-bold text-gradient-gold">
                {stats.total}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Total Tasks
              </p>
            </div>
            <div className="card-luxe p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.todo}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                To Do
              </p>
            </div>
            <div className="card-luxe p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {stats.inProgress}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                In Progress
              </p>
            </div>
            <div className="card-luxe p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">
                {stats.review}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                In Review
              </p>
            </div>
            <div className="card-luxe p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {stats.completed}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Completed
              </p>
            </div>
          </div>

          {/* New Task Form */}
          {showNewTaskForm && (
            <div className="card-luxe p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Create New Task</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    placeholder="e.g., Plan family outing"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    placeholder="Add details about this task"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 h-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        priority: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.due_date}
                    onChange={(e) =>
                      setNewTask({ ...newTask, due_date: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Recurring
                  </label>
                  <select
                    value={newTask.reminder_type}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        reminder_type: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="one-time">One Time</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="flex gap-3 md:col-span-2 pt-4">
                  <Button
                    onClick={handleAddTask}
                    className="btn-golden flex-1"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Task
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewTaskForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Kanban Board */}
          <KanbanBoard
            tasks={tasks}
            onMoveTask={handleMoveTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </>
  )
}
