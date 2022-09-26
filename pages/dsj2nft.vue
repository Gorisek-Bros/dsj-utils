<script setup lang="ts">
import { Canvg } from 'canvg'
import type { Ref } from 'vue'

definePageMeta({
  layout: 'main',
})

const canvas = ref<HTMLCanvasElement>(null)
const jumper = inject('jumper')

const settings = reactive({
  background: '#E0F2FE',
  helmet: '#7289BA',
  suit: '#FAFAFA',
  sleeves: '#1E40AF',
  gloves: '#111827',
  trousers: '#1E3A8A',
  skis: '#BEF264',
})
const isBeingGenerated = ref(false)
const img = ref('')

function onClick() {
  const context = canvas.value.getContext('2d')!
  const v = Canvg.fromString(context, (jumper as Ref<HTMLElement>).value.outerHTML)
  v.start()

  img.value = canvas.value.toDataURL('img/png', 1.0)
  isBeingGenerated.value = false
}
</script>

<template>
  <div class="flex h-full w-full">
    <section class="w-2/3 p-4 h-full">
      <div class="flex justify-center items-center h-full">
        <jumper v-bind="settings" />
      </div>
    </section>
    <hr class="h-full border-r">
    <aside class="w-1/3 p-4 h-full">
      <div class="flex flex-col gap-8">
        <div>
          <div class="flex gap-4 items-center mb-4">
            <span class="flex gap-2 items-center">
              <div class="i-heroicons-cog-8-tooth-solid text-2xl p-2" />
              <h1 class="text-2xl font-semibold">Settings</h1>
            </span>
            <hr class="h-1 w-full">
          </div>
          <div class="flex flex-col gap-1">
            <base-input v-model="settings.background" description="background" label="Background" required type="color" />
            <div class="flex gap-1">
              <div class="w-1/3">
                <base-input v-model="settings.helmet" description="helmet" label="Helmet" required type="color" />
              </div>
              <div class="w-1/3">
                <base-input v-model="settings.suit" description="suit" label="Suit" required type="color" />
              </div>
              <div class="w-1/3">
                <base-input v-model="settings.sleeves" description="sleeves" label="Sleeves" required type="color" />
              </div>
            </div>
            <div class="flex gap-1">
              <div class="w-1/3">
                <base-input v-model="settings.gloves" description="gloves" label="Gloves" required type="color" />
              </div>
              <div class="w-1/3">
                <base-input v-model="settings.trousers" description="trousers" label="Trousers" required type="color" />
              </div>
              <div class="w-1/3">
                <base-input v-model="settings.skis" description="skis" label="Skis" required type="color" />
              </div>
            </div>
            <base-button as="a" download :href="img" @click.prevent="onClick">
              Download
            </base-button>
          </div>
        </div>
      </div>
    </aside>
    <canvas ref="canvas" height="1088" width="1088" />
  </div>
</template>
