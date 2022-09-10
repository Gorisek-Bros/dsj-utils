import type { Settings } from '~~/types/Settings'
import { chunk, groupBySame } from '~~/utils/array'

export default function () {
  function rgbToHex(r: number, g: number, b: number): string {
    return `0x${[r, g, b].map((x) => {
      const hex = x.toString(16)
      return hex.length === 1 ? `0${hex}` : hex
    }).join('')}`
  }

  function getOriginCoordinates(settings: Settings, width: number, height: number): [number, number] {
    return [(-width / (2 / settings.pixelSize) + settings.originDistance.z), Math.abs((height / (2 / settings.pixelSize)) - settings.originDistance.x)]
  }

  function getPixels(context: CanvasRenderingContext2D, settings: Settings, width: number, height: number): string[][] {
    const imageData = context.getImageData(0, 0, width, height)
    const pixels: string[] = []

    for (let i = 0; i < imageData.data.length; i += 4) {
      const red = imageData.data[i]
      const green = imageData.data[i + 1]
      const blue = imageData.data[i + 2]
      const alpha = imageData.data[i + 3]

      const color = rgbToHex(red, green, blue)
      pixels.push(alpha !== 0 && color !== settings.ignoreColor.value.replace('#', '0x') ? rgbToHex(red, green, blue) : null)
    }

    return [...chunk(pixels, imageData.width)]
  }

  function mergePixels(pixels: string[][]): string[][][] {
    return pixels.map(x => groupBySame(x))
  }

  function monocolorPixels(settings: Settings, pixels: string[][]): string[][][] {
    return pixels.map(x => x.map(y => y !== null ? (settings.useColor.include ? settings.useColor.value.replace('#', '0x') : '0x000000') : null)).map(x => groupBySame(x))
  }

  async function toBlob(file: File) {
    return URL.createObjectURL(new Blob([await file.arrayBuffer()]))
  }

  return {
    getOriginCoordinates,
    getPixels,
    mergePixels,
    monocolorPixels,
    toBlob,
  }
}
