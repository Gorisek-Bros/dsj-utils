import { create } from 'xmlbuilder2'
import useImage from '~~/composables/useImage'
import type { CustomMarkings, Line, Spray } from '~~/types/elements/Marking'
import type { ImgSettings } from '~~/types/settings/ImgSettings'
import { chunk, groupBySame } from '~~/utils/array'
import { rgbToHex } from '~~/utils/color'

export default function () {
  /**
   *
   * @param settings
   * @param width
   * @param height
   * @returns Origin coordinates of top left corner of the image based on the settings
   */
  function getOriginCoordinates(settings: ImgSettings, width: number, height: number): [number, number] {
    return [(-width / (2 / settings.pixelSize) + settings.originDistance.z), Math.abs((height / (2 / settings.pixelSize)) - settings.originDistance.x)]
  }

  /**
   *
   * @param context
   * @param settings
   * @param width
   * @param height
   * @returns Pixel data of given image including settings
   */
  function getPixels(context: CanvasRenderingContext2D, settings: ImgSettings, width: number, height: number): string[][] {
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

  /**
   *
   * @param pixels
   * @returns Pixel data grouped by same color
   */
  function mergePixels(pixels: string[][]): string[][][] {
    return pixels.map(x => groupBySame(x))
  }

  /**
   *
   * @param settings
   * @param pixels
   * @returns Pixel data converted to one color
   */
  function monocolorPixels(settings: ImgSettings, pixels: string[][]): string[][][] {
    return pixels.map(x => x.map(y => y !== null ? (settings.useColor.include ? settings.useColor.value.replace('#', '0x') : '0x000000') : null)).map(x => groupBySame(x))
  }

  /**
   *
   * @param context
   * @param settings
   * @param width
   * @param height
   * @returns Generated XML from given image
   */
  function generateXml(context: CanvasRenderingContext2D, settings: ImgSettings, width: number, height: number) {
    const { getPixels, mergePixels, monocolorPixels } = useImage()
    const { getOriginCoordinates } = useImage()

    const initialPixels = getPixels(context, settings, width, height)
    const pixels = mergePixels(initialPixels)
    let _pixels = pixels

    let [z0, y0] = getOriginCoordinates(settings, width, height)
    const output = { 'custom-markings': {} } as CustomMarkings

    if (settings.tags.twigs) {
      output['custom-markings'].winter = {}
      output['custom-markings'].winter.twigs = []
      _pixels = monocolorPixels(settings, initialPixels)
      for (let i = 0; i < _pixels.length; i++) {
        for (let j = 0; j < _pixels[i].length; j++) {
          if (_pixels[i][j].every(x => x === null)) {
            z0 += settings.pixelSize * _pixels[i][j].length
            continue
          }

          output['custom-markings'].winter.twigs.push({
            '@d': Math.round(y0 * 100) / 100,
            '@size': settings.pixelSize,
            '@space': settings.pixelSize,
            '@z1': Math.round(z0 * 100) / 100,
            '@z2': Math.round((z0 + settings.pixelSize * _pixels[i][j].length) * 100) / 100,
          })

          z0 += settings.pixelSize * _pixels[i][j].length
        }

        z0 = (-width / (2 / settings.pixelSize)) + settings.originDistance.z
        y0 += settings.pixelSize
      }
    }

    if (settings.useColor.include)
      _pixels = monocolorPixels(settings, initialPixels)

    if (settings.tags.banner || settings.tags.line || settings.tags.spray) {
      if (settings.tags.banner || settings.tags.line)
        output['custom-markings'].summer = {}
      if (settings.tags.spray && !settings.tags.twigs)
        output['custom-markings'].winter = {}

      if (settings.tags.banner)
        output['custom-markings'].summer.banner = []
      if (settings.tags.line)
        output['custom-markings'].summer.line = []
      if (settings.tags.spray)
        output['custom-markings'].winter.spray = []

      for (let i = 0; i < _pixels.length; i++) {
        for (let j = 0; j < _pixels[i].length; j++) {
          if (_pixels[i][j].every(x => x === null)) {
            z0 += settings.pixelSize * _pixels[i][j].length
            continue
          }

          if (settings.tags.banner) {
            output['custom-markings'].summer.banner.push({
              '@d1': Math.round(y0 * 100) / 100,
              '@d2': Math.round((y0 + settings.pixelSize) * 100) / 100,
              '@z1': Math.round(z0 * 100) / 100,
              '@z2': Math.round((z0 + (settings.pixelSize * _pixels[i][j].length)) * 100) / 100,
              '@c': _pixels[i][j][0],
              '@side': 'custom',
              '@w': settings.pixelSize,
            })
          }

          if (settings.tags.line || settings.tags.spray) {
            const item: Line | Spray = {
              '@d': Math.round(y0 * 100) / 100,
              '@z1': Math.round(z0 * 100) / 100,
              '@z2': Math.round((z0 + (settings.pixelSize * _pixels[i][j].length)) * 100) / 100,
              '@c': _pixels[i][j][0],
              '@w': settings.pixelSize,
            }

            if (settings.tags.line)
              output['custom-markings'].summer.line.push(item)
            if (settings.tags.spray)
              output['custom-markings'].winter.spray.push(item)
          }

          z0 += settings.pixelSize * _pixels[i][j].length
        }

        z0 = (-width / (2 / settings.pixelSize)) + settings.originDistance.z
        y0 += settings.pixelSize
      }
    }

    let result = create(output).end({ prettyPrint: true, headless: true })
    if (!settings.includeRootTag) {
      result = result.replace('<custom-markings>', '').replace('</custom-markings>', '')
        .replace('<winter>', '').replace('<summer>', '')
        .replace('</winter>', '').replace('</summer>', '')
        .split('\n')
        .map(x => x.trim())
        .filter(x => x !== '')
        .join('\n')
    }

    return result
  }

  return {
    getOriginCoordinates,
    getPixels,
    mergePixels,
    monocolorPixels,
    generateXml,
  }
}
