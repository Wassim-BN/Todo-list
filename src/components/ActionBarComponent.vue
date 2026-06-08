<script setup>
import { ref } from 'vue'
import { PhTrash, PhPlus } from '@phosphor-icons/vue'

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
    class="bg-gray-100 w-xl gap-1 px-2 py-1 flex justify-between items-center rounded cursor-alias"
  >
    <input
      v-model="todoText"
      type="text"
      class="text-black w-full outline-none"
      placeholder="Todo text"
    />
    <button
      class="px-2 py-1 bg-green-600 cursor-pointer hover:bg-green-700 rounded-md flex"
      @click="() => props.addItem(todoText)"
    >
      <ph-plus class="text-white" />
    </button>
  </div>
</template>
