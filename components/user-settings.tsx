"use client"

import { useState } from "react"
import { Bell, Moon, Globe, Lock, ToggleLeft, ToggleRight } from "lucide-react"

export default function UserSettings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    location: true,
    twoFactor: false,
  })

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Settings</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-slate-700 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
              <Bell className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Notifications</h3>
              <p className="text-xs text-gray-300">Receive emergency alerts</p>
            </div>
          </div>
          <button onClick={() => toggleSetting("notifications")}>
            {settings.notifications ? (
              <ToggleRight className="h-6 w-6 text-blue-400" />
            ) : (
              <ToggleLeft className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-slate-700 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
              <Moon className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Dark Mode</h3>
              <p className="text-xs text-gray-300">Use dark theme</p>
            </div>
          </div>
          <button onClick={() => toggleSetting("darkMode")}>
            {settings.darkMode ? (
              <ToggleRight className="h-6 w-6 text-purple-400" />
            ) : (
              <ToggleLeft className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-slate-700 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
              <Globe className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Location Sharing</h3>
              <p className="text-xs text-gray-300">Share location with team</p>
            </div>
          </div>
          <button onClick={() => toggleSetting("location")}>
            {settings.location ? (
              <ToggleRight className="h-6 w-6 text-green-400" />
            ) : (
              <ToggleLeft className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-slate-700 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20">
              <Lock className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Two-Factor Auth</h3>
              <p className="text-xs text-gray-300">Enhanced security</p>
            </div>
          </div>
          <button onClick={() => toggleSetting("twoFactor")}>
            {settings.twoFactor ? (
              <ToggleRight className="h-6 w-6 text-amber-400" />
            ) : (
              <ToggleLeft className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <button className="mt-4 w-full rounded-md bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-700">
        Save Settings
      </button>
    </div>
  )
}

