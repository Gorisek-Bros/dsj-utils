<script setup lang="ts">
const form = reactive({
  pixelSize: 1,
  scalingFactor: 1,
  ignoreColor: '',
  useColor: '',
  originDistance: {
    x: 50,
    z: 0,
  },
})
</script>

<template>
  <div class="flex gap-4 items-center mb-4">
    <span class="flex gap-2 items-center">
      <div class="i-heroicons-cog-8-tooth-solid text-2xl p-2" />
      <h1 class="text-2xl font-semibold">Settings</h1>
    </span>
    <hr class="h-1 w-full">
  </div>
  <form class="flex flex-col gap-1">
    <base-input v-model="form.pixelSize" label="Pixel size" description="pixel-size" type="number" required />
    <base-input v-model="form.scalingFactor" label="Scaling factor" description="scaling-factor" type="number" required />
    <div class="flex gap-1">
      <div class="w-1/2">
        <base-input v-model="form.originDistance.x" label="Origin distance relative to X axis" description="origin-x" type="number" required />
      </div>
      <div class="w-1/2">
        <base-input v-model="form.originDistance.z" label="Origin distance relative to Z axis" description="origin-z" type="number" required />
      </div>
    </div>
    <div class="flex gap-1">
      <div class="w-1/2">
        <base-input v-model="form.ignoreColor" label="Ignore color" description="ignore-color" type="color" />
      </div>
      <div class="w-1/2">
        <base-input v-model="form.useColor" label="Use single color" description="use-color" type="color" />
      </div>
    </div>
    <button type="submit" class="text-blue-600 border-blue-600 rounded px-4 py-2 border">
      Generate XML
    </button>
  </form>
</template>
