interface Settings {
  scalingFactor: number
  originDistance: OriginDistance
  ignoreColor: OptionalSetting
  pixelSize: number
  useColor: OptionalSetting
  tags: Record<'banner' | 'line' | 'spray' | 'twigs', boolean>
}

interface OptionalSetting {
  include: boolean
  value: string
}

interface OriginDistance {
  x: number
  z: number
}

export { Settings }
