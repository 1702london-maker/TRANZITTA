import { findLagosLocation } from './lagos-locations'

const baseFareByTier = {
  go: 1200,
  executive: 3000,
}

const perKmByTier = {
  go: 420,
  executive: 780,
}

const perMinuteByTier = {
  go: 80,
  executive: 140,
}

export type GoTier = 'go' | 'executive'

export function estimateGoFare(pickup: string, dropoff: string, tier: GoTier = 'go') {
  const from = findLagosLocation(pickup)
  const to = findLagosLocation(dropoff)
  if (!from || !to) return null

  const straightKm = haversineKm(from.lat, from.lng, to.lat, to.lng)
  const roadKm = Math.max(2.2, straightKm * 1.34)
  const trafficMultiplier = getTrafficMultiplier(from.area, to.area)
  const minutes = Math.max(12, Math.round((roadKm / 24) * 60 * trafficMultiplier))
  const surgeMultiplier = getSeededSurgeMultiplier(from.area, to.area)
  const rawFare =
    (baseFareByTier[tier] + roadKm * perKmByTier[tier] + minutes * perMinuteByTier[tier]) *
    surgeMultiplier

  const controlledFare = Math.ceil(rawFare / 100) * 100

  return {
    tier,
    controlledFare,
    fareRangeLow: Math.max(1000, controlledFare - 400),
    fareRangeHigh: controlledFare + 500,
    distanceMeters: Math.round(roadKm * 1000),
    trafficDurationSeconds: minutes * 60,
    surgeMultiplier,
    provider: 'tranzitta_seeded_lagos',
    trafficLabel: trafficMultiplier >= 1.45 ? 'Heavy Lagos traffic' : trafficMultiplier >= 1.2 ? 'Moderate Lagos traffic' : 'Light Lagos traffic',
  }
}

function getTrafficMultiplier(fromArea: string, toArea: string) {
  const route = `${fromArea.toLowerCase()} ${toArea.toLowerCase()}`
  if (route.includes('lekki') && route.includes('ikeja')) return 1.55
  if (route.includes('island') && route.includes('mainland')) return 1.4
  if (route.includes('airport') || route.includes('ikeja')) return 1.25
  return 1.12
}

function getSeededSurgeMultiplier(fromArea: string, toArea: string) {
  const route = `${fromArea.toLowerCase()} ${toArea.toLowerCase()}`
  if (route.includes('victoria island') || route.includes('lekki')) return 1.15
  return 1
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const radiusKm = 6371
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  return 2 * radiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function toRadians(value: number) {
  return (value * Math.PI) / 180
}
