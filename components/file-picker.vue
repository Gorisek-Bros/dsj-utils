<script setup lang="ts">
import { DialogButton, Dropzone, FileSelector } from 'vue3-file-selector'

const { toBlob } = useImage()
const { generateXml } = useXml()
const canvas = ref<HTMLCanvasElement>(null)
const img = ref<HTMLImageElement>(null)

const files = ref([])
const previews = ref([])

function drawImage() {
  const context = canvas.value.getContext('2d')
  context.drawImage(img.value, 0, 0, img.value.width, img.value.height)
  console.log(generateXml(context, img.value.width, img.value.height))
}

watch(files, async () => {
  previews.value = await Promise.all(
    files.value.map(file => toBlob(file)),
  )
})
</script>

<template>
  <FileSelector v-model="files">
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
        <div class="flex gap-1">
          <DialogButton class="bg-blue-500 rounded text-white px-4 py-2">
            Upload file
          </DialogButton>
        </div>
      </div>
    </Dropzone>
  </FileSelector>
</template>
