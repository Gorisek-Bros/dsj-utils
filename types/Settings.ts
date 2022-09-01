interface Settings {
  scalingFactor: number
  originDistance: OriginDistance
  ignoreColor: string
  pixelSize: number
  useColor: string
}

interface OriginDistance {
  x: number
  z: number
}

export { Settings }
