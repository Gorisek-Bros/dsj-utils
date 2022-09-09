import { create } from 'xmlbuilder2'
import type { CustomMarkings } from '~~/types/Marking'
import type { Settings } from '~~/types/Settings'

export default function () {
  function generateXml(context: CanvasRenderingContext2D, settings: Settings, width: number, height: number) {
    const { getPixels } = useImage()
    const { getOriginCoordinates } = useImage()

    const pixels = getPixels(context, width, height)
    let [x0, y0] = getOriginCoordinates(settings, width, height)
    const output: CustomMarkings = {
      'custom-markings': {
        summer: {
          banner: [],
        },
      },
    }

    for (let i = 0; i < pixels.length; i++) {
      for (let j = 0; j < pixels[i].length; j++) {
        if (pixels[i][j].every(x => x === null)) {
          x0 += settings.pixelSize * pixels[i][j].length
          continue
        }

        output['custom-markings'].summer.banner.push({
          '@d1': Math.round(y0 * 100) / 100,
          '@d2': Math.round((y0 + settings.pixelSize) * 100) / 100,
          '@z1': Math.round(x0 * 100) / 100,
          '@z2': Math.round((x0 + (settings.pixelSize * pixels[i][j].length)) * 100) / 100,
          '@c': pixels[i][j][0],
          '@side': 'custom',
          '@w': settings.pixelSize,
        })

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
