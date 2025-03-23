"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Droplets, Home, ChevronDown, ChevronUp } from "lucide-react"

// Mock instruction data
const INSTRUCTIONS = [
  {
    id: 1,
    type: "fire",
    title: "Fire Safety",
    steps: [
      "Stay low to the ground to avoid smoke inhalation",
      "Cover your mouth with a damp cloth if possible",
      "Test doors for heat before opening them",
      "Use stairs, never elevators",
      "Once outside, stay outside and call for help",
    ],
  },
  {
    id: 2,
    type: "flood",
    title: "Flood Safety",
    steps: [
      "Move to higher ground immediately",
      "Avoid walking or driving through flood waters",
      "Stay away from power lines and electrical wires",
      "Be prepared to evacuate",
      "Listen to emergency broadcasts for instructions",
    ],
  },
  {
    id: 3,
    type: "earthquake",
    title: "Earthquake Safety",
    steps: [
      "Drop, cover, and hold on",
      "If indoors, stay away from windows and exterior walls",
      "If outdoors, move to an open area away from buildings",
      "After shaking stops, check for injuries and damage",
      "Be prepared for aftershocks",
    ],
  },
]

export default function EmergencyInstructions() {
  const [expandedId, setExpandedId] = useState<number | null>(1)

  const getInstructionIcon = (type: string) => {
    switch (type) {
      case "fire":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      case "flood":
        return <Droplets className="h-5 w-5 text-blue-400" />
      case "earthquake":
        return <Home className="h-5 w-5 text-amber-400" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Safety Instructions</h2>

      <div className="space-y-2">
        {INSTRUCTIONS.map((instruction) => (
          <div key={instruction.id} className="overflow-hidden rounded-lg bg-slate-700">
            <button
              className="flex w-full items-center justify-between p-3 hover:bg-slate-600"
              onClick={() => setExpandedId(expandedId === instruction.id ? null : instruction.id)}
            >
              <div className="flex items-center gap-2">
                {getInstructionIcon(instruction.type)}
                <h3 className="font-medium text-white">{instruction.title}</h3>
              </div>
              {expandedId === instruction.id ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </button>

            {expandedId === instruction.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="border-t border-slate-600 bg-slate-800 p-3"
              >
                <ol className="list-inside list-decimal space-y-1 text-sm text-gray-300">
                  {instruction.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

