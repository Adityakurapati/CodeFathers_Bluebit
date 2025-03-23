"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, Navigation, Mic, X, Camera, MapPin, Send } from "lucide-react"
import React from 'react'

// Extend Window interface for WebKit types
declare global {
        interface Window {
                webkitSpeechRecognition: any
        }
}

interface EmergencyActionsProps {
        showEvacuationRoute?: boolean
        setShowEvacuationRoute: (show: boolean) => void
}

export default function EmergencyActions({
        showEvacuationRoute = false,
        setShowEvacuationRoute
}: EmergencyActionsProps) {
        const [sosModalOpen, setSosModalOpen] = useState(false)
        const [voiceCommandActive, setVoiceCommandActive] = useState(false)
        const [voiceCommand, setVoiceCommand] = useState("")
        const [voiceCommandFeedback, setVoiceCommandFeedback] = useState("")
        const [listening, setListening] = useState(false)

        // Voice command handling remains the same
        const executeVoiceCommand = (command: string) => {
                const cmd = command.toLowerCase().trim()
                setVoiceCommandFeedback("")

                if (cmd.includes("evacuation") || cmd.includes("route") || cmd.includes("escape")) {
                        if (cmd.includes("show") || cmd.includes("display") || cmd.includes("find") || cmd.includes("get")) {
                                setShowEvacuationRoute(true)
                                setVoiceCommandFeedback("Showing evacuation route")
                                return true
                        } else if (cmd.includes("hide") || cmd.includes("remove") || cmd.includes("clear")) {
                                setShowEvacuationRoute(false)
                                setVoiceCommandFeedback("Hiding evacuation route")
                                return true
                        }
                }

                if ((cmd.includes("sos") || cmd.includes("emergency") || cmd.includes("help")) &&
                        (cmd.includes("send") || cmd.includes("call") || cmd.includes("report"))) {
                        setSosModalOpen(true)
                        setVoiceCommandFeedback("Opening SOS emergency form")
                        return true
                }

                const disasterTypes = ["fire", "flood", "earthquake", "medical", "trapped"]
                for (const type of disasterTypes) {
                        if (cmd.includes(type) && (cmd.includes("report") || cmd.includes("alert"))) {
                                setSosModalOpen(true)
                                setVoiceCommandFeedback(`Reporting ${type} emergency`)
                                return true
                        }
                }

                if (cmd.includes("cancel") || cmd.includes("close") || cmd.includes("exit")) {
                        setVoiceCommandActive(false)
                        return true
                }

                setVoiceCommandFeedback("Command not recognized. Try 'show evacuation route', 'report fire', or 'send SOS'")
                return false
        }

        const handleCommandSubmit = (e: React.FormEvent) => {
                e.preventDefault()
                if (voiceCommand.trim()) {
                        executeVoiceCommand(voiceCommand)
                        setVoiceCommand("")
                }
        }

        useEffect(() => {
                if (!voiceCommandActive) return

                let recognition: any = null

                // Explicitly use WebKit speech recognition
                if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
                        recognition = new window.webkitSpeechRecognition()

                        recognition.continuous = false
                        recognition.interimResults = false
                        recognition.lang = 'en-US'

                        recognition.onstart = () => {
                                setListening(true)
                                setVoiceCommandFeedback("Listening...")
                        }

                        recognition.onresult = (event: any) => {
                                const transcript = event.results[0][0].transcript
                                setVoiceCommand(transcript)
                                executeVoiceCommand(transcript)
                        }

                        recognition.onerror = (event: any) => {
                                console.error('WebKit speech recognition error:', event.error)
                                setListening(false)
                                setVoiceCommandFeedback(`Error: ${event.error}. Try typing your command instead.`)
                        }

                        recognition.onend = () => {
                                setListening(false)
                                if (voiceCommandActive) {
                                        setTimeout(() => {
                                                try {
                                                        recognition.start()
                                                } catch (e) {
                                                        console.error('Could not restart WebKit speech recognition:', e)
                                                }
                                        }, 1000)
                                }
                        }

                        try {
                                recognition.start()
                        } catch (e) {
                                console.error('WebKit speech recognition failed to start:', e)
                                setVoiceCommandFeedback("Couldn't start voice recognition. Try typing your command.")
                        }
                } else {
                        setVoiceCommandFeedback("WebKit voice recognition not supported in this browser. Please type your commands.")
                }

                return () => {
                        if (recognition) {
                                try {
                                        recognition.stop()
                                } catch (e) {
                                        console.error('Could not stop WebKit speech recognition:', e)
                                }
                        }
                }
        }, [voiceCommandActive])

        // The rest of the component remains unchanged
        return (
                <>
                        {/* Floating Action Buttons */}
                        <div className="fixed bottom-4 right-4 z-20 flex flex-col gap-3 md:bottom-8 md:right-8">
                                {/* Voice Command Button */}
                                <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setVoiceCommandActive(true)}
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 md:h-14 md:w-14"
                                >
                                        <Mic className="h-6 w-6" />
                                </motion.button>

                                {/* Evacuation Route Button */}
                                <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowEvacuationRoute(!showEvacuationRoute)}
                                        className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg md:h-14 md:w-14 ${showEvacuationRoute ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                                                }`}
                                >
                                        <Navigation className="h-6 w-6" />
                                </motion.button>

                                {/* SOS Button */}
                                <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 md:h-20 md:w-20"
                                        onClick={() => setSosModalOpen(true)}
                                >
                                        <motion.span
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                                                className="absolute inset-0 rounded-full bg-red-500 opacity-50"
                                        />
                                        <span className="relative z-10 text-xl font-bold md:text-2xl">SOS</span>
                                </motion.button>
                        </div>

                        {/* SOS Modal */}
                        <AnimatePresence>
                                {sosModalOpen && (
                                        <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
                                        >
                                                <motion.div
                                                        initial={{ scale: 0.9, y: 20 }}
                                                        animate={{ scale: 1, y: 0 }}
                                                        exit={{ scale: 0.9, y: 20 }}
                                                        className="w-full max-w-md rounded-lg bg-slate-800 p-6 shadow-xl"
                                                >
                                                        <div className="mb-4 flex items-center justify-between">
                                                                <h2 className="text-2xl font-bold text-white">Emergency SOS</h2>
                                                                <button onClick={() => setSosModalOpen(false)} className="rounded-full p-1 hover:bg-slate-700">
                                                                        <X className="h-6 w-6 text-gray-400" />
                                                                </button>
                                                        </div>

                                                        <div className="mb-4">
                                                                <p className="mb-2 text-sm text-gray-300">Your current location:</p>
                                                                <div className="flex items-center rounded-md bg-slate-700 p-3">
                                                                        <MapPin className="mr-2 h-5 w-5 text-red-400" />
                                                                        <span className="text-white">34.052235, -118.243683</span>
                                                                </div>
                                                        </div>

                                                        <div className="mb-4">
                                                                <p className="mb-2 text-sm text-gray-300">Emergency type:</p>
                                                                <div className="grid grid-cols-3 gap-2">
                                                                        {["Fire", "Flood", "Earthquake", "Medical", "Trapped", "Other"].map((type) => (
                                                                                <button key={type} className="rounded-md bg-slate-700 p-2 text-sm text-white hover:bg-slate-600">
                                                                                        {type}
                                                                                </button>
                                                                        ))}
                                                                </div>
                                                        </div>

                                                        <div className="mb-4">
                                                                <p className="mb-2 text-sm text-gray-300">Add details (optional):</p>
                                                                <textarea
                                                                        className="h-20 w-full rounded-md bg-slate-700 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        placeholder="Describe your situation..."
                                                                />
                                                        </div>

                                                        <div className="mb-6 flex gap-2">
                                                                <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-slate-700 p-3 text-white hover:bg-slate-600">
                                                                        <Camera className="h-5 w-5" />
                                                                        <span>Add Photo</span>
                                                                </button>
                                                                <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-slate-700 p-3 text-white hover:bg-slate-600">
                                                                        <Mic className="h-5 w-5" />
                                                                        <span>Voice Note</span>
                                                                </button>
                                                        </div>

                                                        <button className="w-full rounded-md bg-red-600 p-3 text-lg font-bold text-white hover:bg-red-700">
                                                                Send SOS Alert
                                                        </button>

                                                        <p className="mt-4 text-center text-xs text-gray-400">
                                                                Your alert will be sent to all nearby emergency responders and volunteers
                                                        </p>
                                                </motion.div>
                                        </motion.div>
                                )}
                        </AnimatePresence>

                        {/* Evacuation Route Notification */}
                        <AnimatePresence>
                                {showEvacuationRoute && (
                                        <motion.div
                                                initial={{ y: 100, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: 100, opacity: 0 }}
                                                className="fixed bottom-24 left-0 right-0 z-30 mx-auto w-full max-w-sm rounded-lg bg-blue-600 p-4 shadow-lg md:bottom-8"
                                        >
                                                <div className="flex items-start">
                                                        <Navigation className="mr-3 h-6 w-6 text-white" />
                                                        <div className="flex-1">
                                                                <h3 className="font-bold text-white">Evacuation Route Active</h3>
                                                                <p className="text-sm text-blue-100">
                                                                        Follow the highlighted path to the nearest shelter (1.2 miles away)
                                                                </p>
                                                        </div>
                                                        <button onClick={() => setShowEvacuationRoute(false)} className="rounded-full p-1 hover:bg-blue-700">
                                                                <X className="h-5 w-5 text-blue-200" />
                                                        </button>
                                                </div>
                                        </motion.div>
                                )}
                        </AnimatePresence>

                        {/* Voice Command Interface */}
                        <AnimatePresence>
                                {voiceCommandActive && (
                                        <motion.div
                                                initial={{ y: 100, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: 100, opacity: 0 }}
                                                className="fixed bottom-24 left-0 right-0 z-30 mx-auto w-full max-w-sm rounded-lg bg-purple-600 p-4 shadow-lg md:bottom-8"
                                        >
                                                <div className="flex items-start">
                                                        <Mic className={`mr-3 h-6 w-6 ${listening ? "animate-pulse" : ""} text-white`} />
                                                        <div className="flex-1">
                                                                <h3 className="font-bold text-white">{listening ? "Listening..." : "Voice Command"}</h3>
                                                                <p className="text-sm text-purple-100">
                                                                        {voiceCommandFeedback || "Say a command like 'Show evacuation route' or 'Report fire'"}
                                                                </p>
                                                        </div>
                                                        <button onClick={() => setVoiceCommandActive(false)} className="rounded-full p-1 hover:bg-purple-700">
                                                                <X className="h-5 w-5 text-purple-200" />
                                                        </button>
                                                </div>
                                                <form onSubmit={handleCommandSubmit} className="mt-3 flex">
                                                        <input
                                                                type="text"
                                                                value={voiceCommand}
                                                                onChange={(e) => setVoiceCommand(e.target.value)}
                                                                className="flex-1 rounded-l-md bg-purple-700 p-2 text-white placeholder-purple-300 focus:outline-none"
                                                                placeholder="Type a command..."
                                                        />
                                                        <button
                                                                type="submit"
                                                                className="rounded-r-md bg-purple-800 px-3 text-white hover:bg-purple-900"
                                                        >
                                                                <Send className="h-5 w-5" />
                                                        </button>
                                                </form>

                                                {/* Command suggestions */}
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                        {["Show route", "Report fire", "Send SOS", "Hide route"].map((cmd) => (
                                                                <button
                                                                        key={cmd}
                                                                        onClick={() => {
                                                                                setVoiceCommand(cmd)
                                                                                executeVoiceCommand(cmd)
                                                                        }}
                                                                        className="rounded-full bg-purple-700 px-3 py-1 text-xs text-white hover:bg-purple-800"
                                                                >
                                                                        {cmd}
                                                                </button>
                                                        ))}
                                                </div>
                                        </motion.div>
                                )}
                        </AnimatePresence>

                        {/* Bottom Navigation (Mobile) */}
                        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-700 bg-slate-800 bg-opacity-90 backdrop-blur-sm md:hidden">
                                <div className="flex items-center justify-around">
                                        {[
                                                { icon: <MapPin className="h-5 w-5" />, label: "Map" },
                                                { icon: <AlertCircle className="h-5 w-5" />, label: "SOS", onClick: () => setSosModalOpen(true) },
                                                { icon: <Navigation className="h-5 w-5" />, label: "Routes", onClick: () => setShowEvacuationRoute(!showEvacuationRoute) },
                                                { icon: <Mic className="h-5 w-5" />, label: "Voice", onClick: () => setVoiceCommandActive(true) },
                                        ].map((item, index) => (
                                                <button
                                                        key={index}
                                                        className="flex flex-1 flex-col items-center justify-center py-3"
                                                        onClick={item.onClick}
                                                >
                                                        <div className="text-white">{item.icon}</div>
                                                        <span className="mt-1 text-xs text-gray-300">{item.label}</span>
                                                </button>
                                        ))}
                                </div>
                        </div>
                </>
        )
}