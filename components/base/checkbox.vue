<script setup lang="ts">
defineProps<{
  modelValue: boolean
  label: string
}>()

defineEmits<{
  (event: 'update:modelValue'): void
}>()
</script>

<template>
  <label class="inline-block text-gray-700 text-sm font-medium">
    {{ label }}
  </label>
  <input class="accent-blue-600" type="checkbox" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)">
</template>
