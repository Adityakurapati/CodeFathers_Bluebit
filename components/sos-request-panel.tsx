"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, User, Clock, MapPin, MessageSquare, CheckCircle } from "lucide-react"

// Mock SOS request data
const SOS_REQUESTS = [
  {
    id: 1,
    user: "Maria Garcia",
    type: "Medical Emergency",
    location: "Downtown, Block 23",
    time: "5 min ago",
    description: "Elderly person needs medical attention, possible heart issue",
    priority: "critical",
    images: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: 2,
    user: "John Smith",
    type: "Trapped in Building",
    location: "Westside Apartments",
    time: "12 min ago",
    description: "Family trapped on 3rd floor, building partially collapsed",
    priority: "critical",
    images: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: 3,
    user: "Alex Johnson",
    type: "Fire Spreading",
    location: "Pine Street",
    time: "18 min ago",
    description: "Fire spreading to residential area, need immediate response",
    priority: "high",
    images: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: 4,
    user: "Sarah Williams",
    type: "Flooding",
    location: "Riverside Community",
    time: "25 min ago",
    description: "Water rising rapidly, need evacuation assistance",
    priority: "moderate",
    images: ["/placeholder.svg?height=200&width=300"],
  },
]

export default function SOSRequestPanel() {
  const [expandedRequest, setExpandedRequest] = useState<number | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "moderate":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">SOS Requests</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Filter:</span>
          <select className="rounded bg-slate-700 px-2 py-1 text-sm text-white">
            <option>All Priorities</option>
            <option>Critical</option>
            <option>High</option>
            <option>Moderate</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {SOS_REQUESTS.map((request) => (
          <motion.div
            key={request.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`overflow-hidden rounded-lg border ${
              expandedRequest === request.id ? "border-blue-500/50" : "border-slate-700"
            } bg-slate-700 transition-colors hover:bg-slate-600`}
          >
            <div
              className="cursor-pointer p-3"
              onClick={() => setExpandedRequest(expandedRequest === request.id ? null : request.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className={`h-5 w-5 ${
                      request.priority === "critical"
                        ? "text-red-500"
                        : request.priority === "high"
                          ? "text-orange-500"
                          : "text-amber-500"
                    }`}
                  />
                  <span className="font-medium text-white">{request.type}</span>
                </div>
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getPriorityColor(request.priority)}`}
                >
                  {request.priority}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-300">
                <div className="flex items-center">
                  <User className="mr-1 h-3 w-3" />
                  {request.user}
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  {request.location}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {request.time}
                </div>
              </div>
            </div>

            {/* Expanded View */}
            {expandedRequest === request.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-slate-600 bg-slate-800 p-3"
              >
                <p className="mb-3 text-sm text-gray-300">{request.description}</p>

                {request.images.length > 0 && (
                  <div className="mb-3 overflow-x-auto">
                    <div className="flex gap-2">
                      {request.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img || "/placeholder.svg"}
                          alt={`SOS image ${idx + 1}`}
                          className="h-24 w-40 rounded object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button className="flex flex-1 items-center justify-center gap-1 rounded bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700">
                    <CheckCircle className="h-4 w-4" />
                    Claim Task
                  </button>
                  <button className="flex items-center justify-center gap-1 rounded bg-slate-700 px-3 py-2 text-sm font-medium text-white hover:bg-slate-600">
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

