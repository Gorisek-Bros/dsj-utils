<script setup lang="ts">
import { DialogButton, Dropzone, FileSelector } from 'vue3-file-selector'

const { toBlob } = useImage()
const { generateXml } = useXml()

const canvas = ref<HTMLCanvasElement | null>(null)
const img = ref<HTMLImageElement | null>(null)
const settings = reactive({
  ignoreColor: '#000000',
  originDistance: {
    x: 50,
    z: 0,
  },
  pixelSize: 1,
  scalingFactor: 1,
  useColor: '#ffffff',
})
const files = ref([])
const previews = ref([])

function drawImage() {
  const context = canvas.value.getContext('2d')
  context.drawImage(img.value, 0, 0, img.value.width, img.value.height)
}

watch(files, async () => {
  previews.value = await Promise.all(
    files.value.map(file => toBlob(file)),
  )
})

const source = ref<string>(null)
watch((img), () => {
  if (img.value)
    source.value = generateXml(canvas.value.getContext('2d'), settings, img.value.width, img.value.height)
    console.log(source.value)
})

const { copy } = useClipboard({ source })
</script>

<template>
  <div>
    <navbar />
    <main class="flex items-center justify-center h-[calc(100vh-61px)]">
      <section class="w-2/3 h-full">
        <FileSelector v-model="files" :allow-multiple="false">
          <Dropzone class="h-full">
            <div class="block border-r flex flex-col space-y-4 justify-center items-center h-full">
              <canvas ref="canvas" class="hidden" />
              <img ref="img" :src="previews[0]" @load="drawImage">
              <ul v-if="files.length > 0">
                <li v-for="file in files" :key="file.name">
                  {{ file.name }}
                </li>
              </ul>
              <span v-else>Awaiting...</span>
              <DialogButton class="bg-blue-600 hover:bg-blue-700 rounded text-white px-4 py-2">
                Upload file
              </DialogButton>
            </div>
          </Dropzone>
        </FileSelector>
      </section>
      <aside class="w-1/3 p-4 h-full">
        <div class="flex gap-4 items-center mb-4">
          <span class="flex gap-2 items-center">
            <div class="i-heroicons-cog-8-tooth-solid text-2xl p-2" />
            <h1 class="text-2xl font-semibold">Settings</h1>
          </span>
          <hr class="h-1 w-full">
        </div>
        <form class="flex flex-col gap-1" @submit.prevent="copy()">
          <base-input v-model="settings.pixelSize" label="Pixel size" description="pixel-size" type="number" required />
          <base-input v-model="settings.scalingFactor" label="Scaling factor" description="scaling-factor" type="number" required />
          <div class="flex gap-1">
            <div class="w-1/2">
              <base-input v-model="settings.originDistance.x" label="Origin distance relative to X axis" description="origin-x" type="number" required />
            </div>
            <div class="w-1/2">
              <base-input v-model="settings.originDistance.z" label="Origin distance relative to Z axis" description="origin-z" type="number" required />
            </div>
          </div>
          <div class="flex gap-1">
            <div class="w-1/2">
              <base-input v-model="settings.ignoreColor" label="Ignore color" description="ignore-color" type="color" />
            </div>
            <div class="w-1/2">
              <base-input v-model="settings.useColor" label="Use single color" description="use-color" type="color" />
            </div>
          </div>
          <button type="submit" class="text-blue-600 border-blue-600 rounded px-4 py-2 border">
            Generate XML
          </button>
        </form>
      </aside>
    </main>
  </div>
</template>
