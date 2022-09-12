<template>
  <nav class="px-6 py-4 flex items-center bg-white border-b">
    <span class="font-semibold text-xl relative">
      DSJ4 Utils
      <span class="absolute bg-blue-600 px-2 rounded-full text-xs text-white">BETA</span>
    </span>
    <div class="flex-grow" />
    <div class="flex gap-4">
      <NuxtLink class="font-medium hover:underline" to="/windchart">
        Wind Chart
      </NuxtLink>
      <NuxtLink class="font-medium hover:underline" to="/hncalc">
        H/N Calculator
      </NuxtLink>
      <NuxtLink class="font-medium hover:underline" to="/image2xml">
        Image to XML
      </NuxtLink>
      <NuxtLink class="font-medium hover:underline" to="/obj2xml">
        Obj to XML
      </NuxtLink>
      <NuxtLink class="font-medium hover:underline" to="/polynom3">
        Polynom3 Visualizer
      </NuxtLink>
    </div>
  </nav>
</template>
