"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Truck, Warehouse } from "lucide-react"

// Mock location data
const LOCATIONS = [
  { id: 1, type: "warehouse", name: "Main Warehouse", lat: 34.06, lng: -118.24 },
  { id: 2, type: "distribution", name: "Distribution Center", lat: 34.05, lng: -118.26 },
  { id: 3, type: "vehicle", name: "Truck #103", lat: 34.07, lng: -118.28 },
  { id: 4, type: "vehicle", name: "Van #87", lat: 34.04, lng: -118.22 },
]

export default function ResourceMap() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "warehouse":
        return <Warehouse className="h-4 w-4 text-blue-400" />
      case "distribution":
        return <MapPin className="h-4 w-4 text-green-400" />
      case "vehicle":
        return <Truck className="h-4 w-4 text-amber-400" />
      default:
        return <MapPin className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Resource Locations</h2>

      <div className="relative h-64 w-full overflow-hidden rounded-lg bg-slate-700">
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

        {/* Location Markers */}
        {LOCATIONS.map((location) => (
          <motion.div
            key={location.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: location.id * 0.1, type: "spring" }}
            className="absolute z-10 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(location.lng + 118.35) * 100}%`,
              top: `${(34.12 - location.lat) * 100}%`,
            }}
            onClick={() => setSelectedLocation(location.id === selectedLocation ? null : location.id)}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                location.type === "warehouse"
                  ? "bg-blue-500/20"
                  : location.type === "distribution"
                    ? "bg-green-500/20"
                    : "bg-amber-500/20"
              }`}
            >
              {getLocationIcon(location.type)}
            </div>

            {/* Info Card on Selection */}
            {selectedLocation === location.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-6 top-0 w-40 rounded-lg bg-slate-800 p-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      location.type === "warehouse"
                        ? "bg-blue-500/20"
                        : location.type === "distribution"
                          ? "bg-green-500/20"
                          : "bg-amber-500/20"
                    }`}
                  >
                    {getLocationIcon(location.type)}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{location.name}</h3>
                    <p className="text-xs capitalize text-gray-400">{location.type}</p>
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
          <div className="h-3 w-3 rounded-full bg-blue-500/20">
            <Warehouse className="h-3 w-3 text-blue-400" />
          </div>
          <span>Warehouse</span>
        </div>
        <div className="flex items-center gap-1 rounded bg-slate-700 px-2 py-1 text-xs text-white">
          <div className="h-3 w-3 rounded-full bg-green-500/20">
            <MapPin className="h-3 w-3 text-green-400" />
          </div>
          <span>Distribution</span>
        </div>
        <div className="flex items-center gap-1 rounded bg-slate-700 px-2 py-1 text-xs text-white">
          <div className="h-3 w-3 rounded-full bg-amber-500/20">
            <Truck className="h-3 w-3 text-amber-400" />
          </div>
          <span>Vehicle</span>
        </div>
      </div>
    </div>
  )
}

