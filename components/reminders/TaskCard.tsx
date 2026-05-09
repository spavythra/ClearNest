"use client"

import { Task } from "@/app/reminders/page"
import { Button } from "@/components/ui/button"
import { Trash2, ChevronRight, Calendar, User } from "lucide-react"
import { useState } from "react"

interface TaskCardProps {
  task: Task
  onMove: () => void
  onDelete: () => void
  nextColumnName: string
}

export function TaskCard({
  task,
  onMove,
  onDelete,
  nextColumnName,
}: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const priorityColors = {
    low: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
    medium:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200",
    high: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200",
  }

  const isOverdue =
    task.due_date &&
    new Date(task.due_date) < new Date() &&
    task.column_id !== "done"

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="card-luxe p-4 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group"
    >
      {/* Header with Priority Badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 line-clamp-2">
            {task.title}
          </h4>
        </div>
        {isHovered && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        )}
      </div>

      {/* Priority Badge */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${priorityColors[task.priority]}`}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        {task.reminder_type && task.reminder_type !== "one-time" && (
          <span className="text-xs px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
            🔄 {task.reminder_type}
          </span>
        )}
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Due Date & Assignee */}
      <div className="space-y-2 mb-4 text-xs">
        {task.due_date && (
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Calendar className="w-3 h-3" />
            <span
              className={`${
                isOverdue ? "text-red-600 dark:text-red-400 font-semibold" : ""
              }`}
            >
              {new Date(task.due_date).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        )}
        {task.assigned_name && (
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <User className="w-3 h-3" />
            <span>{task.assigned_name}</span>
          </div>
        )}
      </div>

      {/* Move Button */}
      <Button
        size="sm"
        onClick={onMove}
        className="w-full btn-golden text-xs py-1.5 flex items-center justify-center gap-2"
      >
        Move to {nextColumnName}
        <ChevronRight className="w-3 h-3" />
      </Button>
    </div>
  )
}
