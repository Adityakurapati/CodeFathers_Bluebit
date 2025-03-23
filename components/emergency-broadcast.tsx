"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Radio, Users, MapPin, AlertTriangle, Shield } from "lucide-react"

export default function EmergencyBroadcast() {
  const [message, setMessage] = useState("")
  const [selectedChannel, setSelectedChannel] = useState("all")
  const [selectedZone, setSelectedZone] = useState("all")

  const sendBroadcast = () => {
    if (message.trim() === "") return
    alert(`Broadcast sent to ${selectedChannel} in zone ${selectedZone}: ${message}`)
    setMessage("")
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Emergency Broadcast</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Broadcast Channel</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`flex items-center justify-center gap-1 rounded-md p-2 text-sm ${
                  selectedChannel === "all" ? "bg-blue-600 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                onClick={() => setSelectedChannel("all")}
              >
                <Radio className="h-4 w-4" />
                <span>All Channels</span>
              </button>
              <button
                className={`flex items-center justify-center gap-1 rounded-md p-2 text-sm ${
                  selectedChannel === "emergency"
                    ? "bg-red-600 text-white"
                    : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                onClick={() => setSelectedChannel("emergency")}
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Emergency Only</span>
              </button>
              <button
                className={`flex items-center justify-center gap-1 rounded-md p-2 text-sm ${
                  selectedChannel === "responders"
                    ? "bg-amber-600 text-white"
                    : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                onClick={() => setSelectedChannel("responders")}
              >
                <Shield className="h-4 w-4" />
                <span>Responders</span>
              </button>
              <button
                className={`flex items-center justify-center gap-1 rounded-md p-2 text-sm ${
                  selectedChannel === "civilians"
                    ? "bg-green-600 text-white"
                    : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                onClick={() => setSelectedChannel("civilians")}
              >
                <Users className="h-4 w-4" />
                <span>Civilians</span>
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Target Zone</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`flex items-center justify-center gap-1 rounded-md p-2 text-sm ${
                  selectedZone === "all" ? "bg-blue-600 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                onClick={() => setSelectedZone("all")}
              >
                <MapPin className="h-4 w-4" />
                <span>All Zones</span>
              </button>
              <button
                className={`flex items-center justify-center gap-1 rounded-md p-2 text-sm ${
                  selectedZone === "zone-a" ? "bg-purple-600 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                onClick={() => setSelectedZone("zone-a")}
              >
                <MapPin className="h-4 w-4" />
                <span>Zone A</span>
              </button>
              <button
                className={`flex items-center justify-center gap-1 rounded-md p-2 text-sm ${
                  selectedZone === "zone-b" ? "bg-purple-600 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                onClick={() => setSelectedZone("zone-b")}
              >
                <MapPin className="h-4 w-4" />
                <span>Zone B</span>
              </button>
              <button
                className={`flex items-center justify-center gap-1 rounded-md p-2 text-sm ${
                  selectedZone === "zone-c" ? "bg-purple-600 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                onClick={() => setSelectedZone("zone-c")}
              >
                <MapPin className="h-4 w-4" />
                <span>Zone C</span>
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">Broadcast Message</label>
          <textarea
            className="h-20 w-full resize-none rounded-md bg-slate-700 p-3 text-sm text-white placeholder-gray-400"
            placeholder="Type your emergency broadcast message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
            onClick={sendBroadcast}
          >
            <Radio className="h-5 w-5" />
            <span>Send Broadcast</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

