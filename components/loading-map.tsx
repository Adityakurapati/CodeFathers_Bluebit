import { Loader2 } from "lucide-react"

export default function LoadingMap() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="text-lg font-medium text-white">Loading disaster map...</p>
      </div>
    </div>
  )
}

