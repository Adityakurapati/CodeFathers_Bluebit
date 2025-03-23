"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"

interface EmergencyStatusCardProps {
  title: string
  value: number
  change: number
  color: "red" | "blue" | "green" | "amber"
}

export default function EmergencyStatusCard({ title, value, change, color }: EmergencyStatusCardProps) {
  const colorClasses = {
    red: "from-red-500/20 to-red-500/5 text-red-400",
    blue: "from-blue-500/20 to-blue-500/5 text-blue-400",
    green: "from-green-500/20 to-green-500/5 text-green-400",
    amber: "from-amber-500/20 to-amber-500/5 text-amber-400",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg bg-gradient-to-b ${colorClasses[color]} p-4 shadow-lg`}
    >
      <h3 className="text-sm font-medium text-gray-300">{title}</h3>
      <div className="mt-2 flex items-end justify-between">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white"
        >
          {value.toLocaleString()}
        </motion.p>
        <div className={`flex items-center text-xs font-medium ${change > 0 ? "text-red-400" : "text-green-400"}`}>
          {change > 0 ? (
            <>
              <TrendingUp className="mr-1 h-3 w-3" />+{change}
            </>
          ) : (
            <>
              <TrendingDown className="mr-1 h-3 w-3" />
              {change}
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

