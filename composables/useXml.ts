import { create } from 'xmlbuilder2'
import type { CustomMarkings, Line, Spray } from '~~/types/Marking'
import type { Settings } from '~~/types/Settings'

export default function () {
  function generateXml(context: CanvasRenderingContext2D, settings: Settings, width: number, height: number) {
    const { getPixels, mergePixels, monocolorPixels } = useImage()
    const { getOriginCoordinates } = useImage()

    const initialPixels = getPixels(context, width, height)
    const pixels = mergePixels(initialPixels)

    let [x0, y0] = getOriginCoordinates(settings, width, height)
    const output: CustomMarkings = {
      'custom-markings': {
        summer: {
          banner: [],
          line: [],
        },
        winter: {
          twigs: [],
          spray: [],
        },
      },
    }

    if (settings.tags.twigs) {
      const monocoloredPixels: string[][][] = monocolorPixels(settings, initialPixels)
      for (let i = 0; i < monocoloredPixels.length; i++) {
        for (let j = 0; j < monocoloredPixels[i].length; j++) {
          if (monocoloredPixels[i][j].every(x => x === null)) {
            x0 += settings.pixelSize * monocoloredPixels[i][j].length
            continue
          }

          output['custom-markings'].winter.twigs.push({
            '@d': Math.round(y0 * 100) / 100,
            '@size': settings.pixelSize,
            '@space': settings.pixelSize,
            '@z1': Math.round(x0 * 100) / 100,
            '@z2': Math.round((x0 + settings.pixelSize * monocoloredPixels[i][j].length) * 100) / 100,
          })

          x0 += settings.pixelSize * monocoloredPixels[i][j].length
        }

        x0 = (-width / (2 / settings.pixelSize)) + settings.originDistance.z
        y0 += settings.pixelSize
      }
    }

    for (let i = 0; i < pixels.length; i++) {
      for (let j = 0; j < pixels[i].length; j++) {
        if (pixels[i][j].every(x => x === null)) {
          x0 += settings.pixelSize * pixels[i][j].length
          continue
        }

        if (settings.tags.banner) {
          output['custom-markings'].summer.banner.push({
            '@d1': Math.round(y0 * 100) / 100,
            '@d2': Math.round((y0 + settings.pixelSize) * 100) / 100,
            '@z1': Math.round(x0 * 100) / 100,
            '@z2': Math.round((x0 + (settings.pixelSize * pixels[i][j].length)) * 100) / 100,
            '@c': pixels[i][j][0],
            '@side': 'custom',
            '@w': settings.pixelSize,
          })
        }

        if (settings.tags.line || settings.tags.spray) {
          const item: Line | Spray = {
            '@d': Math.round(y0 * 100) / 100,
            '@z1': Math.round(x0 * 100) / 100,
            '@z2': Math.round((x0 + (settings.pixelSize * pixels[i][j].length)) * 100) / 100,
            '@c': pixels[i][j][0],
            '@w': settings.pixelSize,
          }

          if (settings.tags.line)
            output['custom-markings'].summer.line.push(item)
          if (settings.tags.spray)
            output['custom-markings'].winter.spray.push(item)
        }

        x0 += settings.pixelSize * pixels[i][j].length
      }

      x0 = (-width / (2 / settings.pixelSize)) + settings.originDistance.z
      y0 += settings.pixelSize
    }

    return create(output).end({ prettyPrint: true })
  }

  return {
    generateXml,
  }
}
