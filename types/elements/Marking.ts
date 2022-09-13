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
  '@d': number
  '@z1': number
  '@z2': number
  '@c': string
  '@w': number
}

interface Spray extends Line { }

interface Twigs {
  '@d': number
  '@z1': number
  '@z2': number
  '@size': number
  '@space': number
}

interface CustomMarkings {
  'custom-markings': Season
}

interface Season {
  summer?: Summer
  winter?: Winter
}

interface Summer {
  banner?: Banner[]
  line?: Line[]
}

interface Winter {
  twigs?: Twigs[]
  spray?: Spray[]
}

export { CustomMarkings, Banner, Line, Spray, Twigs }
