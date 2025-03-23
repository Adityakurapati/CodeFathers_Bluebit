import { Suspense } from "react"
import DisasterMap from "@/components/disaster-map"
import LiveStats from "@/components/live-stats"
import EmergencyActions from "@/components/emergency-actions"
import LoadingMap from "@/components/loading-map"
import Header from "@/components/header"

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-slate-900">
      <Header />
      <Suspense fallback={<LoadingMap />}>
        <DisasterMap />
      </Suspense>
      <LiveStats />
      <EmergencyActions />
    </main>
  )
}

