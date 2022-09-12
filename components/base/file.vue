<script setup lang="ts">
const props = defineProps<{
  modelValue: File | File[]
  accept?: string
  multiple?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', files: File | File[]): void
}>()

function updateModelValue(e: Event) {
  const target = e.target as HTMLInputElement

  if (Array.isArray(props.modelValue))
    emit('update:modelValue', [...target.files, ...props.modelValue])
  else
    emit('update:modelValue', target.files[0])
}

const input = ref<HTMLInputElement>(null)
function openDialog() {
  input.value.click()
}

provide('openDialog', openDialog)
</script>

<template>
  <input ref="input" :accept="accept" :multiple="multiple" style="display: none;" type="file" @change="updateModelValue">
  <slot :open-dialog="openDialog" />
</template>
