import { create } from 'xmlbuilder2'
import type { CustomMarkings, Line, Spray } from '~~/types/Marking'
import type { Settings } from '~~/types/Settings'

export default function () {
  function generateXml(context: CanvasRenderingContext2D, settings: Settings, width: number, height: number) {
    const { getPixels, mergePixels, monocolorPixels } = useImage()
    const { getOriginCoordinates } = useImage()

    const initialPixels = getPixels(context, settings, width, height)
    const pixels = mergePixels(initialPixels)
    let _pixels = pixels

    let [z0, y0] = getOriginCoordinates(settings, width, height)
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

    return create(output).end({ prettyPrint: true, headless: true })
  }

  return {
    generateXml,
  }
}
