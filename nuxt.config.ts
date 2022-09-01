import { defineNuxtConfig } from 'nuxt'

/* @unocss-include */
export default defineNuxtConfig({
  css: ['@unocss/reset/tailwind.css'],
  modules: ['@unocss/nuxt', '@pinia/nuxt', '@vueuse/nuxt'],
  unocss: {
    uno: true,
    icons: true,
  },
})
