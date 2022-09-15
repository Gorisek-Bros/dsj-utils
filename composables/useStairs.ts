import { create } from 'xmlbuilder2'
import type { Profile } from '~~/types/elements/Stairs'
import type { StairsSettings } from '~~/types/settings/StairsSettings'

export default function () {
  /**
  *
  * @param settings
  * @returns Generated XML from given settings
  */
  function generateXml(settings: StairsSettings) {
    const output: Profile = {
      profile: {
        '@id': `${settings.refx}-stairs`,
        '@refx': settings.refx,
        'start': {
          '@x': settings.start,
          '@y': settings.height,
          '@refy': settings.refy,
        },
        'line': [],
      },
    }

    for (let i = settings.start; i < settings.end; i += settings.step) {
      output.profile.line.push({
        '@x': i + settings.step - settings.offset,
        '@y': settings.height,
        '@refyx': i,
        '@refy': settings.refy,
      })
      output.profile.line.push({
        '@x': i + settings.step,
        '@y': settings.height,
        '@refy': settings.refy,
      })
    }

    return create(output).end({ prettyPrint: true, headless: true })
  }

  return {
    generateXml,
  }
}
