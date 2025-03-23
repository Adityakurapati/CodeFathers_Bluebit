"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Radio, Users, Shield, AlertTriangle, ChevronRight } from "lucide-react"

// Mock channel data
const CHANNELS = [
  {
    id: 1,
    name: "Emergency Alerts",
    type: "emergency",
    members: 245,
    status: "active",
  },
  {
    id: 2,
    name: "Medical Team",
    type: "team",
    members: 32,
    status: "active",
  },
  {
    id: 3,
    name: "Rescue Operations",
    type: "team",
    members: 48,
    status: "active",
  },
  {
    id: 4,
    name: "Logistics & Supply",
    type: "team",
    members: 27,
    status: "active",
  },
  {
    id: 5,
    name: "Public Information",
    type: "public",
    members: 1243,
    status: "active",
  },
]

export default function CommunicationChannels() {
  const [activeTab, setActiveTab] = useState<"all" | "emergency" | "team" | "public">("all")

  const filteredChannels = CHANNELS.filter((channel) => activeTab === "all" || channel.type === activeTab)

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      case "team":
        return <Shield className="h-4 w-4 text-blue-400" />
      case "public":
        return <Users className="h-4 w-4 text-green-400" />
      default:
        return <Radio className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Communication Channels</h2>

      <div className="mb-3 flex">
        <button
          className={`flex-1 border-b-2 px-2 py-1 text-sm font-medium ${
            activeTab === "all"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button
          className={`flex-1 border-b-2 px-2 py-1 text-sm font-medium ${
            activeTab === "emergency"
              ? "border-red-500 text-red-400"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("emergency")}
        >
          Emergency
        </button>
        <button
          className={`flex-1 border-b-2 px-2 py-1 text-sm font-medium ${
            activeTab === "team"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("team")}
        >
          Team
        </button>
        <button
          className={`flex-1 border-b-2 px-2 py-1 text-sm font-medium ${
            activeTab === "public"
              ? "border-green-500 text-green-400"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("public")}
        >
          Public
        </button>
      </div>

      <div className="space-y-2 overflow-y-auto pr-1" style={{ maxHeight: "220px" }}>
        {filteredChannels.map((channel, index) => (
          <motion.div
            key={channel.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between rounded-lg bg-slate-700 p-3 hover:bg-slate-600"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  channel.type === "emergency"
                    ? "bg-red-500/20"
                    : channel.type === "team"
                      ? "bg-blue-500/20"
                      : "bg-green-500/20"
                }`}
              >
                {getChannelIcon(channel.type)}
              </div>
              <div>
                <h3 className="font-medium text-white">{channel.name}</h3>
                <p className="text-xs text-gray-300">{channel.members} members</p>
              </div>
            </div>
            <button className="rounded-full p-1 text-gray-400 hover:bg-slate-500 hover:text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        ))}
      </div>

      <button className="mt-3 w-full rounded-md bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-700">
        Create New Channel
      </button>
    </div>
  )
}

