<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

defineProps<{
  disabled?: boolean
  type?: ButtonHTMLAttributes['type']
  loading?: boolean
}>()
</script>

<template>
  <button class="flex justify-center text-blue-600 border-blue-600 rounded px-4 py-2 border disabled:text-blue-400 disabled:border-blue-400" :disabled="disabled || loading" :type="type">
    <slot v-if="!loading" />
    <div v-else class="i-heroicons-arrow-path-solid rotate animate-spin animate-count-infinite text-center" />
  </button>
</template>
