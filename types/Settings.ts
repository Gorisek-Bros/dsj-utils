interface Settings {
  scalingFactor: number
  originDistance: OriginDistance
  ignoreColor: string
  pixelSize: number
  useColor: string
  tags: Record<'banner' | 'line' | 'spray' | 'twigs', boolean>
}

interface OriginDistance {
  x: number
  z: number
}

export { Settings }
