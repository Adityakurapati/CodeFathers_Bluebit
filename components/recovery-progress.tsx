"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ArrowUp, Calendar, Clock } from "lucide-react"

// Mock recovery data
const RECOVERY_DATA = {
  overall: 68,
  categories: [
    { name: "Infrastructure", value: 65, color: "#3b82f6" },
    { name: "Housing", value: 75, color: "#10b981" },
    { name: "Services", value: 60, color: "#f59e0b" },
    { name: "Economy", value: 45, color: "#8b5cf6" },
  ],
  timeline: {
    start: "2023-08-15",
    current: "2024-02-28",
    projected: "2024-11-30",
  },
  recentMilestones: [
    { date: "2024-02-20", text: "Water system restored to 85% capacity" },
    { date: "2024-02-10", text: "50% of damaged homes repaired" },
    { date: "2024-01-25", text: "Main roads cleared and reopened" },
  ],
}

export default function RecoveryProgress() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate days elapsed and total days for recovery timeline
  const startDate = new Date(RECOVERY_DATA.timeline.start)
  const currentDate = new Date(RECOVERY_DATA.timeline.current)
  const projectedDate = new Date(RECOVERY_DATA.timeline.projected)

  const totalDays = Math.ceil((projectedDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const elapsedDays = Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const percentComplete = Math.round((elapsedDays / totalDays) * 100)

  // Prepare data for pie chart
  const chartData = RECOVERY_DATA.categories.map((category) => ({
    name: category.name,
    value: category.value,
  }))

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Recovery Progress</h2>

      <div className="mb-4 rounded-lg bg-blue-500/10 p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-white">Overall Recovery</h3>
          <div className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2 py-0.5 text-xs text-blue-300">
            <ArrowUp className="h-3 w-3" />
            <span>+5% this month</span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <div className="relative h-16 w-16 rounded-full bg-slate-700">
            <svg className="h-16 w-16" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#334155"
                strokeWidth="3"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeDasharray={`${RECOVERY_DATA.overall}, 100`}
                className="animate-progress"
              />
              <text x="18" y="20.5" textAnchor="middle" className="text-lg font-medium fill-white">
                {RECOVERY_DATA.overall}%
              </text>
            </svg>
          </div>

          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between text-xs text-gray-300">
              <span>Recovery Timeline</span>
              <span>{percentComplete}% of time elapsed</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentComplete}%` }}
                className="h-full bg-blue-500"
              />
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Started: {formatDate(RECOVERY_DATA.timeline.start)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Est. Completion: {formatDate(RECOVERY_DATA.timeline.projected)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium text-white">Recovery by Category</h3>

        <div className="flex h-[180px] items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {RECOVERY_DATA.categories.map((category, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={category.color}
                    stroke="transparent"
                    className={activeIndex === index ? "opacity-100" : "opacity-70"}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {RECOVERY_DATA.categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: category.color }}></span>
              <span>
                {category.name}: {category.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-white">Recent Milestones</h3>

        <div className="space-y-2">
          {RECOVERY_DATA.recentMilestones.map((milestone, index) => (
            <div key={index} className="flex items-start gap-2 text-xs">
              <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-white">{milestone.text}</p>
                <p className="text-gray-400">{formatDate(milestone.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

