interface Banner {
  '@d1': number
  '@d2': number
  '@z1': number
  '@z2': number
  '@c': string
  '@w': number
  '@side': string
}

interface Line {
  d: number
  z1: number
  z2: number
  c: string
  w: number
}

interface CustomMarkings {
  'custom-markings': Season
}

interface Season {
  summer: Summer
}

interface Summer {
  banner: Banner[]
}

export { CustomMarkings, Banner, Line }
