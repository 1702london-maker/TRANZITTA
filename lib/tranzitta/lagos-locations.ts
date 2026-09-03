export type LagosLocation = {
  name: string
  area: string
  lat: number
  lng: number
}

export const lagosLocations: LagosLocation[] = [
  { name: 'Murtala Muhammed International Airport', area: 'Ikeja', lat: 6.5774, lng: 3.3211 },
  { name: 'Ikeja GRA', area: 'Ikeja', lat: 6.5833, lng: 3.35 },
  { name: 'Maryland Mall', area: 'Maryland', lat: 6.5728, lng: 3.3675 },
  { name: 'Yaba', area: 'Lagos Mainland', lat: 6.5158, lng: 3.3897 },
  { name: 'Surulere', area: 'Lagos Mainland', lat: 6.5003, lng: 3.358 },
  { name: 'Lagos Island', area: 'Island', lat: 6.4541, lng: 3.3947 },
  { name: 'Ikoyi', area: 'Island', lat: 6.4549, lng: 3.4246 },
  { name: 'Victoria Island', area: 'Island', lat: 6.4281, lng: 3.4219 },
  { name: 'Eko Hotel', area: 'Victoria Island', lat: 6.4269, lng: 3.4305 },
  { name: 'Lekki Phase 1', area: 'Lekki', lat: 6.4474, lng: 3.4723 },
  { name: 'Chevron Drive', area: 'Lekki', lat: 6.4467, lng: 3.5412 },
  { name: 'Ajah', area: 'Eti-Osa', lat: 6.4698, lng: 3.5852 },
]

export function findLagosLocation(value: string) {
  const normalized = value.trim().toLowerCase()
  return lagosLocations.find((location) => location.name.toLowerCase() === normalized)
}

export function projectLagosPoint(location?: LagosLocation) {
  if (!location) return null

  const bounds = {
    minLat: 6.39,
    maxLat: 6.61,
    minLng: 3.28,
    maxLng: 3.62,
  }

  const x = ((location.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100
  const y = (1 - (location.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100

  return {
    x: Math.min(92, Math.max(8, x)),
    y: Math.min(84, Math.max(12, y)),
  }
}
