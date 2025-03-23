"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Package, Clock, CheckCircle, X } from "lucide-react"

// Mock request data
const REQUESTS = [
  {
    id: 1,
    location: "Riverside Shelter",
    items: [
      { name: "Water", quantity: 200, unit: "gallons" },
      { name: "Food", quantity: 100, unit: "packages" },
    ],
    priority: "high",
    timeSubmitted: "30 min ago",
  },
  {
    id: 2,
    location: "Medical Center",
    items: [{ name: "Medical Kits", quantity: 25, unit: "kits" }],
    priority: "critical",
    timeSubmitted: "15 min ago",
  },
  {
    id: 3,
    location: "Evacuation Zone B",
    items: [
      { name: "Blankets", quantity: 50, unit: "units" },
      { name: "Power Banks", quantity: 20, unit: "units" },
    ],
    priority: "medium",
    timeSubmitted: "45 min ago",
  },
]

export default function ResourceRequests() {
  const [requests, setRequests] = useState(REQUESTS)

  const approveRequest = (id: number) => {
    setRequests((prev) => prev.filter((request) => request.id !== id))
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">Critical</span>
      case "high":
        return <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">High</span>
      case "medium":
        return <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">Medium</span>
      default:
        return <span className="rounded-full bg-gray-500/20 px-2 py-0.5 text-xs font-medium text-gray-400">Low</span>
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Resource Requests</h2>

      <div className="space-y-3 overflow-y-auto pr-1" style={{ maxHeight: "280px" }}>
        {requests.map((request) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg bg-slate-700 p-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                  <Package className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{request.location}</h3>
                    {getPriorityBadge(request.priority)}
                  </div>
                  <div className="mt-1 space-y-1">
                    {request.items.map((item, index) => (
                      <p key={index} className="text-sm text-gray-300">
                        {item.quantity} {item.unit} of {item.name}
                      </p>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>Requested {request.timeSubmitted}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => approveRequest(request.id)}
                  className="rounded-full bg-green-500/20 p-1.5 text-green-400 hover:bg-green-500/30"
                  title="Approve"
                >
                  <CheckCircle className="h-4 w-4" />
                </button>
                <button className="rounded-full bg-red-500/20 p-1.5 text-red-400 hover:bg-red-500/30" title="Reject">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="mt-3 w-full rounded-md bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-700">
        View All Requests
      </button>
    </div>
  )
}

