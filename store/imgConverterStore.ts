import { defineStore } from 'pinia'

const useImgConverterStore = defineStore('imgConverter', {
  state: () => ({
    canvas: null as HTMLCanvasElement,
    img: null as HTMLImageElement,
    settings: {
      ignoreColor: '#000000',
      originDistance: {
        x: 50,
        z: 0,
      },
      pixelSize: 1,
      scalingFactor: 1,
      useColor: '#ffffff',
    },
  }),
})

export { useImgConverterStore }
