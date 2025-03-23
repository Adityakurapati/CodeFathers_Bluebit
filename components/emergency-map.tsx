"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Navigation } from "lucide-react"

export default function EmergencyMap() {
  const [routeVisible, setRouteVisible] = useState(false)

  useEffect(() => {
    // Simulate route loading
    const timer = setTimeout(() => {
      setRouteVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Evacuation Map</h2>

      <div className="relative h-64 w-full overflow-hidden rounded-lg">
        {/* Map Background */}
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url('/placeholder.svg?height=400&width=800')",
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

        {/* Current Location Marker */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute left-1/4 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white">
            Your Location
          </div>
        </motion.div>

        {/* Shelter Location Marker */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute right-1/4 top-1/3 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
            <Navigation className="h-5 w-5 text-white" />
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white">
            Nearest Shelter
          </div>
        </motion.div>

        {/* Evacuation Route */}
        {routeVisible && (
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 z-5"
          >
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path
                d="M 25% 50% Q 40% 30% 50% 40% T 75% 33%"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="0 10"
                filter="url(#glow)"
                className="animate-dash"
              />
            </svg>
          </motion.div>
        )}

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

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-white">
          <span className="font-medium">Distance:</span> 1.2 miles
        </div>
        <div className="text-sm text-white">
          <span className="font-medium">ETA:</span> 25 min (walking)
        </div>
      </div>
    </div>
  )
}

