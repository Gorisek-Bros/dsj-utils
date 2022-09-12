<script setup lang="ts">
defineProps<{
  modelValue: File
  accept?: string
}>()

defineEmits<{
  (event: 'update:modelValue'): void
}>()

const inputRef = ref<HTMLInputElement>(null)
function openDialog() {
  inputRef.value.click()
}

provide('openDialog', openDialog)
</script>

<template>
  <input ref="inputRef" :accept="accept" style="display: none;" type="file" @change="$emit('update:modelValue', ($event.target as HTMLInputElement).files[0])">
  <slot :open-dialog="openDialog" />
</template>
