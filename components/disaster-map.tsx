"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, AlertTriangle, Droplets, Home } from "lucide-react"
import { motion } from "framer-motion"

// Mock disaster data
const DISASTERS = [
  { id: 1, type: "fire", lat: 34.05, lng: -118.25, severity: "critical", sos: 3 },
  { id: 2, type: "flood", lat: 34.07, lng: -118.3, severity: "moderate", sos: 1 },
  { id: 3, type: "earthquake", lat: 34.09, lng: -118.22, severity: "critical", sos: 5 },
  { id: 4, type: "fire", lat: 34.03, lng: -118.2, severity: "moderate", sos: 2 },
  { id: 5, type: "flood", lat: 34.06, lng: -118.27, severity: "low", sos: 0 },
]

export default function DisasterMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedDisaster, setSelectedDisaster] = useState<number | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const getDisasterIcon = (type: string) => {
    switch (type) {
      case "fire":
        return <AlertTriangle className="h-6 w-6 text-red-500" />
      case "flood":
        return <Droplets className="h-6 w-6 text-blue-500" />
      case "earthquake":
        return <Home className="h-6 w-6 text-amber-500" />
      default:
        return <MapPin className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="relative h-full w-full">
      {/* Map Background */}
      <div
        ref={mapRef}
        className="h-full w-full bg-slate-800 bg-opacity-80"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
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
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Disaster Markers */}
      {mapLoaded &&
        DISASTERS.map((disaster) => (
          <motion.div
            key={disaster.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: disaster.id * 0.2, type: "spring" }}
            className={`absolute z-10 cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
            style={{
              left: `${(disaster.lng + 118.35) * 100}%`,
              top: `${(34.12 - disaster.lat) * 100}%`,
            }}
            onClick={() => setSelectedDisaster(disaster.id === selectedDisaster ? null : disaster.id)}
          >
            <div className="relative">
              {getDisasterIcon(disaster.type)}

              {/* SOS Pulse Effect */}
              {disaster.sos > 0 && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-red-500"
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 2 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {disaster.sos}
                  </div>
                </>
              )}
            </div>

            {/* Info Card on Selection */}
            {selectedDisaster === disaster.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-6 top-0 w-64 rounded-lg bg-slate-800 p-3 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold capitalize text-white">{disaster.type} Emergency</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      disaster.severity === "critical"
                        ? "bg-red-500/20 text-red-300"
                        : disaster.severity === "moderate"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-green-500/20 text-green-300"
                    }`}
                  >
                    {disaster.severity}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-300">{disaster.sos} active SOS requests</p>
                <div className="mt-2 flex gap-2">
                  <button className="flex-1 rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-700">
                    View Details
                  </button>
                  <button className="flex-1 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700">
                    Respond
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}

      {/* Map Controls */}
      <div className="absolute bottom-24 right-4 z-10 flex flex-col gap-2 md:bottom-8 md:right-8">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100">
          <span className="text-xl font-bold">+</span>
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100">
          <span className="text-xl font-bold">−</span>
        </button>
        <button className="mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100">
          <span className="text-xl">🔍</span>
        </button>
      </div>

      {/* Map Type Selector */}
      <div className="absolute right-4 top-4 z-10 rounded-lg bg-white bg-opacity-10 p-1 backdrop-blur-sm md:right-8 md:top-8">
        <div className="flex gap-1">
          <button className="rounded px-3 py-1 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10">
            Map
          </button>
          <button className="rounded bg-white bg-opacity-20 px-3 py-1 text-sm font-medium text-white">Satellite</button>
        </div>
      </div>
    </div>
  )
}

