import { Suspense } from "react"
import Header from "@/components/header"
import EmergencyModePanel from "@/components/emergency-mode-panel"
import EmergencyAlerts from "@/components/emergency-alerts"
import EmergencyContacts from "@/components/emergency-contacts"
import EmergencyInstructions from "@/components/emergency-instructions"
import EmergencyMap from "@/components/emergency-map"

export default function Emergency() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto p-4 pt-20 md:p-6 md:pt-24">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-white md:text-3xl">Emergency Mode</h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1">
              <span className="animate-pulse text-red-500">●</span>
              <span className="text-sm font-medium text-white">EMERGENCY ACTIVE</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<div className="h-96 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <EmergencyModePanel />
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <EmergencyMap />
            </Suspense>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <EmergencyAlerts />
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <EmergencyContacts />
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <EmergencyInstructions />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

