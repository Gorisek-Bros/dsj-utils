<script setup lang="ts">
definePageMeta({
  layout: 'main',
})

const form = reactive({
  k: 125,
  h2n: 0,
})

const minAlpha = computed(() =>
  Number.parseFloat((form.k / 30 + 6.9).toFixed(2)) <= 10.5
    ? (form.k / 30 + 6.9).toFixed(2)
    : 10.5,
)

const maxAlpha = computed(() =>
  Number.parseFloat((form.k / 30 + 7.9).toFixed(2)) <= 11.5
    ? (form.k / 30 + 7.9).toFixed(2)
    : 11.5,
)

const minHn = computed(() => (form.k / 800 + 0.4).toFixed(2))
const maxHn = computed(() => (form.k / 1000 + 0.48).toFixed(2))

const computedH = computed(() => ((form.k * Math.sin(Math.atan(form.h2n))) / 1.005).toFixed(2))
const computedN = computed(() => ((form.k * Math.cos(Math.atan(form.h2n))) / 1.005).toFixed(2))
</script>

<template>
  <div class="flex flex-col md:flex-row h-full w-full gap-8 md:gap-0">
    <section class="w-full md:w-2/3 px-6 h-full border-none md:border-r">
      <h1 class="text-3xl font-bold mt-5 mb-1">
        H/N calculator
      </h1>
      <p>Use this utility to create realistic looking hill profiles.</p>
      <div class="mt-6">
        <h2 class="text-2xl font-medium">
          Recommended values:
        </h2>
        <div class="flex gap-3">
          <div class="flex-auto">
            <base-input description="min-alpha" disabled label="Minimum optimal inrun alpha" :model-value="minAlpha" type="number" />
          </div>
          <div class="flex-auto">
            <base-input
              description="max-alpha" disabled label="Maximum optimal inrun alpha" :model-value="maxAlpha" type="number"
            />
          </div>
        </div>
        <div class="flex gap-3">
          <div class="flex-auto">
            <base-input description="min-hn" disabled label="Minimum optimal H/N" :model-value="minHn" type="number" />
          </div>
          <div class="flex-auto">
            <base-input description="max-hn" disabled label="Maximum optimal H/N" :model-value="maxHn" type="number" />
          </div>
        </div>
      </div>
      <div class="mt-6">
        <h2 class="text-2xl font-medium">
          Computed H & N values:
        </h2>
        <div class="flex gap-3">
          <div class="flex-auto">
            <base-input description="h-val" disabled label="Computed H value" :model-value="computedH" type="number" />
          </div>
          <div class="flex-auto">
            <base-input description="n-val" disabled label="Computed N value" :model-value="computedN" type="number" />
          </div>
        </div>
      </div>
    </section>
    <aside class="w-full md:w-1/3 p-4 h-full">
      <div class="flex gap-4 items-center mb-4">
        <span class="flex gap-2 items-center">
          <div class="i-heroicons-cog-8-tooth-solid text-2xl p-2" />
          <h1 class="text-2xl font-semibold">Settings</h1>
        </span>
        <hr class="h-1 w-full">
      </div>
      <div class="mb-3">
        <base-input v-model="form.k" description="k-point" label="Construction point" required type="number" />
      </div>
      <div class="mb-3">
        <base-input v-model="form.h2n" description="max-hn" info="It is suggested to use value between 0.51 and 0.61" label="H/N value" max="0.61" min="0.51" required step="0.01" type="number" />
      </div>
    </aside>
  </div>
</template>
