<script setup lang="ts">
defineProps<{
  modelValue: any
  description: string
  label: string
  type: string
  required?: boolean
  disabled?: boolean
  info?: string
  min?: string
  max?: string
  step?: string
}>()

defineEmits<{
  (event: 'update:modelValue'): void
}>()
</script>

<template>
  <label :for="description" class="inline-block text-gray-700 text-sm font-medium">
    {{ label }}
    <sup v-if="required" class="text-red-700 text-xs">*</sup>
  </label>
  <input
    :disabled="disabled"
    :value="modelValue"
    :for="description"
    :type="type"
    :min="min"
    :max="max"
    :step="step"
    class="block w-full px-2 py-1 text-sm font-normal text-gray-700 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    :class="{ 'bg-white': !disabled, 'bg-gray-100': disabled }"
    placeholder="Enter value here..."
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
  <span class="text-gray-500 text-xs">{{ info }}</span>
</template>
