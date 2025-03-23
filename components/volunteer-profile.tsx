"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Award, Clock, Calendar, MapPin, Shield } from "lucide-react"

// Mock volunteer data
const VOLUNTEER_DATA = {
  name: "Alex Johnson",
  role: "Emergency Responder",
  joinDate: "2023-06-15",
  totalHours: 248,
  missions: 12,
  location: "Central District",
  skills: ["First Aid", "Search & Rescue", "Logistics", "Communication"],
  badges: [
    { id: 1, name: "First Responder Gold", icon: Shield, color: "amber", earned: "2023-12-10" },
    { id: 2, name: "Logistics Expert", icon: Award, color: "blue", earned: "2023-09-22" },
    { id: 3, name: "100+ Hours", icon: Clock, color: "green", earned: "2023-10-05" },
  ],
  upcomingShift: {
    date: "2024-03-05",
    time: "9:00 AM - 5:00 PM",
    location: "Distribution Center",
  },
}

export default function VolunteerProfile() {
  const [showBadgeAnimation, setShowBadgeAnimation] = useState<number | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleBadgeClick = (id: number) => {
    setShowBadgeAnimation(id)
    setTimeout(() => setShowBadgeAnimation(null), 2000)
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
          <User className="h-8 w-8 text-blue-400" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">{VOLUNTEER_DATA.name}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Shield className="h-4 w-4 text-blue-400" />
            <span>{VOLUNTEER_DATA.role}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-slate-700 p-3">
        <div className="text-center">
          <p className="text-xs text-gray-400">Hours</p>
          <p className="text-lg font-bold text-white">{VOLUNTEER_DATA.totalHours}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400">Missions</p>
          <p className="text-lg font-bold text-white">{VOLUNTEER_DATA.missions}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400">Since</p>
          <p className="text-lg font-bold text-white">
            {new Date(VOLUNTEER_DATA.joinDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-2 text-sm font-medium text-white">Earned Badges</h3>
        <div className="flex flex-wrap gap-2">
          {VOLUNTEER_DATA.badges.map((badge) => {
            const Icon = badge.icon
            const colorClasses = {
              amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
              blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
              green: "bg-green-500/20 text-green-400 border-green-500/30",
              red: "bg-red-500/20 text-red-400 border-red-500/30",
              purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
            }

            return (
              <div key={badge.id} className="relative">
                <motion.button
                  className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${colorClasses[badge.color as keyof typeof colorClasses]}`}
                  onClick={() => handleBadgeClick(badge.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{badge.name}</span>
                </motion.button>

                {showBadgeAnimation === badge.id && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          x: 0,
                          y: 0,
                          opacity: 1,
                          scale: 0.5,
                          rotate: Math.random() * 360,
                        }}
                        animate={{
                          x: (Math.random() - 0.5) * 100,
                          y: (Math.random() - 0.5) * 100,
                          opacity: 0,
                          scale: 1,
                          rotate: Math.random() * 360,
                        }}
                        transition={{ duration: 1.5 }}
                        className="absolute h-2 w-2 rounded-full"
                        style={{
                          backgroundColor:
                            badge.color === "amber"
                              ? "#f59e0b"
                              : badge.color === "blue"
                                ? "#3b82f6"
                                : badge.color === "green"
                                  ? "#10b981"
                                  : badge.color === "red"
                                    ? "#ef4444"
                                    : "#8b5cf6",
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-2 text-sm font-medium text-white">Skills & Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {VOLUNTEER_DATA.skills.map((skill, index) => (
            <span key={index} className="rounded-full bg-slate-700 px-3 py-1 text-xs text-white">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-blue-500/10 p-3">
        <h3 className="mb-2 text-sm font-medium text-white">Next Scheduled Shift</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-blue-300">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(VOLUNTEER_DATA.upcomingShift.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-300">
            <Clock className="h-4 w-4" />
            <span>{VOLUNTEER_DATA.upcomingShift.time}</span>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm text-blue-300">
          <MapPin className="h-4 w-4" />
          <span>{VOLUNTEER_DATA.upcomingShift.location}</span>
        </div>
      </div>
    </div>
  )
}

