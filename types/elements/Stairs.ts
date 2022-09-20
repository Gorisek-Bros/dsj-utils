interface Profile {
  profile: _Profile
}

interface _Profile {
  '@id': string
  '@refx': string
  start: Start
  line: Line[]
}

interface Start {
  '@x': number
  '@y': number
  '@refy': string
}

interface Line {
  '@x': number
  '@y': number
  '@refyx'?: number
  '@refy': string
}

interface Pillar {
  '@refx': string
  '@refy': string
  '@x1': number
  '@x2': number
  '@ty': number
  '@lz': number
  '@rz': number
  '@step': number
  '@count': number
  '@t': string
  '@m': string
  '@c': string
}

export { Profile, Start, Line, Pillar }
