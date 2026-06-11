<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>
<template>
  <div v-if="isOpen" class="absolute top-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-red-400 shadow z-99">
    <h2>Option</h2> 
  </div>
</template>