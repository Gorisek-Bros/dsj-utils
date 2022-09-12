<script setup lang="ts">
const openDialog = inject('openDialog')
</script>

<template>
  <button v-bind="$attrs" @click="openDialog">
    <slot />
  </button>
</template>
