"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, CheckCircle, AlertTriangle, Truck } from "lucide-react"

export default function LiveStats() {
  const [stats, setStats] = useState({
    activeVolunteers: 0,
    resolvedRequests: 0,
    activeEmergencies: 0,
    resourcesDeployed: 0,
  })

  // Simulate live updating stats
  useEffect(() => {
    const targetStats = {
      activeVolunteers: 1247,
      resolvedRequests: 85,
      activeEmergencies: 12,
      resourcesDeployed: 34,
    }

    const interval = setInterval(() => {
      setStats((prev) => ({
        activeVolunteers: Math.min(prev.activeVolunteers + 10, targetStats.activeVolunteers),
        resolvedRequests: Math.min(prev.resolvedRequests + 1, targetStats.resolvedRequests),
        activeEmergencies: targetStats.activeEmergencies,
        resourcesDeployed: Math.min(prev.resourcesDeployed + 1, targetStats.resourcesDeployed),
      }))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20 }}
      className="absolute left-4 top-20 z-10 w-64 rounded-lg bg-slate-800 bg-opacity-80 p-4 backdrop-blur-sm md:left-6 md:top-24 md:w-72"
    >
      <h2 className="mb-3 text-lg font-bold text-white">Live Statistics</h2>

      <div className="space-y-3">
        <StatItem
          icon={<Users className="h-5 w-5 text-blue-400" />}
          label="Active Volunteers"
          value={stats.activeVolunteers}
          color="blue"
        />

        <StatItem
          icon={<CheckCircle className="h-5 w-5 text-green-400" />}
          label="Resolved Requests"
          value={stats.resolvedRequests}
          color="green"
        />

        <StatItem
          icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
          label="Active Emergencies"
          value={stats.activeEmergencies}
          color="red"
        />

        <StatItem
          icon={<Truck className="h-5 w-5 text-amber-400" />}
          label="Resources Deployed"
          value={stats.resourcesDeployed}
          color="amber"
        />
      </div>
    </motion.div>
  )
}

function StatItem({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: number
  color: "blue" | "green" | "red" | "amber"
}) {
  const colorClasses = {
    blue: "bg-blue-500/20 border-blue-500/30",
    green: "bg-green-500/20 border-green-500/30",
    red: "bg-red-500/20 border-red-500/30",
    amber: "bg-amber-500/20 border-amber-500/30",
  }

  return (
    <div className={`flex items-center rounded-md border p-2 ${colorClasses[color]}`}>
      <div className="mr-3">{icon}</div>
      <div>
        <p className="text-xs text-gray-300">{label}</p>
        <p className="text-lg font-bold text-white">{value.toLocaleString()}</p>
      </div>
    </div>
  )
}

