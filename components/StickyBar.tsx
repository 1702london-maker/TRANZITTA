'use client'
export default function StickyBar() {
  return (
    <div className="trz-top-bar trz-top-gradient fixed bottom-0 left-0 right-0 flex items-center justify-center px-4" style={{ zIndex: 9999 }}>
      <p className="text-xs font-semibold text-white text-center">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mr-2 align-middle" />
        Now Live in Lagos — Uber exited Nigeria. We stayed. &nbsp;
        <a href="#verticals" className="underline underline-offset-2 opacity-80 hover:opacity-100">Explore all verticals →</a>
      </p>
    </div>
  )
}
