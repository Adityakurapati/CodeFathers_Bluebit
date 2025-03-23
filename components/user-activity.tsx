"use client"

import { motion } from "framer-motion"
import { Clock, CheckCircle, AlertTriangle, MapPin, MessageSquare } from "lucide-react"

// Mock activity data
const ACTIVITIES = [
  {
    id: 1,
    type: "response",
    description: "Responded to medical emergency at Riverside Shelter",
    time: "Today, 10:30 AM",
    status: "completed",
  },
  {
    id: 2,
    type: "alert",
    description: "Issued evacuation order for Zone B",
    time: "Today, 9:15 AM",
    status: "completed",
  },
  {
    id: 3,
    type: "deployment",
    description: "Deployed resources to Downtown Medical Center",
    time: "Yesterday, 4:45 PM",
    status: "completed",
  },
  {
    id: 4,
    type: "communication",
    description: "Coordinated with rescue teams for eastern district",
    time: "Yesterday, 2:30 PM",
    status: "completed",
  },
  {
    id: 5,
    type: "alert",
    description: "Updated flood warning for coastal areas",
    time: "2 days ago, 11:20 AM",
    status: "completed",
  },
]

export default function UserActivity() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "response":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      case "deployment":
        return <MapPin className="h-5 w-5 text-blue-400" />
      case "communication":
        return <MessageSquare className="h-5 w-5 text-purple-400" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Recent Activity</h2>

      <div className="relative pl-6">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-2.5 top-0 w-px bg-slate-700" />

        <div className="space-y-4">
          {ACTIVITIES.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div
                className={`absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full ${
                  activity.type === "response"
                    ? "bg-green-500/20"
                    : activity.type === "alert"
                      ? "bg-red-500/20"
                      : activity.type === "deployment"
                        ? "bg-blue-500/20"
                        : "bg-purple-500/20"
                }`}
              >
                {getActivityIcon(activity.type)}
              </div>

              <div className="rounded-lg bg-slate-700 p-3">
                <h3 className="font-medium text-white">{activity.description}</h3>
                <p className="text-xs text-gray-300">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <button className="mt-4 w-full rounded-md bg-slate-700 p-2 text-sm text-white hover:bg-slate-600">
        View All Activity
      </button>
    </div>
  )
}

