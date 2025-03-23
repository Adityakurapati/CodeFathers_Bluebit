import { Suspense } from "react"
import Header from "@/components/header"
import ChatInterface from "@/components/chat-interface"
import TeamDirectory from "@/components/team-directory"
import EmergencyBroadcast from "@/components/emergency-broadcast"
import CommunicationChannels from "@/components/communication-channels"

export default function Communication() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto p-4 pt-20 md:p-6 md:pt-24">
        <h1 className="mb-6 text-2xl font-bold text-white md:text-3xl">Communication Center</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<div className="h-96 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <ChatInterface />
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <EmergencyBroadcast />
            </Suspense>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <TeamDirectory />
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <CommunicationChannels />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

