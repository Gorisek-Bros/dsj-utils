<template>
  <nav class="px-6 py-4 flex items-center bg-white border-b sticky top-0">
    <span class="font-semibold text-xl relative">
      DSJ4 Utils
      <span class="absolute bg-blue-600 px-2 rounded-full text-xs text-white">BETA</span>
    </span>
    <div class="flex-grow" />
    <div class="flex gap-4">
      <NuxtLink to="/windchart" class="font-medium hover:underline">
        Wind Chart
      </NuxtLink>
      <NuxtLink to="/hncalc" class="font-medium hover:underline">
        H/N Calculator
      </NuxtLink>
      <NuxtLink to="/image2xml" class="font-medium hover:underline">
        Image to XML
      </NuxtLink>
      <NuxtLink to="/obj2xml" class="font-medium hover:underline">
        Obj to XML
      </NuxtLink>
    </div>
  </nav>
</template>
