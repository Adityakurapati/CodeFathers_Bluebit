"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Droplets, Wind, Flame, ChevronRight, ChevronLeft } from "lucide-react"

// Mock tips data
const TIPS = [
  {
    id: 1,
    title: "Flood Preparedness",
    icon: Droplets,
    color: "blue",
    tips: [
      "Elevate electrical systems and appliances",
      "Keep important documents in waterproof containers",
      "Know your evacuation route in advance",
      "Have sandbags ready if you're in a flood-prone area",
    ],
  },
  {
    id: 2,
    title: "Fire Safety",
    icon: Flame,
    color: "red",
    tips: [
      "Install smoke detectors on every level of your home",
      "Create a fire escape plan with two ways out of each room",
      "Keep fire extinguishers accessible",
      "Clear brush and debris around your property",
    ],
  },
  {
    id: 3,
    title: "Hurricane Readiness",
    icon: Wind,
    color: "cyan",
    tips: [
      "Secure or bring in outdoor furniture and objects",
      "Cover windows with storm shutters or plywood",
      "Fill bathtubs and containers with water for washing",
      "Charge electronics before the storm hits",
    ],
  },
  {
    id: 4,
    title: "Earthquake Safety",
    icon: AlertTriangle,
    color: "amber",
    tips: [
      "Practice 'Drop, Cover, and Hold On' with your family",
      "Secure heavy furniture and appliances to walls",
      "Keep a whistle near your bed to signal for help",
      "Know how to shut off utilities",
    ],
  },
]

export default function PreparednessTips() {
  const [currentTip, setCurrentTip] = useState(0)

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % TIPS.length)
  }

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + TIPS.length) % TIPS.length)
  }

  const tip = TIPS[currentTip]
  const Icon = tip.icon

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-500/20 to-blue-500/5 text-blue-400"
      case "red":
        return "from-red-500/20 to-red-500/5 text-red-400"
      case "cyan":
        return "from-cyan-500/20 to-cyan-500/5 text-cyan-400"
      case "amber":
        return "from-amber-500/20 to-amber-500/5 text-amber-400"
      default:
        return "from-gray-500/20 to-gray-500/5 text-gray-400"
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Preparedness Tips</h2>

      <div className={`rounded-lg bg-gradient-to-b ${getColorClasses(tip.color)} p-4`}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-slate-800`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-medium text-white">{tip.title}</h3>
          </div>

          <div className="flex gap-1">
            <button className="rounded-full bg-slate-800 p-1.5 text-gray-400 hover:text-white" onClick={prevTip}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="rounded-full bg-slate-800 p-1.5 text-gray-400 hover:text-white" onClick={nextTip}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <ul className="space-y-2">
          {tip.tips.map((tipText, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2 text-sm text-white"
            >
              <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-white" />
              <span>{tipText}</span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-4 flex justify-center">
          {TIPS.map((_, index) => (
            <button
              key={index}
              className={`mx-1 h-2 w-2 rounded-full ${index === currentTip ? "bg-white" : "bg-white/30"}`}
              onClick={() => setCurrentTip(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

