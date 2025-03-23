import { Suspense } from "react"
import Header from "@/components/header"
import UserProfile from "@/components/user-profile"
import EmergencyContacts from "@/components/emergency-contacts"
import UserSettings from "@/components/user-settings"
import UserActivity from "@/components/user-activity"

export default function Profile() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto p-4 pt-20 md:p-6 md:pt-24">
        <h1 className="mb-6 text-2xl font-bold text-white md:text-3xl">User Profile</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <UserProfile />
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <UserActivity />
            </Suspense>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <UserSettings />
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-lg bg-slate-800 animate-pulse"></div>}>
              <EmergencyContacts />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

