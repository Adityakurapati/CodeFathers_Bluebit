"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, User, Clock, MessageSquare, ThumbsUp } from "lucide-react"

// Mock feedback data
const INITIAL_FEEDBACK = [
  {
    id: 1,
    user: "Robert J.",
    project: "School Reconstruction",
    rating: 4,
    comment:
      "Great progress on the school rebuilding. The workers are efficient and the community is kept informed. Only issue is some construction noise early in the morning.",
    time: "2 days ago",
    likes: 12,
    userLiked: false,
  },
  {
    id: 2,
    user: "Maria G.",
    project: "Medical Clinic Rebuild",
    rating: 2,
    comment:
      "The new clinic lacks essential supplies and equipment. Construction seems good but we need better planning for what goes inside.",
    time: "3 days ago",
    likes: 24,
    userLiked: false,
  },
  {
    id: 3,
    user: "Thomas L.",
    project: "Housing Restoration",
    rating: 5,
    comment:
      "Our home was beautifully restored, better than before! The team was professional and addressed all our concerns. Very grateful.",
    time: "1 week ago",
    likes: 31,
    userLiked: false,
  },
  {
    id: 4,
    user: "Sophia K.",
    project: "Water System Repair",
    rating: 3,
    comment: "Water service has been restored but pressure is inconsistent. Better than nothing but needs more work.",
    time: "1 week ago",
    likes: 8,
    userLiked: false,
  },
]

export default function CommunityFeedback() {
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK)
  const [filter, setFilter] = useState<string>("all")
  const [showForm, setShowForm] = useState(false)
  const [newFeedback, setNewFeedback] = useState({
    project: "",
    rating: 5,
    comment: "",
  })

  const handleLike = (id: number) => {
    setFeedback((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            likes: item.userLiked ? item.likes - 1 : item.likes + 1,
            userLiked: !item.userLiked,
          }
        }
        return item
      }),
    )
  }

  const filteredFeedback =
    filter === "all"
      ? feedback
      : feedback.filter((item) => {
          if (filter === "positive" && item.rating >= 4) return true
          if (filter === "neutral" && item.rating === 3) return true
          if (filter === "negative" && item.rating <= 2) return true
          return false
        })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewFeedback((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number.parseInt(value) : value,
    }))
  }

  const handleSubmit = () => {
    if (!newFeedback.project || !newFeedback.comment) return

    const newItem = {
      id: feedback.length + 1,
      user: "You",
      project: newFeedback.project,
      rating: newFeedback.rating,
      comment: newFeedback.comment,
      time: "Just now",
      likes: 0,
      userLiked: false,
    }

    setFeedback((prev) => [newItem, ...prev])
    setNewFeedback({
      project: "",
      rating: 5,
      comment: "",
    })
    setShowForm(false)
  }

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => setNewFeedback((prev) => ({ ...prev, rating: star })) : undefined}
            className={interactive ? "cursor-pointer focus:outline-none" : ""}
          >
            <Star className={`h-4 w-4 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-400"}`} />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-white">Community Feedback</h2>

        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-md bg-slate-700 text-sm">
            <button
              className={`px-3 py-1.5 ${filter === "all" ? "bg-blue-600 text-white" : "text-gray-300"}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1.5 ${filter === "positive" ? "bg-green-600 text-white" : "text-gray-300"}`}
              onClick={() => setFilter("positive")}
            >
              Positive
            </button>
            <button
              className={`px-3 py-1.5 ${filter === "neutral" ? "bg-amber-600 text-white" : "text-gray-300"}`}
              onClick={() => setFilter("neutral")}
            >
              Neutral
            </button>
            <button
              className={`px-3 py-1.5 ${filter === "negative" ? "bg-red-600 text-white" : "text-gray-300"}`}
              onClick={() => setFilter("negative")}
            >
              Negative
            </button>
          </div>

          <button
            className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add Feedback"}
          </button>
        </div>
      </div>

      {showForm && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mb-4 overflow-hidden rounded-lg bg-slate-700 p-4"
        >
          <h3 className="mb-3 text-lg font-medium text-white">Share Your Feedback</h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Project</label>
              <select
                name="project"
                value={newFeedback.project}
                onChange={handleInputChange}
                className="w-full rounded-md bg-slate-600 p-2 text-sm text-white"
              >
                <option value="">Select a project</option>
                <option value="School Reconstruction">School Reconstruction</option>
                <option value="Housing Restoration">Housing Restoration</option>
                <option value="Medical Clinic Rebuild">Medical Clinic Rebuild</option>
                <option value="Water System Repair">Water System Repair</option>
                <option value="Community Center">Community Center</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Rating</label>
              <div className="flex h-10 items-center gap-2 rounded-md bg-slate-600 px-2">
                {renderStars(newFeedback.rating, true)}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-300">Your Feedback</label>
              <textarea
                name="comment"
                value={newFeedback.comment}
                onChange={handleInputChange}
                className="h-20 w-full resize-none rounded-md bg-slate-600 p-2 text-sm text-white placeholder-gray-400"
                placeholder="Share your thoughts on this project..."
              />
            </div>
          </div>

          <div className="mt-3 flex justify-end gap-2">
            <button
              className="rounded-md bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-500"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit Feedback
            </button>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {filteredFeedback.map((item) => (
          <div key={item.id} className="rounded-lg bg-slate-700 p-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-600">
                    <User className="h-4 w-4 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{item.user}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <span>{item.project}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex">{renderStars(item.rating)}</div>
            </div>

            <p className="mb-3 text-sm text-gray-300">{item.comment}</p>

            <div className="flex items-center justify-between">
              <button
                className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs ${
                  item.userLiked ? "bg-blue-500/20 text-blue-400" : "bg-slate-600 text-gray-300 hover:bg-slate-500"
                }`}
                onClick={() => handleLike(item.id)}
              >
                <ThumbsUp className="h-3 w-3" />
                <span>
                  {item.likes} {item.likes === 1 ? "person" : "people"} found this helpful
                </span>
              </button>

              <button className="flex items-center gap-1 rounded-md bg-slate-600 px-2 py-1 text-xs text-gray-300 hover:bg-slate-500">
                <MessageSquare className="h-3 w-3" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

