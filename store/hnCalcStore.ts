import { defineStore } from 'pinia'

const useHnCalcStore = defineStore('hnCalc', {
  state: () => ({
    k: 125,
    h2n: 0,
  }),
})

export { useHnCalcStore }
