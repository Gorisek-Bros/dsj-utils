<script setup lang="ts">
import { DialogButton, FileSelector } from 'vue3-file-selector'
import type { Settings } from '~~/types/Settings'

definePageMeta({
  layout: 'main',
})

const { getOriginCoordinates, toBlob } = useImage()
const { generateXml } = useXml()

const canvas = ref<HTMLCanvasElement | null>(null)
const img = ref<HTMLImageElement | null>(null)
const settings = reactive<Settings>({
  ignoreColor: {
    include: false,
    value: '#000000',
  },
  originDistance: {
    x: 50,
    z: 0,
  },
  pixelSize: 1,
  scalingFactor: 1,
  useColor: {
    include: false,
    value: '#FFFFFF',
  },
  tags: {
    banner: false,
    line: false,
    spray: false,
    twigs: false,
  },
})
const files = ref([])
const previews = ref([])
const isProcessed = ref(false)
const canBeSent = computed(() => previews.value.length !== 0 && Object.values(settings.tags).some(x => !!x))

const originCoordinates = reactive({
  z0: 0,
  y0: 0,
})

function calculateOriginCoordinates() {
  if (canvas.value) {
    const [z0, y0] = getOriginCoordinates(settings, canvas.value.width, canvas.value.height)
    originCoordinates.z0 = z0
    originCoordinates.y0 = y0
  }
}

watch(() => ({ ...settings }), () => calculateOriginCoordinates())

watch(() => settings.scalingFactor, async () => {
  const image = await createImageBitmap(img.value, { resizeHeight: img.value.naturalHeight / (settings.scalingFactor || 1), resizeWidth: img.value.naturalWidth / (settings.scalingFactor || 1) })
  const context = canvas.value.getContext('2d')

  canvas.value.width = image.width
  canvas.value.height = image.height

  context.clearRect(0, 0, canvas.value.width, canvas.value.height)
  context.drawImage(image, 0, 0, image.width, image.height)
})

const source = ref<string>(null)
function drawImage() {
  canvas.value.width = img.value.naturalWidth
  canvas.value.height = img.value.naturalHeight
  const context = canvas.value.getContext('2d')
  context.drawImage(img.value, 0, 0, img.value.naturalWidth, img.value.naturalHeight)
  calculateOriginCoordinates()
}

watch(files, async () => {
  previews.value = await Promise.all(
    files.value.map(file => toBlob(file)),
  )
})

function onSubmit() {
  isProcessed.value = true
  source.value = generateXml(canvas.value.getContext('2d'), settings, canvas.value.width, canvas.value.height)
  const { copy } = useClipboard({ source })
  copy()
  isProcessed.value = false
}
</script>

<template>
  <section class="w-2/3 p-4 h-full">
    <FileSelector v-model="files" :allow-multiple="false">
      <div class="block flex flex-col justify-center items-center h-full">
        <canvas ref="canvas" class="mb-4" />
        <img ref="img" class="hidden" :src="previews[0]" @load="drawImage">
        <ul v-if="files.length > 0" class="mb-2">
          <li v-for="file in files" :key="file.name">
            {{ file.name }}
          </li>
        </ul>
        <span v-else class="mb-2">Awaiting...</span>
        <DialogButton class="bg-blue-600 hover:bg-blue-700 rounded text-white px-4 py-2">
          Upload file
        </DialogButton>
      </div>
    </FileSelector>
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
        <form class="flex flex-col gap-1" @submit.prevent="onSubmit">
          <base-input v-model.number="settings.pixelSize" description="pixel-size" label="Pixel size" required step="0.01" type="number" />
          <base-input v-model.number="settings.scalingFactor" description="scaling-factor" label="Scaling factor" min="0" required type="number" />
          <div class="flex gap-1">
            <div class="w-1/2">
              <base-input v-model.number="settings.originDistance.x" description="origin-x" label="Origin distance relative to X axis" required type="number" />
            </div>
            <div class="w-1/2">
              <base-input v-model.number="settings.originDistance.z" description="origin-z" label="Origin distance relative to Z axis" required type="number" />
            </div>
          </div>
          <div class="flex gap-1">
            <div class="w-1/2">
              <base-input v-model="settings.ignoreColor.value" description="ignore-color" label="Ignore color" type="color" />
            </div>
            <div class="w-1/2">
              <base-input v-model="settings.useColor.value" description="use-color" label="Use single color" type="color" />
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex items-center flex-row-reverse gap-1">
              <base-checkbox v-model.boolean="settings.tags.banner" label="Banner" />
            </div>
            <div class="flex items-center flex-row-reverse gap-1">
              <base-checkbox v-model.boolean="settings.tags.line" label="Line" />
            </div>
            <div class="flex items-center flex-row-reverse gap-1">
              <base-checkbox v-model.boolean="settings.tags.spray" label="Spray" />
            </div>
            <div class="flex items-center flex-row-reverse gap-1">
              <base-checkbox v-model.boolean="settings.tags.twigs" label="Twigs" />
            </div>
          </div>
          <div class="flex gap-4 mb-2">
            <div class="flex items-center flex-row-reverse gap-1">
              <base-checkbox v-model.boolean="settings.ignoreColor.include" label="Ignore given color" />
            </div>
            <div class="flex items-center flex-row-reverse gap-1">
              <base-checkbox v-model.boolean="settings.useColor.include" label="Use given color" />
            </div>
          </div>
          <base-button :disabled="!canBeSent " :loading="isProcessed === true" type="submit">
            Generate XML
          </base-button>
        </form>
      </div>
      <div>
        <div class="flex gap-4 items-center mb-4">
          <span class="flex gap-2 items-center">
            <div class="i-heroicons-information-circle-solid text-2xl p-2" />
            <h1 class="text-2xl font-semibold">Informations</h1>
          </span>
          <hr class="h-1 w-full">
        </div>
        <table class="w-full">
          <tbody>
            <tr>
              <th class="text-left">
                Starting Z distance:
              </th>
              <td>{{ originCoordinates.z0 }}</td>
            </tr>
            <tr>
              <th class="text-left">
                Starting Y distance:
              </th>
              <td>{{ originCoordinates.y0 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </aside>
</template>
