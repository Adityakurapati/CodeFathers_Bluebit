"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Users, Package, ChevronDown, ChevronUp } from "lucide-react"

// Mock missions data
const MISSIONS = [
  {
    id: 1,
    title: "Supply Distribution",
    description: "Distribute emergency supplies to affected families in Riverside area",
    date: "2024-03-05",
    time: "9:00 AM - 2:00 PM",
    location: "Riverside Community Center",
    volunteers: {
      required: 8,
      assigned: 5,
    },
    resources: [
      { name: "Food Kits", quantity: 150 },
      { name: "Water Bottles", quantity: 300 },
      { name: "Hygiene Kits", quantity: 100 },
    ],
    status: "upcoming",
    priority: "high",
  },
  {
    id: 2,
    title: "Medical Outreach",
    description: "Provide basic medical checkups and distribute medicine to elderly residents",
    date: "2024-03-07",
    time: "10:00 AM - 4:00 PM",
    location: "Westside Senior Center",
    volunteers: {
      required: 6,
      assigned: 4,
    },
    resources: [
      { name: "Medical Kits", quantity: 50 },
      { name: "Medicine Packages", quantity: 100 },
    ],
    status: "upcoming",
    priority: "medium",
  },
  {
    id: 3,
    title: "Shelter Setup",
    description: "Set up temporary shelters for displaced families",
    date: "2024-03-10",
    time: "8:00 AM - 6:00 PM",
    location: "Central Park",
    volunteers: {
      required: 12,
      assigned: 6,
    },
    resources: [
      { name: "Tents", quantity: 25 },
      { name: "Sleeping Bags", quantity: 100 },
      { name: "Blankets", quantity: 150 },
    ],
    status: "upcoming",
    priority: "critical",
  },
  {
    id: 4,
    title: "Debris Clearing",
    description: "Clear debris from residential streets to improve access",
    date: "2024-03-12",
    time: "7:00 AM - 3:00 PM",
    location: "Eastern District",
    volunteers: {
      required: 15,
      assigned: 8,
    },
    resources: [
      { name: "Safety Equipment", quantity: 20 },
      { name: "Tools", quantity: 30 },
    ],
    status: "upcoming",
    priority: "medium",
  },
]

export default function UpcomingMissions() {
  const [expandedMission, setExpandedMission] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const filteredMissions = filter === "all" ? MISSIONS : MISSIONS.filter((mission) => mission.priority === filter)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">Critical</span>
      case "high":
        return <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">High</span>
      case "medium":
        return <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">Medium</span>
      default:
        return <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">Low</span>
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-white">Upcoming Missions</h2>

        <div className="flex gap-2">
          <select
            className="rounded-md bg-slate-700 px-3 py-1.5 text-sm text-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
            <span className="hidden sm:inline">View Calendar</span>
            <span className="sm:hidden">Calendar</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredMissions.map((mission) => (
          <div key={mission.id} className="overflow-hidden rounded-lg bg-slate-700">
            <div
              className="flex cursor-pointer flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
              onClick={() => setExpandedMission(expandedMission === mission.id ? null : mission.id)}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-white">{mission.title}</h3>
                  {getPriorityBadge(mission.priority)}
                </div>
                <p className="mt-1 text-sm text-gray-300">{mission.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(mission.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {mission.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {mission.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full bg-slate-600 px-2 py-1 text-xs text-white">
                  <Users className="h-3 w-3" />
                  <span>
                    {mission.volunteers.assigned}/{mission.volunteers.required}
                  </span>
                </div>

                {expandedMission === mission.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>

            {expandedMission === mission.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="border-t border-slate-600 bg-slate-800 p-4"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-300">Required Resources</h4>
                    <ul className="space-y-2">
                      {mission.resources.map((resource, index) => (
                        <li key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-blue-400" />
                            <span className="text-white">{resource.name}</span>
                          </div>
                          <span className="text-gray-300">{resource.quantity} units</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-300">Volunteer Status</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="text-white">Volunteer Coverage</span>
                          <span className="text-gray-300">
                            {Math.round((mission.volunteers.assigned / mission.volunteers.required) * 100)}%
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(mission.volunteers.assigned / mission.volunteers.required) * 100}%` }}
                            className={`h-full ${
                              mission.volunteers.assigned >= mission.volunteers.required
                                ? "bg-green-500"
                                : mission.volunteers.assigned >= mission.volunteers.required / 2
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="rounded-lg bg-slate-700 p-2 text-sm">
                        <p className="text-white">
                          {mission.volunteers.required - mission.volunteers.assigned > 0
                            ? `${mission.volunteers.required - mission.volunteers.assigned} more volunteers needed`
                            : "All volunteer positions filled"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button className="rounded-md bg-slate-700 px-3 py-1.5 text-sm text-white hover:bg-slate-600">
                    View Details
                  </button>
                  <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
                    Volunteer
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

