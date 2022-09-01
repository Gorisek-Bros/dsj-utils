export default function () {
  function rgbToHex(r: number, g: number, b: number): string {
    return `#${[r, g, b].map((x) => {
      const hex = x.toString(16)
      return hex.length === 1 ? `0${hex}` : hex
    }).join('')}`
  }

  function getOriginCoordinates(width: number, height: number): [number, number] {
    return [(-width / (2 / 1) + 0), Math.abs((height / (2 / 1)) - 50)]
  }

  function getPixels(context: CanvasRenderingContext2D, width: number, height: number): string[][] {
    const imageData = context.getImageData(0, 0, width, height)
    const pixels: string[] = []

    function* chunk(array: any[], n: number) {
      for (let i = 0; i < array.length; i += n)
        yield array.slice(i, i + n)
    }

    for (let i = 0; i < imageData.data.length; i += 4) {
      const red = imageData.data[i]
      const green = imageData.data[i + 1]
      const blue = imageData.data[i + 2]
      // const alpha = data[i + 3]
      pixels.push(rgbToHex(red, green, blue))
    }

    return [...chunk(pixels, imageData.width)]
  }

  async function toBlob(file: File) {
    const buffer = await file.arrayBuffer()
    const blob = new Blob([buffer])
    const srcBlob = URL.createObjectURL(blob)

    return srcBlob
  }

  return {
    getOriginCoordinates,
    getPixels,
    toBlob,
  }
}
