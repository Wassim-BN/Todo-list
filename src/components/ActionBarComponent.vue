<script setup>
import { ref } from 'vue'
import { PhTrash, PhPlus } from '@phosphor-icons/vue'

const todoText = ref('')

const props = defineProps({
  addItem: {
    type: Function,
    required: true,
  },
  selectedTodos: {
    type: Array,
    default: () => [],
  },
  deleteSelectedItems: {
    type: Function,
    default: () => {},
  },
})
</script>
<template>
  <div
    class="bg-green-100 w-xl gap-1 m-1.5 p-1.5 flex justify-between items-center rounded-xl prl-2"
  >
    <div><span>Actions</span></div>
    <div class="flex gap-1">
      <div>{{ props.selectedTodos.length }}</div>
      <button
        title="Delete the selection 🗑️"
        class="bg-red-600 hover:bg-red-700 px-2 py-1 rounded active:bg-red-300 cursor-pointer transition-colors duration-300 ease-in-out"
        @click="() => props.deleteSelectedItems(selectedTodos)"
      >
        <PhTrash class="text-white" />
      </button>
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
      title="Add todo 📆"
      class="px-2 py-1 bg-green-600 cursor-pointer hover:bg-green-700 rounded-md flex active:bg-green-300 transition-colors duration-300 ease-in-out"
      @click="() => props.addItem(todoText)"
    >
      <ph-plus class="text-white" />
    </button>
  </div>
</template>
