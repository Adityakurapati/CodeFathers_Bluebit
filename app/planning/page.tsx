import { Suspense } from "react"
import Header from "@/components/header"
import RiskHeatmap from "@/components/risk-heatmap"
import CommunityReportsFeed from "@/components/community-reports-feed"
import PreparednessTips from "@/components/preparedness-tips"
import PersonalizedChecklist from "@/components/personalized-checklist"

export default function Planning() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto p-4 pt-20 md:p-6 md:pt-24">
        <h1 className="mb-6 text-2xl font-bold text-white md:text-3xl">Risk Mitigation & Preparedness Hub</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<div className="h-96 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <RiskHeatmap />
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <CommunityReportsFeed />
            </Suspense>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <PersonalizedChecklist />
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <PreparednessTips />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

