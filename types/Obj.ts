interface Batch {
  id: string
  diffuse: string
  vertices: Vertex[]
  faces: Face[]
}

interface Vertex {
  id: number
  x: string
  y: string
  z: string
}

interface Face {
  v1: string
  v2: string
  v3: string
  type: FaceType
}

enum FaceType {
  INDICE,
  TEXTURE_COORDINATE_INDICE,
  NORMAL_INDICE,
  NORMAL_INDICE_WITHOUT_TEXTURE_COORDINATE_INDICES,
}

export { Batch, Vertex, Face, FaceType }
