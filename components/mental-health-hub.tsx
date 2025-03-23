"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Heart, Calendar, ArrowRight } from "lucide-react"

// Mock support messages
const SUPPORT_MESSAGES = [
  "You're not alone in this recovery journey.",
  "It's okay to ask for help when you need it.",
  "One day at a time - progress is still progress.",
  "Your feelings are valid, whatever they may be.",
  "Self-care isn't selfish, it's necessary.",
  "Healing takes time, be patient with yourself.",
  "Connecting with others can help the healing process.",
  "Your strength through this difficult time is inspiring.",
]

export default function MentalHealthHub() {
  const [messages, setMessages] = useState<{ id: number; text: string; position: { x: number; y: number } }[]>([])

  useEffect(() => {
    // Create initial bubbles
    const initialBubbles = SUPPORT_MESSAGES.slice(0, 4).map((text, index) => ({
      id: index,
      text,
      position: {
        x: Math.random() * 80 + 10, // 10% to 90% of width
        y: Math.random() * 80 + 10, // 10% to 90% of height
      },
    }))

    setMessages(initialBubbles)

    // Add new bubbles periodically
    const interval = setInterval(() => {
      const randomMessage = SUPPORT_MESSAGES[Math.floor(Math.random() * SUPPORT_MESSAGES.length)]

      setMessages((prev) => {
        // Remove oldest bubble if we have more than 5
        const newMessages = prev.length >= 5 ? [...prev.slice(1)] : [...prev]

        // Add new bubble
        return [
          ...newMessages,
          {
            id: Date.now(),
            text: randomMessage,
            position: {
              x: Math.random() * 80 + 10,
              y: Math.random() * 80 + 10,
            },
          },
        ]
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Mental Health Support</h2>

      <div className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-b from-purple-500/20 to-blue-500/20">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              x: [`${message.position.x}%`, `${message.position.x + (Math.random() * 10 - 5)}%`],
              y: [`${message.position.y}%`, `${message.position.y - 20}%`],
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1 },
              y: { duration: 10, ease: "linear" },
              x: { duration: 10, ease: "linear", repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
            }}
            className="absolute max-w-[80%] transform -translate-x-1/2 rounded-lg bg-white/10 p-3 backdrop-blur-sm"
            style={{
              left: `${message.position.x}%`,
              top: `${message.position.y}%`,
            }}
          >
            <p className="text-sm text-white">{message.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="flex items-center justify-center gap-2 rounded-lg bg-purple-500/20 p-3 text-sm text-white hover:bg-purple-500/30">
          <MessageCircle className="h-5 w-5 text-purple-400" />
          <span>Chat Support</span>
        </button>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-pink-500/20 p-3 text-sm text-white hover:bg-pink-500/30">
          <Heart className="h-5 w-5 text-pink-400" />
          <span>Self-Care Tips</span>
        </button>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-500/20 p-3 text-sm text-white hover:bg-blue-500/30">
          <Calendar className="h-5 w-5 text-blue-400" />
          <span>Schedule Session</span>
        </button>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-green-500/20 p-3 text-sm text-white hover:bg-green-500/30">
          <ArrowRight className="h-5 w-5 text-green-400" />
          <span>Resources</span>
        </button>
      </div>
    </div>
  )
}

