"use client"

import { Phone, MessageSquare, Star, ChevronRight } from "lucide-react"

// Mock contact data
const CONTACTS = [
  {
    id: 1,
    name: "Emergency Services",
    number: "911",
    type: "emergency",
  },
  {
    id: 2,
    name: "Local Fire Department",
    number: "555-123-4567",
    type: "fire",
  },
  {
    id: 3,
    name: "Medical Response Team",
    number: "555-987-6543",
    type: "medical",
  },
  {
    id: 4,
    name: "Disaster Relief Center",
    number: "555-456-7890",
    type: "relief",
  },
  {
    id: 5,
    name: "Emergency Contact: John",
    number: "555-234-5678",
    type: "personal",
  },
]

export default function EmergencyContacts() {
  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Emergency Contacts</h2>

      <div className="space-y-2">
        {CONTACTS.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between rounded-lg bg-slate-700 p-3 hover:bg-slate-600"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  contact.type === "emergency"
                    ? "bg-red-500/20 text-red-400"
                    : contact.type === "fire"
                      ? "bg-orange-500/20 text-orange-400"
                      : contact.type === "medical"
                        ? "bg-blue-500/20 text-blue-400"
                        : contact.type === "relief"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-purple-500/20 text-purple-400"
                }`}
              >
                {contact.type === "personal" ? <Star className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
              </div>
              <div>
                <h3 className="font-medium text-white">{contact.name}</h3>
                <p className="text-sm text-gray-300">{contact.number}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="rounded-full bg-slate-600 p-2 hover:bg-slate-500">
                <Phone className="h-4 w-4 text-white" />
              </button>
              <button className="rounded-full bg-slate-600 p-2 hover:bg-slate-500">
                <MessageSquare className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-md bg-slate-700 p-2 text-sm text-white hover:bg-slate-600">
        <span>View All Contacts</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

