interface Model {
  model: _Model
}

interface _Model {
  batch: Batch[]
  '@id': string
}

interface Batch {
  vertex: Vertex[]
  face: Face[]
  '@id': string
  '@texture1': string
  '@material': string
  '@fvf': string
  '@order': string
}

interface Face {
  '@v2': string
  '@v1': string
  '@v3': string
}

interface Vertex {
  '@id': string
  '@x': string
  '@y': string
  '@z': string
  '@diffuse': string
}

export { Model }
