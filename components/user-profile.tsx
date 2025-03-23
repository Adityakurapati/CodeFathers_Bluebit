"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, MapPin, Phone, Mail, Shield, Edit, Camera } from "lucide-react"

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-700 sm:h-32 sm:w-32">
            <User className="h-12 w-12 text-gray-400 sm:h-16 sm:w-16" />
          </div>
          <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700">
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="mb-2 flex flex-col items-center gap-2 sm:flex-row">
            <h2 className="text-2xl font-bold text-white">Sarah Johnson</h2>
            <div className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2 py-0.5">
              <Shield className="h-3 w-3 text-blue-400" />
              <span className="text-xs font-medium text-blue-400">Coordinator</span>
            </div>
          </div>

          <p className="mb-4 text-gray-300">
            Emergency response coordinator with 5 years of experience in disaster management.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-md bg-slate-700 p-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-white">Los Angeles, CA</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-slate-700 p-2">
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-white">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-slate-700 p-2 sm:col-span-2">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-white">sarah.johnson@example.com</span>
            </div>
          </div>
        </div>

        <button
          className="flex items-center gap-1 rounded-md bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </button>
      </div>

      {isEditing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 border-t border-slate-700 pt-4"
        >
          <h3 className="mb-3 text-lg font-medium text-white">Edit Profile</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                defaultValue="Sarah Johnson"
                className="w-full rounded-md bg-slate-700 p-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Role</label>
              <input
                type="text"
                defaultValue="Coordinator"
                className="w-full rounded-md bg-slate-700 p-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Phone</label>
              <input
                type="text"
                defaultValue="+1 (555) 123-4567"
                className="w-full rounded-md bg-slate-700 p-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Location</label>
              <input
                type="text"
                defaultValue="Los Angeles, CA"
                className="w-full rounded-md bg-slate-700 p-2 text-sm text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                defaultValue="sarah.johnson@example.com"
                className="w-full rounded-md bg-slate-700 p-2 text-sm text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-300">Bio</label>
              <textarea
                defaultValue="Emergency response coordinator with 5 years of experience in disaster management."
                className="h-20 w-full resize-none rounded-md bg-slate-700 p-2 text-sm text-white"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
              onClick={() => setIsEditing(false)}
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

