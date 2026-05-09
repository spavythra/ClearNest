"use client"

import { Task } from "@/app/reminders/page"
import { TaskCard } from "./TaskCard"
import { ChevronDown } from "lucide-react"

interface KanbanColumnProps {
  column: {
    id: Task["column_id"]
    title: string
    color: string
    icon: string
  }
  tasks: Task[]
  onMoveTask: (taskId: string, newColumnId: Task["column_id"]) => void
  onDeleteTask: (taskId: string) => void
}

const colorClasses = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    header: "bg-blue-100 dark:bg-blue-900/40",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200",
  },
  yellow: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-800",
    header: "bg-yellow-100 dark:bg-yellow-900/40",
    badge:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-200",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    header: "bg-orange-100 dark:bg-orange-900/40",
    badge:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    header: "bg-green-100 dark:bg-green-900/40",
    badge:
      "bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-200",
  },
}

export function KanbanColumn({
  column,
  tasks,
  onMoveTask,
  onDeleteTask,
}: KanbanColumnProps) {
  const colors = colorClasses[column.color as keyof typeof colorClasses]

  const nextColumns: Task["column_id"][] = {
    todo: "in-progress",
    "in-progress": "review",
    review: "done",
    done: "todo",
  }

  const nextColumn = nextColumns[column.id]

  return (
    <div
      className={`${colors.bg} ${colors.border} border rounded-xl p-4 min-h-96`}
    >
      {/* Column Header */}
      <div className={`${colors.header} rounded-lg px-4 py-3 mb-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{column.icon}</span>
            <h3 className="font-bold text-lg">{column.title}</h3>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white dark:bg-slate-800">
              {tasks.length}
            </span>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={() => onMoveTask(task.id, nextColumn)}
              onDelete={() => onDeleteTask(task.id)}
              nextColumnName={
                column.id === "todo"
                  ? "In Progress"
                  : column.id === "in-progress"
                    ? "Review"
                    : column.id === "review"
                      ? "Done"
                      : "To Do"
              }
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No tasks yet
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
              Drag tasks here or create new ones
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
