<script setup lang="ts">
definePageMeta({
  layout: 'main',
})
</script>

<template>
  <div class="flex h-full w-full">
    <section class="w-2/3 p-4 h-full">
      <div class="flex justify-center items-center h-full">
        <jumper />
      </div>
    </section>
    <hr class="h-full border-r">
    <aside class="w-1/3 p-4 h-full">
      <div class="flex flex-col gap-8">
        <div>
          <div class="flex gap-4 items-center mb-4">
            <span class="flex gap-2 items-center">
              <div class="i-heroicons-cog-8-tooth-solid text-2xl p-2" />
              <h1 class="text-2xl font-semibold">Settings</h1>
            </span>
            <hr class="h-1 w-full">
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>
