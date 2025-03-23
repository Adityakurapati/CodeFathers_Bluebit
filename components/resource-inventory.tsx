"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Droplets,
  Package,
  AmbulanceIcon as FirstAid,
  Utensils,
  Tent,
  Battery,
  Search,
  Plus,
  Filter,
} from "lucide-react"

// Mock resource data
const RESOURCES = [
  {
    id: 1,
    name: "Water Supplies",
    icon: Droplets,
    color: "blue",
    available: 2500,
    unit: "gallons",
    allocated: 1200,
    location: "Main Warehouse",
  },
  {
    id: 2,
    name: "Emergency Food",
    icon: Utensils,
    color: "amber",
    available: 1800,
    unit: "packages",
    allocated: 750,
    location: "Main Warehouse",
  },
  {
    id: 3,
    name: "Medical Supplies",
    icon: FirstAid,
    color: "red",
    available: 350,
    unit: "kits",
    allocated: 120,
    location: "Medical Center",
  },
  {
    id: 4,
    name: "Shelter Kits",
    icon: Tent,
    color: "green",
    available: 200,
    unit: "kits",
    allocated: 85,
    location: "Distribution Center",
  },
  {
    id: 5,
    name: "Power Banks",
    icon: Battery,
    color: "purple",
    available: 500,
    unit: "units",
    allocated: 210,
    location: "Tech Storage",
  },
  {
    id: 6,
    name: "Relief Packages",
    icon: Package,
    color: "orange",
    available: 1200,
    unit: "packages",
    allocated: 450,
    location: "Distribution Center",
  },
]

export default function ResourceInventory() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResources = RESOURCES.filter((resource) =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getResourceIcon = (Icon: any, color: string) => {
    const colorClasses = {
      blue: "bg-blue-500/20 text-blue-400",
      red: "bg-red-500/20 text-red-400",
      green: "bg-green-500/20 text-green-400",
      amber: "bg-amber-500/20 text-amber-400",
      purple: "bg-purple-500/20 text-purple-400",
      orange: "bg-orange-500/20 text-orange-400",
    }

    return (
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${colorClasses[color as keyof typeof colorClasses]}`}
      >
        <Icon className="h-5 w-5" />
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-white">Resource Inventory</h2>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full rounded-md bg-slate-700 py-2 pl-9 pr-4 text-sm text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="flex items-center gap-1 rounded-md bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>

          <button className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-300">Resource</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-300">Available</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-300">Allocated</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-300">Location</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredResources.map((resource, index) => (
              <motion.tr
                key={resource.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-slate-700 last:border-0"
              >
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-3">
                    {getResourceIcon(resource.icon, resource.color)}
                    <span className="font-medium text-white">{resource.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-white">
                  {resource.available.toLocaleString()} {resource.unit}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-white">
                  {resource.allocated.toLocaleString()} {resource.unit}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-white">{resource.location}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full max-w-24 overflow-hidden rounded-full bg-slate-700">
                      <div
                        className={`h-full ${
                          resource.color === "blue"
                            ? "bg-blue-500"
                            : resource.color === "red"
                              ? "bg-red-500"
                              : resource.color === "green"
                                ? "bg-green-500"
                                : resource.color === "amber"
                                  ? "bg-amber-500"
                                  : resource.color === "purple"
                                    ? "bg-purple-500"
                                    : "bg-orange-500"
                        }`}
                        style={{ width: `${(resource.allocated / resource.available) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">
                      {Math.round((resource.allocated / resource.available) * 100)}%
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

