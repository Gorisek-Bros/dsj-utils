<script setup lang="ts">
definePageMeta({
  layout: 'main',
})

const { getContent } = useFile()
const { parseObj, generateXml } = useObj()

const files = ref<File[]>([])
const source = ref(null)

const { copy, copied } = useClipboard({ source })

async function onSubmit() {
  const content = (await getContent(files.value[0])).split('\n')
  const obj = parseObj(content, null)
  source.value = generateXml(obj)
  copy(source.value)
}
</script>

<template>
  <section class="w-2/3 p-4 h-full">
    <base-file v-model="files" :multiple="true">
      <div class="block flex flex-col justify-center items-center h-full">
        <div id="container" class="mb-4" />
        <ul v-if="files.length > 0" class="mb-2">
          <li v-for="file in files" :key="file.name">
            {{ file.name }}
          </li>
        </ul>
        <span v-else class="mb-2">Awaiting...</span>
        <div class="flex gap-1">
          <base-file-button class="bg-blue-600 hover:bg-blue-700 rounded text-white px-4 py-2">
            Upload file
          </base-file-button>
          <base-button v-if="!copied" secondary @click="onSubmit">
            Generate XML
          </base-button>
          <base-button v-else secondary>
            Copied!
          </base-button>
        </div>
      </div>
    </base-file>
  </section>
</template>
