<script setup>
import { ref } from 'vue'

const isOpen = ref(true)

</script>
<template>
  <div v-if="isOpen" class="absolute top-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gray-100 rounded shadow z-99">
    <div class="flex justify-center items-center">
      <span class="flex p-2 font-size-xl">Option</span>
    </div>
    
    <div class="flex justify-center ">
      <button class="flex justify-center items-center cursor-pointer rounded hover:bg-gray-200 active:bg-gray-300 transition duration-150 ease-in-out" @click="isOpen = false">Close</button>
    </div>
  </div>
</template>