"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Truck, MapPin, Package, Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react"

// Mock deployment data
const DEPLOYMENTS = [
  {
    id: 1,
    destination: "Riverside Shelter",
    resources: [
      { name: "Water Supplies", quantity: 500, unit: "gallons" },
      { name: "Emergency Food", quantity: 200, unit: "packages" },
    ],
    status: "in-transit",
    eta: "25 min",
    departureTime: "10:30 AM",
    vehicle: "Truck #103",
  },
  {
    id: 2,
    destination: "Downtown Medical Center",
    resources: [
      { name: "Medical Supplies", quantity: 50, unit: "kits" },
      { name: "Power Banks", quantity: 30, unit: "units" },
    ],
    status: "loading",
    eta: "45 min",
    departureTime: "11:15 AM",
    vehicle: "Van #87",
  },
  {
    id: 3,
    destination: "Westside Community Center",
    resources: [
      { name: "Relief Packages", quantity: 150, unit: "packages" },
      { name: "Shelter Kits", quantity: 25, unit: "kits" },
    ],
    status: "scheduled",
    eta: "1h 30min",
    departureTime: "12:00 PM",
    vehicle: "Truck #92",
  },
]

export default function ResourceDeployment() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-transit":
        return (
          <span className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
            <Truck className="h-3 w-3" />
            In Transit
          </span>
        )
      case "loading":
        return (
          <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">
            <Package className="h-3 w-3" />
            Loading
          </span>
        )
      case "scheduled":
        return (
          <span className="flex items-center gap-1 rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-medium text-purple-400">
            <Calendar className="h-3 w-3" />
            Scheduled
          </span>
        )
      default:
        return (
          <span className="flex items-center gap-1 rounded-full bg-gray-500/20 px-2 py-0.5 text-xs font-medium text-gray-400">
            Unknown
          </span>
        )
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Resource Deployment</h2>

      <div className="space-y-3">
        {DEPLOYMENTS.map((deployment) => (
          <div key={deployment.id} className="overflow-hidden rounded-lg bg-slate-700">
            <div className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-600">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{deployment.destination}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Clock className="h-3 w-3" />
                    <span>ETA: {deployment.eta}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(deployment.status)}
                <button
                  onClick={() => setExpandedId(expandedId === deployment.id ? null : deployment.id)}
                  className="rounded-full p-1 hover:bg-slate-600"
                >
                  {expandedId === deployment.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {expandedId === deployment.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="border-t border-slate-600 bg-slate-800 p-3"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-300">Resources</h4>
                    <ul className="space-y-1 text-sm text-white">
                      {deployment.resources.map((resource, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span>{resource.name}</span>
                          <span className="font-medium">
                            {resource.quantity} {resource.unit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-300">Deployment Details</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Vehicle:</span>
                        <span className="text-white">{deployment.vehicle}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Departure:</span>
                        <span className="text-white">{deployment.departureTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Status:</span>
                        <span className="text-white capitalize">{deployment.status.replace("-", " ")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  <button className="rounded bg-slate-700 px-3 py-1 text-sm text-white hover:bg-slate-600">
                    Track
                  </button>
                  <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">Update</button>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <button className="mt-3 w-full rounded-md bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-700">
        Schedule New Deployment
      </button>
    </div>
  )
}

