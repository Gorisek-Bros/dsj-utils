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
  <section class="w-2/3 px-6 h-full border-r">
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
          <base-input disabled :model-value="minAlpha" label="Minimum optimal inrun alpha" description="min-alpha" type="number" />
        </div>
        <div class="flex-auto">
          <base-input
            disabled :model-value="maxAlpha" label="Maximum optimal inrun alpha" description="max-alpha" type="number"
          />
        </div>
      </div>
      <div class="flex gap-3">
        <div class="flex-auto">
          <base-input disabled :model-value="minHn" label="Minimum optimal H/N" description="min-hn" type="number" />
        </div>
        <div class="flex-auto">
          <base-input disabled :model-value="maxHn" label="Maximum optimal H/N" description="max-hn" type="number" />
        </div>
      </div>
    </div>
    <div class="mt-6">
      <h2 class="text-2xl font-medium">
        Computed H & N values:
      </h2>
      <div class="flex gap-3">
        <div class="flex-auto">
          <base-input disabled :model-value="computedH" label="Computed H value" description="h-val" type="number" />
        </div>
        <div class="flex-auto">
          <base-input disabled :model-value="computedN" label="Computed N value" description="n-val" type="number" />
        </div>
      </div>
    </div>
  </section>
  <aside class="w-1/3 p-4 h-full">
    <div class="flex gap-4 items-center mb-4">
      <span class="flex gap-2 items-center">
        <div class="i-heroicons-cog-8-tooth-solid text-2xl p-2" />
        <h1 class="text-2xl font-semibold">Settings</h1>
      </span>
      <hr class="h-1 w-full">
    </div>
    <div class="mb-3">
      <base-input v-model="form.k" label="Construction point" description="k-point" type="number" required />
    </div>
    <div class="mb-3">
      <base-input v-model="form.h2n" label="H/N value" description="max-hn" type="number" required info="It is suggested to use value between 0.51 and 0.61" />
    </div>
  </aside>
</template>
