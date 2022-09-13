<script setup lang="ts">
definePageMeta({
  layout: 'main',
})

const { getContent } = useFile()
const { parseObj, parseMtl, generateXml } = useObj()

const files = ref<File[]>([])
const source = ref<string>(null)

const { copy, copied } = useClipboard({ source })

function getAllowedFormats() {
  const isObjUploaded = files.value.some(file => file.name.endsWith('.obj'))
  const isMtlUploaded = files.value.some(file => file.name.endsWith('.mtl'))

  if (isObjUploaded && isMtlUploaded)
    return null

  else if (isObjUploaded)
    return '.mtl'

  else if (isMtlUploaded)
    return '.obj'

  return '.mtl, .obj'
}

const canBeSent = computed(() => {
  const allowedFormats = getAllowedFormats()
  if (allowedFormats === '.mtl, .obj')
    return false
  else if (allowedFormats === '.mtl')
    return true
})

async function onSubmit() {
  const objContent = (await getContent(files.value.find(x => x.name.endsWith('.obj'))))
  const mtlContent = (await getContent(files.value.find(x => x.name.endsWith('.mtl'))))

  source.value = generateXml(parseObj(objContent, mtlContent !== null ? parseMtl(mtlContent) : null))
  copy(source.value)
}
</script>

<template>
  <div class="flex h-full w-full">
    <section class="p-4 h-full w-full">
      <base-file v-model="files" :accept="getAllowedFormats()" :multiple="true">
        <div class="block flex flex-col justify-center items-center h-full">
          <div id="container" class="mb-4" />
          <ul v-if="files.length > 0" class="mb-2">
            <li v-for="file in files" :key="file.name">
              {{ file.name }}
            </li>
          </ul>
          <span v-else class="mb-2">Awaiting...</span>
          <div class="flex gap-1">
            <base-file-button>
              Upload file
            </base-file-button>
            <base-button v-if="!copied" :disabled="!canBeSent" secondary @click="onSubmit">
              Generate XML
            </base-button>
            <base-button v-else secondary>
              Copied!
            </base-button>
          </div>
        </div>
      </base-file>
    </section>
  </div>
</template>
