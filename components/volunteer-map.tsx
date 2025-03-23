"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Truck, Activity } from "lucide-react"

// Mock volunteer data
const VOLUNTEERS = [
  { id: 1, name: "John D.", type: "medical", lat: 34.06, lng: -118.24 },
  { id: 2, name: "Sarah M.", type: "rescue", lat: 34.05, lng: -118.26 },
  { id: 3, name: "Mike T.", type: "logistics", lat: 34.07, lng: -118.28 },
  { id: 4, name: "Lisa K.", type: "medical", lat: 34.04, lng: -118.22 },
  { id: 5, name: "Robert J.", type: "rescue", lat: 34.08, lng: -118.25 },
]

export default function VolunteerMap() {
  const [selectedVolunteer, setSelectedVolunteer] = useState<number | null>(null)

  const getVolunteerIcon = (type: string) => {
    switch (type) {
      case "medical":
        return <Activity className="h-4 w-4 text-red-400" />
      case "rescue":
        return <User className="h-4 w-4 text-amber-400" />
      case "logistics":
        return <Truck className="h-4 w-4 text-blue-400" />
      default:
        return <User className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Volunteer Locations</h2>

      <div className="relative h-72 w-full overflow-hidden rounded-lg bg-slate-700">
        {/* Map Background */}
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url('/placeholder.svg?height=400&width=600')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Map Overlay with Grid */}
        <div className="absolute inset-0 bg-slate-900 bg-opacity-30">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        {/* Volunteer Markers */}
        {VOLUNTEERS.map((volunteer) => (
          <motion.div
            key={volunteer.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: volunteer.id * 0.1, type: "spring" }}
            className="absolute z-10 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(volunteer.lng + 118.35) * 100}%`,
              top: `${(34.12 - volunteer.lat) * 100}%`,
            }}
            onClick={() => setSelectedVolunteer(volunteer.id === selectedVolunteer ? null : volunteer.id)}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                volunteer.type === "medical"
                  ? "bg-red-500/20"
                  : volunteer.type === "rescue"
                    ? "bg-amber-500/20"
                    : "bg-blue-500/20"
              }`}
            >
              {getVolunteerIcon(volunteer.type)}
            </div>

            {/* Info Card on Selection */}
            {selectedVolunteer === volunteer.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-6 top-0 w-40 rounded-lg bg-slate-800 p-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      volunteer.type === "medical"
                        ? "bg-red-500/20"
                        : volunteer.type === "rescue"
                          ? "bg-amber-500/20"
                          : "bg-blue-500/20"
                    }`}
                  >
                    {getVolunteerIcon(volunteer.type)}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{volunteer.name}</h3>
                    <p className="text-xs capitalize text-gray-400">{volunteer.type}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Map Controls */}
        <div className="absolute bottom-2 right-2 z-10 flex gap-1">
          <button className="flex h-6 w-6 items-center justify-center rounded bg-slate-800 text-white hover:bg-slate-700">
            <span className="text-sm font-bold">+</span>
          </button>
          <button className="flex h-6 w-6 items-center justify-center rounded bg-slate-800 text-white hover:bg-slate-700">
            <span className="text-sm font-bold">−</span>
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <div className="flex items-center gap-1 rounded bg-slate-700 px-2 py-1 text-xs text-white">
          <div className="h-3 w-3 rounded-full bg-red-500/20">
            <Activity className="h-3 w-3 text-red-400" />
          </div>
          <span>Medical</span>
        </div>
        <div className="flex items-center gap-1 rounded bg-slate-700 px-2 py-1 text-xs text-white">
          <div className="h-3 w-3 rounded-full bg-amber-500/20">
            <User className="h-3 w-3 text-amber-400" />
          </div>
          <span>Rescue</span>
        </div>
        <div className="flex items-center gap-1 rounded bg-slate-700 px-2 py-1 text-xs text-white">
          <div className="h-3 w-3 rounded-full bg-blue-500/20">
            <Truck className="h-3 w-3 text-blue-400" />
          </div>
          <span>Logistics</span>
        </div>
      </div>
    </div>
  )
}

