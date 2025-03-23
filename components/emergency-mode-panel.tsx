"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, MapPin, Camera, Mic, Send } from "lucide-react"

export default function EmergencyModePanel() {
  const [activeTab, setActiveTab] = useState<"sos" | "evacuation" | "voice">("sos")

  return (
    <div className="overflow-hidden rounded-lg border border-red-500/30 bg-slate-800 shadow-lg">
      <div className="flex border-b border-slate-700">
        <button
          className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium ${
            activeTab === "sos" ? "bg-red-500/20 text-white" : "text-gray-400 hover:bg-slate-700 hover:text-white"
          }`}
          onClick={() => setActiveTab("sos")}
        >
          <AlertTriangle className="h-4 w-4" />
          SOS Alert
        </button>
        <button
          className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium ${
            activeTab === "evacuation"
              ? "bg-blue-500/20 text-white"
              : "text-gray-400 hover:bg-slate-700 hover:text-white"
          }`}
          onClick={() => setActiveTab("evacuation")}
        >
          <MapPin className="h-4 w-4" />
          Evacuation
        </button>
        <button
          className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium ${
            activeTab === "voice" ? "bg-purple-500/20 text-white" : "text-gray-400 hover:bg-slate-700 hover:text-white"
          }`}
          onClick={() => setActiveTab("voice")}
        >
          <Mic className="h-4 w-4" />
          Voice Command
        </button>
      </div>

      <div className="p-4">
        {activeTab === "sos" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="rounded-lg bg-red-500/10 p-3">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Emergency SOS Alert
              </h3>
              <p className="mt-1 text-sm text-gray-300">
                Send an SOS alert to emergency services and nearby volunteers. Your location will be automatically
                shared.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Your current location</label>
                <div className="flex items-center rounded-md bg-slate-700 p-3">
                  <MapPin className="mr-2 h-5 w-5 text-red-400" />
                  <span className="text-sm text-white">34.052235, -118.243683</span>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Emergency type</label>
                <select className="w-full rounded-md bg-slate-700 p-3 text-sm text-white">
                  <option>Fire Emergency</option>
                  <option>Medical Emergency</option>
                  <option>Trapped/Structural Damage</option>
                  <option>Flooding</option>
                  <option>Other Emergency</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Describe your situation</label>
              <textarea
                className="h-20 w-full rounded-md bg-slate-700 p-3 text-sm text-white placeholder-gray-400"
                placeholder="Provide details about your emergency..."
              />
            </div>

            <div className="flex gap-2">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-slate-700 p-3 text-sm font-medium text-white hover:bg-slate-600">
                <Camera className="h-5 w-5" />
                <span>Add Photo</span>
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-slate-700 p-3 text-sm font-medium text-white hover:bg-slate-600">
                <Mic className="h-5 w-5" />
                <span>Voice Note</span>
              </button>
            </div>

            <button className="w-full rounded-md bg-red-600 p-3 text-lg font-bold text-white hover:bg-red-700">
              Send SOS Alert
            </button>
          </motion.div>
        )}

        {activeTab === "evacuation" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                <MapPin className="h-5 w-5 text-blue-500" />
                Evacuation Routes
              </h3>
              <p className="mt-1 text-sm text-gray-300">
                Find the safest evacuation route to the nearest shelter or safe zone based on your current location.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Your current location</label>
                <div className="flex items-center rounded-md bg-slate-700 p-3">
                  <MapPin className="mr-2 h-5 w-5 text-blue-400" />
                  <span className="text-sm text-white">34.052235, -118.243683</span>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Evacuation destination</label>
                <select className="w-full rounded-md bg-slate-700 p-3 text-sm text-white">
                  <option>Nearest Shelter</option>
                  <option>Nearest Medical Facility</option>
                  <option>Nearest Police Station</option>
                  <option>Custom Location</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Transportation method</label>
              <div className="grid grid-cols-3 gap-2">
                <button className="rounded-md bg-blue-500/20 p-2 text-sm text-white hover:bg-blue-500/30">
                  Walking
                </button>
                <button className="rounded-md bg-slate-700 p-2 text-sm text-white hover:bg-slate-600">Driving</button>
                <button className="rounded-md bg-slate-700 p-2 text-sm text-white hover:bg-slate-600">
                  Public Transit
                </button>
              </div>
            </div>

            <button className="w-full rounded-md bg-blue-600 p-3 text-lg font-bold text-white hover:bg-blue-700">
              Find Evacuation Route
            </button>
          </motion.div>
        )}

        {activeTab === "voice" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="rounded-lg bg-purple-500/10 p-3">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                <Mic className="h-5 w-5 text-purple-500" />
                Voice Commands
              </h3>
              <p className="mt-1 text-sm text-gray-300">
                Use voice commands to quickly report emergencies or find help when you can't type.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 py-6">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-purple-500/20"
              >
                <Mic className="h-12 w-12 text-purple-400" />
              </motion.div>

              <p className="text-center text-sm text-gray-300">Tap the microphone and say a command like:</p>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="rounded-md bg-slate-700 p-2 text-white">"Report fire at my location"</div>
                <div className="rounded-md bg-slate-700 p-2 text-white">"Find nearest shelter"</div>
                <div className="rounded-md bg-slate-700 p-2 text-white">"Send medical SOS"</div>
                <div className="rounded-md bg-slate-700 p-2 text-white">"Call emergency services"</div>
              </div>
            </div>

            <div className="flex">
              <input
                type="text"
                className="flex-1 rounded-l-md bg-slate-700 p-3 text-sm text-white placeholder-gray-400"
                placeholder="Type a command instead..."
              />
              <button className="rounded-r-md bg-purple-600 px-4 text-white hover:bg-purple-700">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

