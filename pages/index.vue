<script setup lang="ts">
definePageMeta({
  layout: 'main',
})
</script>

<template>
  <div class="w-full h-full flex">
    <section class="w-2/3 h-full">
      <file-picker />
    </section>
    <aside class="w-1/3 p-4 h-full">
      <sidebar />
    </aside>
  </div>
</template>
