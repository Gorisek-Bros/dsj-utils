<script setup lang="ts">
import { useHnCalcStore } from '~~/store/hnCalcStore'

const hnCalcStore = useHnCalcStore()
</script>

<template>
    <div>
        <navbar />
        <main class="flex items-center justify-center h-[calc(100vh-61px)]">
            <section class="w-2/3 h-full">
                <div>
                    <h1 class="mb-2">H/N calculator</h1>
                    <p>Use this utility to create realistic looking hill profiles.</p>
                    <div class="mb-5">

                        <div class="row mb-3">
                            <div class="col-6">
                                <base-input disabled :model-value="
                                    Number.parseFloat((hnCalcStore.k / 30 + 6.9).toFixed(2)) <= 10.5
                                        ? (hnCalcStore.k / 30 + 6.9).toFixed(2)
                                        : 10.5
                                " label="Minimum optimal inrun alpha" description="min-alpha" type="float" />
                            </div>
                            <div class="col-6">
                                <base-input disabled :model-value="
                                    Number.parseFloat((hnCalcStore.k / 30 + 7.9).toFixed(2)) <= 11.5
                                        ? (hnCalcStore.k / 30 + 7.9).toFixed(2)
                                        : 11.5
                                " label="Maximum optimal inrun alpha" description="max-alpha" type="float" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-6">
                                <base-input disabled :model-value="(hnCalcStore.k / 800 + 0.4).toFixed(2)"
                                    label="Minimum optimal H/N" description="min-hn" type="float" />
                            </div>
                            <div class="col-6">
                                <base-input disabled :model-value="(hnCalcStore.k / 1000 + 0.48).toFixed(2)"
                                    label="Maximum optimal H/N" description="max-hn" type="float" />
                            </div>
                        </div>
                    </div>
                    <div class="mb-5">
                        <div class="mb-3">
                            <base-input v-model="hnCalcStore.h2n" label="Selected H/N value" description="max-hn"
                                type="number" min="0.51" max="0.61" />
                        </div>
                        <div class="row mb-3">
                            <div class="col-6">
                                <base-input disabled :model-value="
                                    ((hnCalcStore.k * Math.sin(Math.atan(hnCalcStore.h2n))) / 1.005).toFixed(2)
                                " label="Computed H value" description="h-val" type="float" />
                            </div>
                            <div class="col-6">
                                <base-input disabled :model-value="
                                    ((hnCalcStore.k * Math.cos(Math.atan(hnCalcStore.h2n))) / 1.005).toFixed(2)
                                " label="Computed N value" description="n-val" type="float" />
                            </div>
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
                    <base-input v-model="hnCalcStore.k" label="Construction point" description="k-point"
                        type="number" required />
                </div>
            </aside>
        </main>
    </div>
</template>