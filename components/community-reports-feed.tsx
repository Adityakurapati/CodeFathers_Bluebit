"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThumbsUp, ThumbsDown, AlertTriangle, MapPin, Clock, User, MessageSquare, Flag } from "lucide-react"

// Mock community reports
const INITIAL_REPORTS = [
  {
    id: 1,
    user: "Michael T.",
    title: "Cracked bridge in Sector 2",
    description: "The pedestrian bridge near the park has several large cracks. Looks unsafe for crossing.",
    location: "Sector 2, Central Park",
    time: "2 hours ago",
    upvotes: 24,
    downvotes: 3,
    comments: 7,
    status: "verified",
    userVote: null as "up" | "down" | null,
  },
  {
    id: 2,
    user: "Sarah L.",
    title: "Fallen power lines after storm",
    description: "Several power lines down on Oak Street after last night's storm. Very dangerous situation.",
    location: "Oak Street, Residential Area",
    time: "5 hours ago",
    upvotes: 42,
    downvotes: 1,
    comments: 12,
    status: "critical",
    userVote: null as "up" | "down" | null,
  },
  {
    id: 3,
    user: "David K.",
    title: "Flooding in underground parking",
    description: "The underground parking at the mall is starting to flood. Water is about 6 inches deep already.",
    location: "Downtown Mall",
    time: "Yesterday",
    upvotes: 18,
    downvotes: 2,
    comments: 5,
    status: "pending",
    userVote: null as "up" | "down" | null,
  },
  {
    id: 4,
    user: "Lisa M.",
    title: "Unstable hillside after heavy rain",
    description:
      "The hillside behind the school looks unstable after all the rain. Soil is shifting and trees are leaning.",
    location: "Westside Elementary School",
    time: "Yesterday",
    upvotes: 31,
    downvotes: 4,
    comments: 9,
    status: "verified",
    userVote: null as "up" | "down" | null,
  },
]

export default function CommunityReportsFeed() {
  const [reports, setReports] = useState(INITIAL_REPORTS)
  const [newReport, setNewReport] = useState(false)
  const [sortBy, setSortBy] = useState<"recent" | "upvotes">("recent")

  const handleVote = (id: number, voteType: "up" | "down") => {
    setReports((prev) =>
      prev.map((report) => {
        if (report.id === id) {
          // If user already voted this way, remove the vote
          if (report.userVote === voteType) {
            return {
              ...report,
              upvotes: voteType === "up" ? report.upvotes - 1 : report.upvotes,
              downvotes: voteType === "down" ? report.downvotes - 1 : report.downvotes,
              userVote: null,
            }
          }

          // If user voted the opposite way, switch the vote
          if (report.userVote !== null) {
            return {
              ...report,
              upvotes: voteType === "up" ? report.upvotes + 1 : report.upvotes - 1,
              downvotes: voteType === "down" ? report.downvotes + 1 : report.downvotes - 1,
              userVote: voteType,
            }
          }

          // If user hasn't voted yet, add the vote
          return {
            ...report,
            upvotes: voteType === "up" ? report.upvotes + 1 : report.upvotes,
            downvotes: voteType === "down" ? report.downvotes + 1 : report.downvotes,
            userVote: voteType,
          }
        }
        return report
      }),
    )
  }

  const toggleNewReport = () => {
    setNewReport(!newReport)
  }

  const sortedReports = [...reports].sort((a, b) => {
    if (sortBy === "upvotes") {
      return b.upvotes - a.upvotes
    }
    // Sort by ID (higher ID = more recent)
    return b.id - a.id
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return (
          <span className="flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
            <AlertTriangle className="h-3 w-3" />
            Critical
          </span>
        )
      case "verified":
        return (
          <span className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
            <Flag className="h-3 w-3" />
            Verified
          </span>
        )
      default:
        return (
          <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        )
    }
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-white">Community Reports</h2>

        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-md bg-slate-700 text-sm">
            <button
              className={`px-3 py-1.5 ${sortBy === "recent" ? "bg-blue-600 text-white" : "text-gray-300"}`}
              onClick={() => setSortBy("recent")}
            >
              Recent
            </button>
            <button
              className={`px-3 py-1.5 ${sortBy === "upvotes" ? "bg-blue-600 text-white" : "text-gray-300"}`}
              onClick={() => setSortBy("upvotes")}
            >
              Most Upvoted
            </button>
          </div>

          <button
            className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
            onClick={toggleNewReport}
          >
            {newReport ? "Cancel" : "Report Issue"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {newReport && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 overflow-hidden rounded-lg bg-slate-700 p-4"
          >
            <h3 className="mb-3 text-lg font-medium text-white">Report a New Issue</h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Issue Title</label>
                <input
                  type="text"
                  className="w-full rounded-md bg-slate-600 p-2 text-sm text-white placeholder-gray-400"
                  placeholder="Brief title describing the issue"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Location</label>
                <input
                  type="text"
                  className="w-full rounded-md bg-slate-600 p-2 text-sm text-white placeholder-gray-400"
                  placeholder="Where is this issue located?"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-300">Description</label>
                <textarea
                  className="h-20 w-full resize-none rounded-md bg-slate-600 p-2 text-sm text-white placeholder-gray-400"
                  placeholder="Provide details about the issue..."
                />
              </div>
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button
                className="rounded-md bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-500"
                onClick={toggleNewReport}
              >
                Cancel
              </button>
              <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
                Submit Report
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {sortedReports.map((report) => (
          <div key={report.id} className="rounded-lg bg-slate-700 p-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-white">{report.title}</h3>
                  {getStatusBadge(report.status)}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-300">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {report.user}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {report.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {report.time}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex items-center gap-1 rounded-l-md px-2 py-1 ${
                    report.userVote === "up"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-slate-600 text-gray-300 hover:bg-slate-500"
                  }`}
                  onClick={() => handleVote(report.id, "up")}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-xs">{report.upvotes}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex items-center gap-1 rounded-r-md px-2 py-1 ${
                    report.userVote === "down"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-slate-600 text-gray-300 hover:bg-slate-500"
                  }`}
                  onClick={() => handleVote(report.id, "down")}
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span className="text-xs">{report.downvotes}</span>
                </motion.button>
              </div>
            </div>

            <p className="text-sm text-gray-300">{report.description}</p>

            <div className="mt-3 flex justify-between">
              <button className="flex items-center gap-1 rounded-md bg-slate-600 px-2 py-1 text-xs text-gray-300 hover:bg-slate-500">
                <MessageSquare className="h-3 w-3" />
                <span>{report.comments} Comments</span>
              </button>

              <button className="rounded-md bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

