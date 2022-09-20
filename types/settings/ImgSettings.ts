interface ImgSettings {
  scalingFactor: number
  originDistance: OriginDistance
  ignoreColor: OptionalImgSetting
  pixelSize: number
  useColor: OptionalImgSetting
  tags: Record<'banner' | 'line' | 'spray' | 'twigs', boolean>
}

interface OptionalImgSetting {
  include: boolean
  value: string
}

interface OriginDistance {
  x: number
  z: number
}

export { ImgSettings }
