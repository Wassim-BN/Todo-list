<script setup>
//Icon phosphore
import { PhSun, PhMoon } from '@phosphor-icons/vue'
//Dark Theme
import { useDark, useToggle } from "@vueuse/core";
import TitleComponent from '@/components/TitleComponent.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<template>
    <!-- Button to toggle dark mode - top right corner -->
    <button title="Toggle dark mode 🌓"
    class="absolute right-10 top-12 px-2 py-1 rounded active:bg-gray-300 cursor-pointer transition-colors duration-300 ease-in-out"
    :class="
    isDark
        ? 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-300 shadow shadow-white hover:-translate-y-1 duration-150 ease-in-out cursor-pointer'
        : 'bg-gray-600 hover:bg-gray-700 active:bg-gray-300 shadow shadow-black hover:-translate-y-1 duration-150 ease-in-out cursor-pointer'
    "
    @click="toggleDark()">
    <!-- Icons -->
    <PhSun v-if="isDark" class="w-6 h-6" />
    <PhMoon v-else class="w-6 h-6 text-white" />
    </button>
    <TitleComponent :class="isDark ? 'bg-yellow-400 text-black' : 'bg-blue-800 text-white'" />
</template>

<style>
    .dark {
        background: #16171d;
    }
</style>