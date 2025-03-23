import { Suspense } from "react"
import Header from "@/components/header"
import InventoryTable from "@/components/inventory-table"
import VolunteerProfile from "@/components/volunteer-profile"
import ResourceAllocation from "@/components/resource-allocation"
import UpcomingMissions from "@/components/upcoming-missions"

export default function NGOPortal() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto p-4 pt-20 md:p-6 md:pt-24">
        <h1 className="mb-6 text-2xl font-bold text-white md:text-3xl">NGO & Volunteer Portal</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<div className="h-96 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <InventoryTable />
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <UpcomingMissions />
            </Suspense>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <VolunteerProfile />
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <ResourceAllocation />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

