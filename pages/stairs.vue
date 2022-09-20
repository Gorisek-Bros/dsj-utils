<script setup lang="ts">
import type { StairsSettings } from '~~/types/settings/StairsSettings'

definePageMeta({
  layout: 'main',
})

const { copy, copied } = useClipboard()
const { generateXml } = useStairs()

const source = ref('')

const settings = reactive<StairsSettings>({
  refx: '',
  refy: '',
  start: 0,
  end: 0,
  step: 0,
  height: 0,
  offset: 0,
})

function onSubmit() {
  source.value = generateXml(settings)
  copy(source.value)
}
</script>

<template>
  <div class="flex h-full w-full">
    <section class="w-2/3 px-6 h-full">
      <h1 class="text-3xl font-bold mt-5 mb-1">
        Stairs profile generator
      </h1>
      <p>Use this utility to create realistic looking stairs.</p>
      <form class="flex flex-col gap-1 mt-6" @submit.prevent="onSubmit">
        <div class="flex gap-1">
          <div class="w-1/2">
            <base-input v-model="settings.refx" description="refx" label="Refx for stairs profile" required />
          </div>
          <div class="w-1/2">
            <base-input v-model="settings.refy" description="refy" label="Refy for stairs profile" required />
          </div>
        </div>
        <div class="flex gap-1">
          <div class="w-1/2">
            <base-input v-model.number="settings.start" description="start" label="Starting X coordinate value for stairs" required />
          </div>
          <div class="w-1/2">
            <base-input v-model.number="settings.end" description="end" label="Starting Y coordinate value for stairs" required />
          </div>
        </div>
        <div class="flex gap-1">
          <div class="w-1/3">
            <base-input v-model.number="settings.step" description="step" label="Length of one step" required step="0.1" type="number" />
          </div>
          <div class="w-1/3">
            <base-input v-model.number="settings.height" description="height" label="Height above Y profile" min="0.01" required step="0.01" type="number" />
          </div>
          <div class="w-1/3">
            <base-input v-model.number="settings.offset" description="offset" label="Length of drop between stairs in profile" max="0.05" min="0.001" required step="0.001" type="number" />
          </div>
        </div>
        <base-button type="submit">
          {{ !copied ? 'Generate XML' : 'Copied!' }}
        </base-button>
      </form>
    </section>
  </div>
</template>
