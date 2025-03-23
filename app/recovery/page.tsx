import { Suspense } from "react"
import Header from "@/components/header"
import ProjectCards from "@/components/project-cards"
import CommunityFeedback from "@/components/community-feedback"
import MentalHealthHub from "@/components/mental-health-hub"
import RecoveryProgress from "@/components/recovery-progress"

export default function Recovery() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto p-4 pt-20 md:p-6 md:pt-24">
        <h1 className="mb-6 text-2xl font-bold text-white md:text-3xl">Recovery & Rebuilding Tracker</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<div className="h-96 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <ProjectCards />
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <CommunityFeedback />
            </Suspense>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <RecoveryProgress />
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <MentalHealthHub />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

