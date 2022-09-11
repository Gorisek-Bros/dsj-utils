import type { Mtl } from '~~/types/Mtl'
import type { Batch, Vertex } from '~~/types/Obj'
import { FaceType } from '~~/types/Obj'
import { distinct } from '~~/utils/array'
import { rgbToHex } from '~~/utils/color'

export default function () {
  function parseMtl(input: string[]) {
    const materials: Mtl[] = []
    for (let i = 0; i < input.length; i++) {
      const line: string[] = input[i].split(' ')
      if (line[0] === 'newmtl') {
        materials.push({
          name: line[1],
          diffuse: '',
        })
      }

      if (line[0] === 'Kd') {
        const r = Number.parseFloat(line[1]) * 255
        const g = Number.parseFloat(line[2]) * 255
        const b = Number.parseFloat(line[3]) * 255

        materials.at(-1).diffuse = rgbToHex(r, g, b)
      }
    }

    return materials
  }

  function parseObj(input: string[], materials: Mtl[]) {
    const batches: Batch[] = []
    const vertices: Vertex[] = []
    let index = 1

    for (let i = 0; i < input.length; i++) {
      const line: string[] = input[i].split(' ')
      if (line[0].startsWith('v') && line[0].endsWith('v')) {
        vertices.push({
          id: index,
          x: line[1],
          y: line[2],
          z: line[3],
        })

        index++
      }

      if (line[0].startsWith('usemtl')) {
        const diffuseExists = materials.some(x => x.name === line[1])
        batches.push({
          id: `${line[1]}_${Math.random()}`,
          diffuse: diffuseExists ? materials.find(x => x.name === line[1]).diffuse : '0xFFFFFF',
          vertices: [],
          faces: [],
        })
      }

      if (line[0].startsWith('f')) {
        batches.at(-1).faces.push({
          type: getFaceType(line[1]),
          v1: line[1],
          v2: line[2],
          v3: line[3],
        })
      }
    }

    for (let i = 0; i < batches.length; i++) {
      for (let j = 0; j < batches[i].faces.length; j++) {
        const faceType = batches[i].faces[j]
        if (faceType.type !== FaceType.NORMAL_INDICE) {
          batches[i].vertices.push(vertices.find(x => x.id.toString() === faceType.v1))
          batches[i].vertices.push(vertices.find(x => x.id.toString() === faceType.v2))
          batches[i].vertices.push(vertices.find(x => x.id.toString() === faceType.v3))
        }
        else {
          batches[i].vertices.push(vertices.find(x => x.id.toString() === faceType.v1.split('/')[0]))
          batches[i].vertices.push(vertices.find(x => x.id.toString() === faceType.v2.split('/')[0]))
          batches[i].vertices.push(vertices.find(x => x.id.toString() === faceType.v3.split('/')[0]))
        }
      }
    }

    for (let i = 0; i < batches.length; i++)
      batches[i].vertices = distinct(batches[i].vertices)

    return batches
  }

  function getFaceType(input: string) {
    if (!input.includes('/')) {
      return FaceType.INDICE
    }
    else {
      if (input.includes('//')) {
        return FaceType.NORMAL_INDICE_WITHOUT_TEXTURE_COORDINATE_INDICES
      }
      else {
        if (input.includes('/')) {
          if (input.split('/').length === 2)
            return FaceType.TEXTURE_COORDINATE_INDICE

          else
            return FaceType.NORMAL_INDICE
        }
      }
    }
  }

  return {
    parseMtl,
    parseObj,
  }
}
