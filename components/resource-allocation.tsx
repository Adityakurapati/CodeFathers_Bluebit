"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Info } from "lucide-react"

// Mock allocation data
const ALLOCATION_DATA = [
  { name: "Water", value: 35, color: "#3b82f6" },
  { name: "Food", value: 25, color: "#f59e0b" },
  { name: "Medical", value: 20, color: "#ef4444" },
  { name: "Shelter", value: 15, color: "#10b981" },
  { name: "Other", value: 5, color: "#8b5cf6" },
]

export default function ResourceAllocation() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [animateChart, setAnimateChart] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimateChart(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Resource Allocation</h2>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ALLOCATION_DATA}
              cx="50%"
              cy="50%"
              innerRadius={animateChart ? 40 : 0}
              outerRadius={animateChart ? 70 : 0}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              animationBegin={0}
              animationDuration={1000}
              isAnimationActive={true}
            >
              {ALLOCATION_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="transparent"
                  className={activeIndex === index ? "opacity-100" : "opacity-80"}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {ALLOCATION_DATA.map((entry, index) => (
          <div
            key={index}
            className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
            style={{ backgroundColor: `${entry.color}20`, color: entry.color }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span>
              {entry.name}: {entry.value}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-slate-700 p-3 text-xs text-gray-300">
        <div className="flex items-start gap-2">
          <Info className="mt-0.5 h-4 w-4 text-blue-400" />
          <p>
            This chart shows how resources are currently being allocated across different categories. Water and food
            remain the highest priorities, followed by medical supplies.
          </p>
        </div>
      </div>
    </div>
  )
}

