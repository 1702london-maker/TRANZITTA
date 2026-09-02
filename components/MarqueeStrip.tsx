'use client'
const ITEMS = [
  '🚗 Tranzitta Go', '🏫 School Transport', '🏢 Corporate Shuttles', '🎉 Event Buses', '✈️ Airport Transfers',
  '🔴 Panic Button', '📍 Live GPS', '📹 In-Car Camera', '🆔 Police-Vetted', '💳 15% Commission',
  '🚗 Tranzitta Go', '🏫 School Transport', '🏢 Corporate Shuttles', '🎉 Event Buses', '✈️ Airport Transfers',
  '🔴 Panic Button', '📍 Live GPS', '📹 In-Car Camera', '🆔 Police-Vetted', '💳 15% Commission',
]
export default function MarqueeStrip() {
  return (
    <div className="overflow-hidden py-4" style={{ background: 'var(--orange-blush)', borderTop: '1px solid var(--sage-border)', borderBottom: '1px solid var(--sage-border)' }}>
      <div className="marquee-track">
        {ITEMS.map((item, i) => (
          <span key={i} className="flex items-center gap-2 px-6 text-sm font-bold whitespace-nowrap" style={{ color: 'var(--text-main)' }}>
            {item} <span className="w-1 h-1 rounded-full inline-block" style={{ background: 'var(--orange-deep)' }} />
          </span>
        ))}
      </div>
    </div>
  )
}
