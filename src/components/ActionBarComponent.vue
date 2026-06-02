<script setup>
import { ref } from 'vue'
import { PhTrash } from '@phosphor-icons/vue'
import { PhCheck } from '@phosphor-icons/vue'

const todoText = ref('')

const props = defineProps({
  addItem: {
    type: Function,
    required: true,
  },
})
</script>
<template>
  <div
    class="bg-green-100 w-xl gap-1 m-1.5 p-1.5 flex justify-between items-center rounded-xl prl-2 cursor-alias"
  >
    <div><span>Actions</span></div>
    <div class="flex gap-1">
      <button class="bg-red-600 cursor-pointer hover:bg-red-700 rounded-md flex">
        <PhTrash :size="22" />
      </button>
      <!-- <button class="bg-green-600 cursor-pointer hover:bg-green-700 rounded-md flex">
        <PhCheck :size="22" />
      </button> -->
    </div>
  </div>
  <div
    class="bg-green-100 w-xl gap-1 m-1.5 p-1.5 flex justify-between items-center rounded-xl prl-2 cursor-alias"
  >
    <input v-model="todoText" type="text" class="text-black w-full" placeholder="Todo text" />
    <button
      class="bg-green-600 cursor-pointer hover:bg-green-700 rounded-md flex"
      @click="(text) => props.addItem(todoText)"
    >
      <PhCheck :size="22" />
    </button>
  </div>
</template>
