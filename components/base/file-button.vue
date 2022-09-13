<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()

const openDialog = inject('openDialog')
</script>

<template>
  <button class="bg-blue-600 hover:bg-blue-700 rounded disabled:bg-blue-400 hover:disabled:bg-blue-400 text-white px-4 py-2" :disabled="disabled" @click="openDialog">
    <slot />
  </button>
</template>
