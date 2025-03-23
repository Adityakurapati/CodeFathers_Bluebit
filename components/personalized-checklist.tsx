"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Circle, ChevronDown, ChevronUp, Home, Users, PawPrint } from "lucide-react"

interface ChecklistItem {
  id: number
  name: string
  description: string
  target: number
  current: number
  unit: string
  category: string
}

// Mock checklist data
const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 1,
    name: "Water Storage",
    description: "1 gallon per person per day",
    target: 10,
    current: 4,
    unit: "gallons",
    category: "essentials",
  },
  {
    id: 2,
    name: "Non-perishable Food",
    description: "Canned goods, dry foods, etc.",
    target: 14,
    current: 8,
    unit: "days",
    category: "essentials",
  },
  {
    id: 3,
    name: "First Aid Kit",
    description: "Basic medical supplies",
    target: 1,
    current: 1,
    unit: "kit",
    category: "essentials",
  },
  {
    id: 4,
    name: "Flashlights",
    description: "With extra batteries",
    target: 3,
    current: 1,
    unit: "units",
    category: "essentials",
  },
  {
    id: 5,
    name: "Pet Food",
    description: "For your furry friends",
    target: 14,
    current: 5,
    unit: "days",
    category: "pets",
  },
  {
    id: 6,
    name: "Emergency Contacts List",
    description: "Printed copy of important contacts",
    target: 1,
    current: 0,
    unit: "copy",
    category: "documents",
  },
  {
    id: 7,
    name: "Evacuation Plan",
    description: "Written plan with meeting points",
    target: 1,
    current: 1,
    unit: "plan",
    category: "documents",
  },
]

export default function PersonalizedChecklist() {
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST)
  const [expandedCategory, setExpandedCategory] = useState<string | null>("essentials")
  const [formData, setFormData] = useState({
    location: "",
    familySize: 2,
    hasPets: false,
  })
  const [showForm, setShowForm] = useState(false)

  const categories = Array.from(new Set(checklist.map((item) => item.category)))

  const updateItem = (id: number, newCurrent: number) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, current: Math.max(0, Math.min(newCurrent, item.target)) } : item,
      ),
    )
  }

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "essentials":
        return <Home className="h-5 w-5 text-blue-400" />
      case "pets":
        return <PawPrint className="h-5 w-5 text-amber-400" />
      case "documents":
        return <Users className="h-5 w-5 text-green-400" />
      default:
        return <Home className="h-5 w-5 text-gray-400" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "essentials":
        return "Essential Supplies"
      case "pets":
        return "Pet Supplies"
      case "documents":
        return "Important Documents"
      default:
        return category
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const generateChecklist = () => {
    // In a real app, this would call an API to generate a personalized checklist
    // For now, we'll just update the water target based on family size
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.name === "Water Storage") {
          return { ...item, target: formData.familySize * 10 }
        }
        if (item.category === "pets" && !formData.hasPets) {
          return { ...item, target: 0 }
        }
        return item
      }),
    )

    setShowForm(false)
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Preparedness Checklist</h2>
        <button
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Customize"}
        </button>
      </div>

      {showForm ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 rounded-lg bg-slate-700 p-3">
          <h3 className="mb-3 text-sm font-medium text-white">Customize Your Checklist</h3>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-300">Your Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                className="w-full rounded-md bg-slate-600 p-2 text-xs text-white placeholder-gray-400"
                placeholder="City, State"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-300">Family Size</label>
              <select
                name="familySize"
                value={formData.familySize}
                onChange={handleFormChange}
                className="w-full rounded-md bg-slate-600 p-2 text-xs text-white"
              >
                <option value={1}>1 person</option>
                <option value={2}>2 people</option>
                <option value={3}>3 people</option>
                <option value={4}>4 people</option>
                <option value={5}>5+ people</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hasPets"
                name="hasPets"
                checked={formData.hasPets}
                onChange={handleFormChange}
                className="h-4 w-4 rounded border-gray-600 bg-slate-600 text-blue-600"
              />
              <label htmlFor="hasPets" className="text-xs font-medium text-gray-300">
                I have pets
              </label>
            </div>

            <button
              className="w-full rounded-md bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-700"
              onClick={generateChecklist}
            >
              Generate Checklist
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="mb-4 rounded-lg bg-blue-500/10 p-3 text-sm text-blue-300">
          <p>
            This checklist is customized for a household of {formData.familySize}{" "}
            {formData.familySize === 1 ? "person" : "people"}
            {formData.hasPets ? " with pets" : ""}
            {formData.location ? ` in ${formData.location}` : ""}.
          </p>
        </div>
      )}

      <div className="space-y-3 overflow-y-auto pr-1" style={{ maxHeight: "400px" }}>
        {categories.map((category) => (
          <div key={category} className="overflow-hidden rounded-lg bg-slate-700">
            <button
              className="flex w-full items-center justify-between p-3 hover:bg-slate-600"
              onClick={() => toggleCategory(category)}
            >
              <div className="flex items-center gap-2">
                {getCategoryIcon(category)}
                <h3 className="font-medium text-white">{getCategoryName(category)}</h3>
              </div>
              {expandedCategory === category ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {expandedCategory === category && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="border-t border-slate-600 bg-slate-800"
              >
                <ul className="divide-y divide-slate-700">
                  {checklist
                    .filter((item) => item.category === category && item.target > 0)
                    .map((item, index) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateItem(item.id, item.current === item.target ? 0 : item.target)}
                                className="text-gray-400 hover:text-blue-400"
                              >
                                {item.current === item.target ? (
                                  <CheckCircle className="h-5 w-5 text-green-400" />
                                ) : (
                                  <Circle className="h-5 w-5" />
                                )}
                              </button>
                              <span className="font-medium text-white">{item.name}</span>
                            </div>
                            <p className="ml-7 text-xs text-gray-400">{item.description}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateItem(item.id, item.current - 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-l bg-slate-700 text-white hover:bg-slate-600"
                              >
                                -
                              </button>
                              <div className="flex h-6 min-w-[3rem] items-center justify-center bg-slate-600 px-2 text-xs text-white">
                                {item.current}/{item.target} {item.unit}
                              </div>
                              <button
                                onClick={() => updateItem(item.id, item.current + 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-r bg-slate-700 text-white hover:bg-slate-600"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-700">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.current / item.target) * 100}%` }}
                            className={`h-full ${
                              item.current === item.target
                                ? "bg-green-500"
                                : item.current >= item.target / 2
                                  ? "bg-amber-500"
                                  : "bg-blue-500"
                            }`}
                          />
                        </div>
                      </motion.li>
                    ))}
                </ul>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

