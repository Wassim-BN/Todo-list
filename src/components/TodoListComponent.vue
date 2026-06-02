<script setup>
import { ref } from 'vue'

const title = ref('')

const deleteList = () => {
  title.value = ''
}

</script>
<template>
  <div>
    <ul class="bg-green-100 w-xl h-screen overflow-scroll max-h-150 flex justify-center items-center rounded">
      <li class="">item 1</li>
    </ul>
  </div>
</template>
