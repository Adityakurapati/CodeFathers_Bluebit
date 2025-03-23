import { Suspense } from "react"
import Header from "@/components/header"
import SOSRequestPanel from "@/components/sos-request-panel"
import VolunteerTaskBoard from "@/components/volunteer-task-board"
import ResourceTracker from "@/components/resource-tracker"
import EmergencyStatusCard from "@/components/emergency-status-card"
import VolunteerMap from "@/components/volunteer-map"

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto p-4 pt-20 md:p-6 md:pt-24">
        <h1 className="mb-6 text-2xl font-bold text-white md:text-3xl">Emergency Response Dashboard</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Suspense fallback={<div className="h-24 rounded-lg bg-slate-800 animate-pulse"></div>}>
                <EmergencyStatusCard title="Active Emergencies" value={12} change={+3} color="red" />
              </Suspense>

              <Suspense fallback={<div className="h-24 rounded-lg bg-slate-800 animate-pulse"></div>}>
                <EmergencyStatusCard title="Volunteers Deployed" value={248} change={+24} color="blue" />
              </Suspense>

              <Suspense fallback={<div className="h-24 rounded-lg bg-slate-800 animate-pulse"></div>}>
                <EmergencyStatusCard title="Resources Deployed" value={34} change={+5} color="green" />
              </Suspense>
            </div>

            <Suspense fallback={<div className="h-96 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <SOSRequestPanel />
            </Suspense>

            <div className="mt-6">
              <Suspense fallback={<div className="h-44 rounded-lg bg-slate-800 animate-pulse"></div>}>
                <VolunteerTaskBoard />
              </Suspense>
            </div>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<div className="h-80 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <VolunteerMap />
            </Suspense>

            <Suspense fallback={<div className="h-44 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <ResourceTracker />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

