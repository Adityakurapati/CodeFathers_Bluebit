'use client';

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import LiveStats from "@/components/live-stats";
import EmergencyActions from "@/components/emergency-actions";
import LoadingMap from "@/components/loading-map";
import Header from "@/components/header";

// Dynamically import DisasterMap with SSR disabled
const DisasterMap = dynamic(() => import("@/components/disaster-map"), {
        ssr: false,
        loading: () => <LoadingMap />, // Show a loading fallback while the component is being loaded
});

export default function Home() {
        const [showEvacuationRoute, setShowEvacuationRoute] = useState(false);

        return (
                <main className="relative h-screen w-full overflow-hidden bg-slate-900">
                        <Header />
                        <Suspense fallback={<LoadingMap />}>
                                <DisasterMap showEvacuationRoute={showEvacuationRoute} />
                        </Suspense>
                        <LiveStats />
                        <EmergencyActions
                                showEvacuationRoute={showEvacuationRoute}
                                setShowEvacuationRoute={setShowEvacuationRoute}
                        />
                </main>
        );
}