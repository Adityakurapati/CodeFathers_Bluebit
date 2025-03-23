"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  School,
  Home,
  Hospital,
  Droplets,
  Users,
  DollarSign,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// Mock project data
const PROJECTS = [
  {
    id: 1,
    title: "School Reconstruction",
    description: "Rebuilding Westside Elementary School damaged in the earthquake",
    icon: School,
    progress: 60,
    location: "Westside District",
    budget: 1200000,
    spent: 720000,
    startDate: "2023-10-15",
    estimatedCompletion: "2024-05-30",
    donors: [
      { name: "Community Foundation", amount: 500000 },
      { name: "State Recovery Fund", amount: 400000 },
      { name: "Local Businesses", amount: 300000 },
    ],
    updates: [
      { date: "2024-02-10", text: "Foundation completed, starting on walls" },
      { date: "2024-01-05", text: "Site cleared, foundation work beginning" },
      { date: "2023-12-01", text: "Project planning and permits approved" },
    ],
  },
  {
    id: 2,
    title: "Housing Restoration",
    description: "Repairing 45 homes damaged in the flood",
    icon: Home,
    progress: 75,
    location: "Riverside Area",
    budget: 900000,
    spent: 675000,
    startDate: "2023-09-01",
    estimatedCompletion: "2024-03-15",
    donors: [
      { name: "Housing Relief Fund", amount: 400000 },
      { name: "Federal Grant", amount: 350000 },
      { name: "Private Donations", amount: 150000 },
    ],
    updates: [
      { date: "2024-02-15", text: "35 homes completed, 10 in progress" },
      { date: "2024-01-20", text: "25 homes completed, working on remaining" },
      { date: "2023-11-10", text: "First 10 homes restored and families returned" },
    ],
  },
  {
    id: 3,
    title: "Medical Clinic Rebuild",
    description: "Reconstructing the community clinic destroyed in the disaster",
    icon: Hospital,
    progress: 40,
    location: "Downtown Area",
    budget: 1500000,
    spent: 600000,
    startDate: "2023-11-20",
    estimatedCompletion: "2024-08-15",
    donors: [
      { name: "Healthcare Foundation", amount: 700000 },
      { name: "Medical Association", amount: 500000 },
      { name: "Corporate Sponsors", amount: 300000 },
    ],
    updates: [
      { date: "2024-02-05", text: "Foundation and structural work in progress" },
      { date: "2024-01-10", text: "Site preparation completed" },
      { date: "2023-12-15", text: "Architectural plans finalized" },
    ],
  },
  {
    id: 4,
    title: "Water System Repair",
    description: "Restoring clean water access to affected communities",
    icon: Droplets,
    progress: 85,
    location: "Multiple Districts",
    budget: 750000,
    spent: 637500,
    startDate: "2023-08-10",
    estimatedCompletion: "2024-03-01",
    donors: [
      { name: "Water Relief Initiative", amount: 350000 },
      { name: "Environmental Grant", amount: 250000 },
      { name: "Community Fundraiser", amount: 150000 },
    ],
    updates: [
      { date: "2024-02-20", text: "Main pipeline repairs completed" },
      { date: "2024-01-15", text: "Treatment facility restored to operation" },
      { date: "2023-11-30", text: "Emergency water stations established" },
    ],
  },
  {
    id: 5,
    title: "Community Center",
    description: "Building a new community center for disaster coordination",
    icon: Users,
    progress: 25,
    location: "Central District",
    budget: 1000000,
    spent: 250000,
    startDate: "2024-01-05",
    estimatedCompletion: "2024-10-30",
    donors: [
      { name: "City Redevelopment Fund", amount: 500000 },
      { name: "Private Foundation", amount: 300000 },
      { name: "Resident Donations", amount: 200000 },
    ],
    updates: [
      { date: "2024-02-25", text: "Foundation work started" },
      { date: "2024-01-30", text: "Site preparation and clearing" },
      { date: "2024-01-10", text: "Final design approved" },
    ],
  },
]

export default function ProjectCards() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null)
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const filteredProjects =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => {
          if (filter === "high-progress" && project.progress >= 75) return true
          if (filter === "medium-progress" && project.progress >= 40 && project.progress < 75) return true
          if (filter === "low-progress" && project.progress < 40) return true
          return false
        })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getProjectIcon = (Icon: any) => {
    return <Icon className="h-6 w-6 text-blue-400" />
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-white">Rebuilding Projects</h2>

        <div className="flex gap-2">
          <select
            className="rounded-md bg-slate-700 px-3 py-1.5 text-sm text-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Projects</option>
            <option value="high-progress">High Progress (75%+)</option>
            <option value="medium-progress">Medium Progress (40-75%)</option>
            <option value="low-progress">Low Progress (0-40%)</option>
          </select>

          <button className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
            <span className="hidden sm:inline">View Map</span>
            <span className="sm:hidden">Map</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div key={project.id} className="relative">
            <motion.div
              className={`h-full rounded-lg ${flippedCard === project.id ? "pointer-events-none" : ""}`}
              initial={false}
              animate={{ rotateY: flippedCard === project.id ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front of Card */}
              <div
                className="absolute inset-0 backface-hidden cursor-pointer rounded-lg bg-slate-700 p-4"
                onClick={() => setFlippedCard(project.id)}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                    {getProjectIcon(project.icon)}
                  </div>
                  <h3 className="font-medium text-white">{project.title}</h3>
                </div>

                <p className="mb-3 text-sm text-gray-300">{project.description}</p>

                <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>

                <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-600">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    className={`h-full ${
                      project.progress >= 75 ? "bg-green-500" : project.progress >= 40 ? "bg-amber-500" : "bg-blue-500"
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Est. Completion: {formatDate(project.estimatedCompletion)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span>{Math.round((project.spent / project.budget) * 100)}% of budget</span>
                  </div>
                </div>

                <div className="mt-3 text-center text-xs text-blue-400">Click to see donors & details</div>
              </div>

              {/* Back of Card */}
              <div
                className="absolute inset-0 backface-hidden cursor-pointer rounded-lg bg-slate-700 p-4 [transform:rotateY(180deg)]"
                onClick={() => setFlippedCard(null)}
              >
                <h3 className="mb-3 text-center font-medium text-white">{project.title} - Funding</h3>

                <div className="mb-3 space-y-2">
                  {project.donors.map((donor, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{donor.name}</span>
                      <span className="font-medium text-white">{formatCurrency(donor.amount)}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-3 border-t border-slate-600 pt-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Total Budget:</span>
                    <span className="font-medium text-white">{formatCurrency(project.budget)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Spent So Far:</span>
                    <span className="font-medium text-white">{formatCurrency(project.spent)}</span>
                  </div>
                </div>

                <div className="mt-3 text-center text-xs text-blue-400">Click to flip back</div>
              </div>
            </motion.div>

            {/* Project Updates Button */}
            <button
              className="mt-2 flex w-full items-center justify-between rounded-md bg-slate-600 px-3 py-1.5 text-xs text-white hover:bg-slate-500"
              onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
            >
              <span>Project Updates</span>
              {expandedProject === project.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {/* Project Updates Panel */}
            {expandedProject === project.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-1 overflow-hidden rounded-md bg-slate-600 p-3"
              >
                <h4 className="mb-2 text-xs font-medium text-white">Recent Updates</h4>
                <div className="space-y-2">
                  {project.updates.map((update, index) => (
                    <div key={index} className="text-xs">
                      <div className="flex items-center gap-1 text-gray-300">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(update.date)}</span>
                      </div>
                      <p className="ml-4 text-white">{update.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

