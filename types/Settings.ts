interface Settings {
  scalingFactor: number
  originDistance: OriginDistance
  ignoreColor: string
  pixelSize: number
  useColor: string
  tags: Array<'banner' | 'line' | 'spray' | 'twigs'>
}

interface OriginDistance {
  x: number
  z: number
}

export { Settings }
