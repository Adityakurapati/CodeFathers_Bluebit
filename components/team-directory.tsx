"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, User, Phone, MessageSquare } from "lucide-react"

// Mock team data
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "John Medic",
    role: "Medical Team",
    status: "active",
    lastActive: "2 min ago",
  },
  {
    id: 2,
    name: "Sarah Coordinator",
    role: "Coordination Lead",
    status: "active",
    lastActive: "Just now",
  },
  {
    id: 3,
    name: "Mike Rescue",
    role: "Rescue Team",
    status: "busy",
    lastActive: "5 min ago",
  },
  {
    id: 4,
    name: "Lisa Logistics",
    role: "Supply Chain",
    status: "away",
    lastActive: "15 min ago",
  },
  {
    id: 5,
    name: "David Tech",
    role: "Technical Support",
    status: "offline",
    lastActive: "1 hour ago",
  },
]

export default function TeamDirectory() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMembers = TEAM_MEMBERS.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "active":
        return <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-slate-800" />
      case "busy":
        return <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-red-500 ring-2 ring-slate-800" />
      case "away":
        return <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-amber-500 ring-2 ring-slate-800" />
      default:
        return <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-500 ring-2 ring-slate-800" />
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Team Directory</h2>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search team members..."
          className="w-full rounded-md bg-slate-700 py-2 pl-9 pr-4 text-sm text-white placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-3 overflow-y-auto pr-1" style={{ maxHeight: "280px" }}>
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between rounded-lg bg-slate-700 p-3 hover:bg-slate-600"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-600">
                  <User className="h-5 w-5 text-white" />
                </div>
                {getStatusIndicator(member.status)}
              </div>
              <div>
                <h3 className="font-medium text-white">{member.name}</h3>
                <p className="text-xs text-gray-300">{member.role}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button className="rounded-full bg-slate-600 p-1.5 text-gray-300 hover:bg-slate-500 hover:text-white">
                <MessageSquare className="h-4 w-4" />
              </button>
              <button className="rounded-full bg-slate-600 p-1.5 text-gray-300 hover:bg-slate-500 hover:text-white">
                <Phone className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

