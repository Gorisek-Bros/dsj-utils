<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  secondary?: boolean
}>()

const button = ref<HTMLButtonElement>(null)
const initialHeight = ref(0)

onMounted(() => initialHeight.value = button.value.clientHeight)
watch(() => props.loading, () => {
  if (props.loading)
    button.value.style.height = `${initialHeight.value}px`
  else
    button.value.style.height = 'auto'
})
</script>

<template>
  <button
    ref="button"
    class="flex justify-center items-center rounded px-4 py-2 text-white"
    :class="{
      'bg-blue-600 hover:bg-blue-700 rounded disabled:bg-blue-400 hover:disabled:bg-blue-400 text-white px-4 py-2': !secondary,
      'border-blue-600 hover:border-blue-700 disabled:border-blue-400': secondary,
    }"
    :disabled="disabled || loading"
    :type="type"
  >
    <slot v-if="!loading" />
    <div v-else class="i-heroicons-arrow-path-solid rotate animate-spin animate-count-infinite text-center" />
  </button>
</template>

