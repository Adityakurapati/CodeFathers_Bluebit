"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Info, AlertTriangle, Droplets, Wind, Flame } from "lucide-react"

// Mock risk zone data
const RISK_ZONES = [
  { id: 1, x: 20, y: 30, radius: 60, risk: 85, type: "flood", description: "Flood-prone area near river" },
  {
    id: 2,
    x: 70,
    y: 40,
    radius: 50,
    risk: 65,
    type: "earthquake",
    description: "Unstable ground, high seismic activity",
  },
  { id: 3, x: 40, y: 70, radius: 40, risk: 75, type: "fire", description: "Dry forest area, high fire risk" },
  { id: 4, x: 80, y: 80, radius: 45, risk: 55, type: "hurricane", description: "Coastal area, hurricane risk" },
  { id: 5, x: 30, y: 60, radius: 30, risk: 45, type: "flood", description: "Low-lying area, moderate flood risk" },
]

export default function RiskHeatmap() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null)
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 })
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mapRef.current) {
      const updateDimensions = () => {
        setMapDimensions({
          width: mapRef.current?.offsetWidth || 0,
          height: mapRef.current?.offsetHeight || 0,
        })
      }

      updateDimensions()
      window.addEventListener("resize", updateDimensions)

      return () => {
        window.removeEventListener("resize", updateDimensions)
      }
    }
  }, [])

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return "rgba(239, 68, 68, 0.6)" // red
    if (risk >= 60) return "rgba(245, 158, 11, 0.6)" // amber
    if (risk >= 40) return "rgba(234, 179, 8, 0.6)" // yellow
    return "rgba(34, 197, 94, 0.6)" // green
  }

  const getRiskIcon = (type: string) => {
    switch (type) {
      case "flood":
        return <Droplets className="h-5 w-5 text-blue-400" />
      case "earthquake":
        return <AlertTriangle className="h-5 w-5 text-amber-400" />
      case "fire":
        return <Flame className="h-5 w-5 text-red-400" />
      case "hurricane":
        return <Wind className="h-5 w-5 text-cyan-400" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Risk Heatmap</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Filter:</span>
          <select className="rounded bg-slate-700 px-2 py-1 text-sm text-white">
            <option>All Risks</option>
            <option>Flood</option>
            <option>Earthquake</option>
            <option>Fire</option>
            <option>Hurricane</option>
          </select>
        </div>
      </div>

      <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-slate-700" ref={mapRef}>
        {/* Map Background */}
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
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

        {/* Risk Zones */}
        {RISK_ZONES.map((zone) => (
          <div
            key={zone.id}
            className="absolute cursor-pointer"
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: `${zone.radius * 2}px`,
              height: `${zone.radius * 2}px`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${getRiskColor(zone.risk)} 0%, rgba(0,0,0,0) 70%)`,
              }}
            />

            {/* Risk Indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-slate-800 shadow-lg"
            >
              {getRiskIcon(zone.type)}
            </motion.div>

            {/* Info Popup on Selection */}
            {selectedZone === zone.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-lg bg-slate-800 p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  {getRiskIcon(zone.type)}
                  <h3 className="font-medium capitalize text-white">{zone.type} Risk Zone</h3>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-700">
                    <div
                      className="h-full"
                      style={{
                        width: `${zone.risk}%`,
                        backgroundColor: getRiskColor(zone.risk).replace(", 0.6", ", 1"),
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-white">{zone.risk}%</span>
                </div>
                <p className="mt-2 text-sm text-gray-300">{zone.description}</p>
              </motion.div>
            )}
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-3 right-3 rounded-lg bg-slate-800 bg-opacity-80 p-2 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs text-white">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: "rgba(34, 197, 94, 0.6)" }}
            ></span>
            <span>Low Risk</span>
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: "rgba(234, 179, 8, 0.6)" }}
            ></span>
            <span>Medium Risk</span>
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: "rgba(239, 68, 68, 0.6)" }}
            ></span>
            <span>High Risk</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-md bg-blue-500/10 p-3 text-sm text-blue-300">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          <span>Hover over risk zones to see details. Click for more information.</span>
        </div>
        <button className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700">
          View Full Report
        </button>
      </div>
    </div>
  )
}

