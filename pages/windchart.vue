<script setup lang="ts">

definePageMeta({
    layout: 'main',
})

const form = reactive({
    wind: null,
    default: null,
    minGate: null,
    maxGate: null,
})

watch((form), () => {
    calculate();
})

function getCoordinates(e) {
    var rect = document.getElementById('chart').getBoundingClientRect()
    var x = (e.clientX - rect.left - 400) / 160
    var y = (-1 * (e.clientY - rect.top - 400)) / 160
    var windSpeed = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

    document.getElementById('windDirection').innerHTML = getDirection(x, y) + " degrees";
    document.getElementById('windSpeed').innerHTML = (Math.round(windSpeed * 100) / 100).toString();
}

function getDirection(x, y) {
    return Math.round(Math.asin(y / Math.sqrt(x * x + y * y)) * (180 / Math.PI) + 90);
}

function calculate() {
    document.querySelectorAll('.gate').forEach(e => e.remove())

    var svg = document.getElementById('chart')
    for (let gate = form.minGate; gate <= form.maxGate; gate++) {
        let low = (gate - form.default - 0.5) / form.wind * 100
        if (gate == form.minGate && low > -200) {
            low = -200
        }
        let high = (gate - form.default + 0.5) / form.wind * 100
        if (gate == form.maxGate && high < 200) {
            high = 200
        }
        if (low < 200 && high > -200) {
            var hue = gate * 40 % 360
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            path.setAttributeNS(null, 'class', 'gate')
            path.setAttributeNS(null, 'd', 'M -220 ' + low + ' H 220 V ' + high + ' H -220 Z')
            path.setAttributeNS(null, 'style', 'fill:hsla(' + hue + ' , 45%, 40%, 0.7)')
            path.setAttributeNS(null, 'clip-path', 'url(#mask)')
            svg.appendChild(path)

            var text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            text.setAttributeNS(null, 'class', 'gate')
            text.setAttributeNS(null, 'x', '50')
            text.setAttributeNS(null, 'y', ((low + high) / 2 + 4).toString())
            text.setAttributeNS(null, 'style', 'font-family:Arial,Helvetica,sans-serif;font-size:8pt;fill:hsla(' + hue + ' , 45%, 40%, 1)')
            text.innerHTML = 'Gate ' + gate;
            svg.appendChild(text)
        }
    }
}
</script>

<template>
    <section class="w-2/3 px-6 h-full border-r">
        <h1 class="text-3xl font-bold mt-5 mb-1">
            Wind Chart
        </h1>
        <p>Use this utility to setup gates in your hill.</p>
        <div class="mt-6">
            <svg width="800" height="800" viewBox="-250 -250 500 500" id="chart" @mousemove="getCoordinates" @load="calculate">
                <defs>
                    <clipPath id="mask">
                        <circle r="200" id="maskc" cy="0" cx="0" stroke-width="0" stroke="#000" fill="none" />
                    </clipPath>
                </defs>
                <circle cx="0" cy="0" r="100" style="fill:none;stroke:#000000;stroke-width: 1.5px" />
                <circle cx="0" cy="0" r="200" style="fill:none;stroke:#000000;stroke-width: 1.5px" />
                <circle cx="0" cy="0" r="180" style="fill:none;stroke:#000000;stroke-width: 0.5px" />
                <circle cx="0" cy="0" r="160" style="fill:none;stroke:#000000;stroke-width: 0.5px" />
                <circle cx="0" cy="0" r="140" style="fill:none;stroke:#000000;stroke-width: 0.5px" />
                <circle cx="0" cy="0" r="120" style="fill:none;stroke:#000000;stroke-width: 0.5px" />
                <circle cx="0" cy="0" r="80" style="fill:none;stroke:#000000;stroke-width: 0.5px" />
                <circle cx="0" cy="0" r="60" style="fill:none;stroke:#000000;stroke-width: 0.5px" />
                <circle cx="0" cy="0" r="40" style="fill:none;stroke:#000000;stroke-width: 0.5px" />
                <circle cx="0" cy="0" r="20" style="fill:none;stroke:#000000;stroke-width: 0.5px" />
                <line x1="-200" y1="0" x2="200" y2="0" style="fill:none;stroke:#000000;stroke-width: 1px" />
                <line y1="-200" x1="0" y2="200" x2="0" style="fill:none;stroke:#000000;stroke-width: 1px" />
            </svg>
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
            <base-input v-model="form.wind" step="0.01" min="0" label="Hill definition wind" description="wind" type="number" />
            <base-input v-model="form.default" min="0" label="Hill definition default gate" description="default"
                type="number" />
            <base-input v-model="form.minGate" min="0" label="Hill definition min gate" description="min-gate" type="number" />
            <base-input v-model="form.maxGate" min="0" label="Hill definition max gate" description="max-gate" type="number" />
            Wind direction: <span id="windDirection">0</span><br>
            Wind speed: <span id="windSpeed">0</span>
        </div>
    </aside>
</template>