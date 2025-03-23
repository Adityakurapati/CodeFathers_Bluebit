"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Bell, X } from "lucide-react"

// Mock alert data
const ALERTS = [
  {
    id: 1,
    type: "warning",
    title: "Flash Flood Warning",
    message: "Flash flood warning issued for your area. Seek higher ground immediately.",
    time: "5 min ago",
  },
  {
    id: 2,
    type: "danger",
    title: "Evacuation Order",
    message: "Mandatory evacuation ordered for Riverside district. Proceed to nearest shelter.",
    time: "12 min ago",
  },
  {
    id: 3,
    type: "info",
    title: "Road Closure",
    message: "Main Street closed due to debris. Use alternate routes.",
    time: "25 min ago",
  },
]

export default function EmergencyAlerts() {
  const [alerts, setAlerts] = useState(ALERTS)
  const [newAlert, setNewAlert] = useState(false)

  // Simulate new alert coming in
  useEffect(() => {
    const timer = setTimeout(() => {
      setNewAlert(true)

      setTimeout(() => {
        setAlerts((prev) => [
          {
            id: 4,
            type: "danger",
            title: "Fire Spreading",
            message: "Fire spreading to eastern district. Prepare for possible evacuation.",
            time: "Just now",
          },
          ...prev,
        ])
        setNewAlert(false)
      }, 3000)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "danger":
        return "bg-red-500/20 border-red-500/30"
      case "warning":
        return "bg-amber-500/20 border-amber-500/30"
      case "info":
        return "bg-blue-500/20 border-blue-500/30"
      default:
        return "bg-slate-500/20 border-slate-500/30"
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Emergency Alerts</h2>
        {newAlert && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5"
          >
            <Bell className="h-3 w-3 text-red-400" />
            <span className="text-xs font-medium text-white">New Alert</span>
          </motion.div>
        )}
      </div>

      <div className="space-y-3 overflow-y-auto pr-1" style={{ maxHeight: "280px" }}>
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`relative overflow-hidden rounded-lg border p-3 ${getAlertStyles(alert.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <AlertTriangle
                    className={`h-5 w-5 ${
                      alert.type === "danger"
                        ? "text-red-400"
                        : alert.type === "warning"
                          ? "text-amber-400"
                          : "text-blue-400"
                    }`}
                  />
                  <div>
                    <h3 className="font-medium text-white">{alert.title}</h3>
                    <p className="text-sm text-gray-300">{alert.message}</p>
                    <p className="mt-1 text-xs text-gray-400">{alert.time}</p>
                  </div>
                </div>
                <button onClick={() => removeAlert(alert.id)} className="rounded-full p-1 hover:bg-slate-700">
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

