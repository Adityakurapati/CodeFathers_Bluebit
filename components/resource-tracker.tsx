"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Truck, Droplets, Package, AmbulanceIcon as FirstAid } from "lucide-react"

// Mock resource data
const RESOURCES = [
  {
    id: 1,
    type: "Water Supply",
    icon: Droplets,
    location: "En route to Riverside",
    eta: "10 min",
    progress: 0,
  },
  {
    id: 2,
    type: "Medical Supplies",
    icon: FirstAid,
    location: "En route to Downtown",
    eta: "5 min",
    progress: 0,
  },
  {
    id: 3,
    type: "Food Packages",
    icon: Package,
    location: "En route to Shelter #3",
    eta: "15 min",
    progress: 0,
  },
]

export default function ResourceTracker() {
  const [resources, setResources] = useState(RESOURCES)

  // Simulate resource movement
  useEffect(() => {
    const interval = setInterval(() => {
      setResources((prev) =>
        prev.map((resource) => ({
          ...resource,
          progress: Math.min(resource.progress + Math.random() * 2, 100),
        })),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Resource Delivery Tracker</h2>

      <div className="space-y-3">
        {resources.map((resource) => {
          const Icon = resource.icon

          return (
            <div key={resource.id} className="rounded-lg bg-slate-700 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{resource.type}</h3>
                    <p className="text-xs text-gray-400">{resource.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-gray-300">ETA: {resource.eta}</span>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-600">
                  <motion.div animate={{ width: `${resource.progress}%` }} className="h-full bg-blue-500" />
                </div>
                <span className="text-xs font-medium text-gray-300">{Math.round(resource.progress)}%</span>
              </div>

              {/* Moving truck icon */}
              <div className="relative mt-1 h-4">
                <motion.div
                  animate={{ x: `${resource.progress}%` }}
                  transition={{ type: "spring", damping: 15 }}
                  className="absolute -translate-x-1/2"
                >
                  <Truck className="h-4 w-4 text-blue-400" />
                </motion.div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

