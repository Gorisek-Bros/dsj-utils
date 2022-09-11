<script setup lang="ts">
import { DialogButton, FileSelector } from 'vue3-file-selector'

definePageMeta({
  layout: 'main',
})

const container = ref<HTMLDivElement>(null)
const files = ref<File[]>([])
</script>

<template>
  <section class="w-2/3 p-4 h-full">
    <FileSelector v-model="files" :allow-multiple="false">
      <div class="block flex flex-col justify-center items-center h-full">
        <div id="container" class="mb-4" />
        <ul v-if="files.length > 0" class="mb-2">
          <li v-for="file in files" :key="file.name">
            {{ file.name }}
          </li>
        </ul>
        <span v-else class="mb-2">Awaiting...</span>
        <div class="flex gap-1">
          <DialogButton class="bg-blue-600 hover:bg-blue-700 rounded text-white px-4 py-2">
            Upload file
          </DialogButton>
          <base-button secondary>
            Generate XML
          </base-button>
        </div>
      </div>
    </FileSelector>
  </section>
</template>
