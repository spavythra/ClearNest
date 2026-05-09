"use client"

import { Task } from "@/app/reminders/page"
import { KanbanColumn } from "./KanbanColumn"

interface KanbanBoardProps {
  tasks: Task[]
  onMoveTask: (taskId: string, newColumnId: Task["column_id"]) => void
  onDeleteTask: (taskId: string) => void
}

const columns: Array<{
  id: Task["column_id"]
  title: string
  color: string
  icon: string
}> = [
  { id: "todo", title: "To Do", color: "blue", icon: "📋" },
  { id: "in-progress", title: "In Progress", color: "yellow", icon: "⚙️" },
  { id: "review", title: "Review", color: "orange", icon: "👁️" },
  { id: "done", title: "Done", color: "green", icon: "✅" },
]

export function KanbanBoard({
  tasks,
  onMoveTask,
  onDeleteTask,
}: KanbanBoardProps) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-w-full">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks.filter((t) => t.column_id === column.id)}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  )
}
