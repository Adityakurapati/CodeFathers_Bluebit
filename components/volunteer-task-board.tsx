"use client"

import { motion } from "framer-motion"
import { Users, ShieldAlert, Truck, Activity } from "lucide-react"

// Mock task data
const TASKS = [
  { id: 1, type: "medical", total: 24, completed: 15 },
  { id: 2, type: "rescue", total: 18, completed: 7 },
  { id: 3, type: "logistics", total: 32, completed: 20 },
  { id: 4, type: "assessment", total: 15, completed: 12 },
]

export default function VolunteerTaskBoard() {
  const getTaskIcon = (type: string) => {
    switch (type) {
      case "medical":
        return <Activity className="h-5 w-5 text-red-400" />
      case "rescue":
        return <ShieldAlert className="h-5 w-5 text-amber-400" />
      case "logistics":
        return <Truck className="h-5 w-5 text-blue-400" />
      case "assessment":
        return <Users className="h-5 w-5 text-green-400" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Volunteer Task Board</h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {TASKS.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: task.id * 0.1 }}
            className="rounded-lg bg-slate-700 p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-600">
                {getTaskIcon(task.type)}
              </div>
              <span className="text-xs font-medium text-gray-300">
                {task.completed}/{task.total}
              </span>
            </div>

            <h3 className="mb-1 text-sm font-medium capitalize text-white">{task.type} Tasks</h3>

            <div className="h-2 overflow-hidden rounded-full bg-slate-600">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(task.completed / task.total) * 100}%` }}
                transition={{ delay: 0.5, duration: 1 }}
                className={`h-full ${
                  task.type === "medical"
                    ? "bg-red-500"
                    : task.type === "rescue"
                      ? "bg-amber-500"
                      : task.type === "logistics"
                        ? "bg-blue-500"
                        : "bg-green-500"
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

