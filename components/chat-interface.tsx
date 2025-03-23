"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Paperclip, Mic, Image, MapPin, User, Shield } from "lucide-react"

// Mock message data
const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "John Medic",
    role: "medical",
    content:
      "We need additional medical supplies at the Riverside shelter. Several people with minor injuries arriving.",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "Sarah Coordinator",
    role: "coordinator",
    content: "I'll dispatch a team with supplies. ETA 15 minutes.",
    time: "10:32 AM",
  },
  {
    id: 3,
    sender: "Mike Rescue",
    role: "rescue",
    content: "Team 2 reporting: We've cleared the eastern sector. Moving to support downtown area.",
    time: "10:40 AM",
  },
  {
    id: 4,
    sender: "Emergency System",
    role: "system",
    content: "ALERT: Flash flood warning extended for another 3 hours in zones B and C.",
    time: "10:45 AM",
  },
]

export default function ChatInterface() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const sendMessage = () => {
    if (newMessage.trim() === "") return

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 5,
        sender: "You",
        role: "coordinator",
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])

    setNewMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "medical":
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20">
            <Shield className="h-3 w-3 text-red-400" />
          </div>
        )
      case "rescue":
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20">
            <Shield className="h-3 w-3 text-amber-400" />
          </div>
        )
      case "coordinator":
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
            <Shield className="h-3 w-3 text-blue-400" />
          </div>
        )
      case "system":
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20">
            <Shield className="h-3 w-3 text-purple-400" />
          </div>
        )
      default:
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-500/20">
            <User className="h-3 w-3 text-gray-400" />
          </div>
        )
    }
  }

  return (
    <div className="flex h-[500px] flex-col rounded-lg bg-slate-800 shadow-lg">
      <div className="border-b border-slate-700 p-4">
        <h2 className="text-xl font-bold text-white">Emergency Response Chat</h2>
        <p className="text-sm text-gray-400">Team communication channel</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "You"
                    ? "bg-blue-600 text-white"
                    : message.role === "system"
                      ? "bg-purple-500/20 text-white"
                      : "bg-slate-700 text-white"
                }`}
              >
                <div className="mb-1 flex items-center gap-2">
                  {message.sender !== "You" && getRoleBadge(message.role)}
                  <span className="font-medium">{message.sender}</span>
                  <span className="text-xs opacity-70">{message.time}</span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-slate-700 p-3">
        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 text-gray-400 hover:bg-slate-700 hover:text-white">
            <Paperclip className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 text-gray-400 hover:bg-slate-700 hover:text-white">
            <Image className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 text-gray-400 hover:bg-slate-700 hover:text-white">
            <MapPin className="h-5 w-5" />
          </button>

          <textarea
            className="flex-1 resize-none rounded-md bg-slate-700 p-2 text-sm text-white placeholder-gray-400 focus:outline-none"
            placeholder="Type a message..."
            rows={1}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="rounded-full p-2 text-gray-400 hover:bg-slate-700 hover:text-white">
            <Mic className="h-5 w-5" />
          </button>
          <button className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700" onClick={sendMessage}>
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

