"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Bell, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4 md:p-6">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white md:text-3xl">
          <span className="animate-pulse text-red-500">●</span>
          DisasterResponse
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-white hover:text-blue-400">
              Map
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-white hover:text-blue-400">
              Dashboard
            </Link>
            <Link href="/emergency" className="text-sm font-medium text-white hover:text-blue-400">
              Emergency
            </Link>
            <Link href="/resources" className="text-sm font-medium text-white hover:text-blue-400">
              Resources
            </Link>
            <Link href="/communication" className="text-sm font-medium text-white hover:text-blue-400">
              Communication
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-700">
              <Bell className="h-5 w-5" />
            </button>
            <Link
              href="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-700"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-700 md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900 bg-opacity-95 md:hidden"
          >
            <div className="flex h-full flex-col p-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
                  <span className="text-red-500">●</span>
                  DisasterResponse
                </Link>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-700"
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-lg p-3 text-lg font-medium text-white hover:bg-slate-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Map
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-lg p-3 text-lg font-medium text-white hover:bg-slate-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/emergency"
                  className="flex items-center gap-2 rounded-lg p-3 text-lg font-medium text-white hover:bg-slate-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Emergency
                </Link>
                <Link
                  href="/resources"
                  className="flex items-center gap-2 rounded-lg p-3 text-lg font-medium text-white hover:bg-slate-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Resources
                </Link>
                <Link
                  href="/communication"
                  className="flex items-center gap-2 rounded-lg p-3 text-lg font-medium text-white hover:bg-slate-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Communication
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-lg p-3 text-lg font-medium text-white hover:bg-slate-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
              </nav>

              <div className="mt-auto">
                <button className="w-full rounded-lg bg-red-600 p-3 text-lg font-bold text-white hover:bg-red-700">
                  Emergency SOS
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

