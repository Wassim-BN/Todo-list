<script setup>
const title = import.meta.env.VITE_APP_TITLE
</script>
<template>
  <div class="w-xl bg-purple-400 mt-12! flex justify-center items-center rounded">
    <h1 class="font-bold! text-white text-5xl">{{ title }}</h1>
  </div>
</template>
