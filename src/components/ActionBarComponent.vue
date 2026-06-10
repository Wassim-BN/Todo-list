<script setup>
import { ref } from 'vue'
import { PhTrash, PhPlus, PhArrowClockwise } from '@phosphor-icons/vue'

// Stores
import { useTodosStore } from '@/stores/todos.js'

const todoText = ref('')
const todosStore = useTodosStore()

const handleCreateTodo = async (text) => {
  await todosStore.createTodo(text)
  await todosStore.fetchTodos()
}
</script>
<template>
  <div class="bg-green-100 w-xl gap-1 m-1.5 p-1.5 flex justify-between items-center rounded prl-2">
    <div><span>Actions</span></div>
    <div class="flex gap-1">
      <div>{{ todosStore.selectedTodos.length }}</div>
      <button
        title="Delete the selection 🗑️"
        class="bg-red-600 hover:bg-red-700 px-2 py-1 rounded active:bg-red-300 cursor-pointer transition-colors duration-300 ease-in-out"
        @click="() => todosStore.deleteSelectedItems(selectedTodos)"
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
      class="px-2 py-1 rounded-md flex transition-colors duration-300 ease-in-out"
      :class="
        todosStore.isLoading || todoText.trim().length <= 4
          ? 'bg-gray-500 cursor-not-allowed'
          : 'bg-green-600  hover:bg-green-700 active:bg-green-300 cursor-pointer'
      "
      :disabled="todosStore.isLoading || !todoText"
      @click="() => handleCreateTodo(todoText.trim())"
    >
      <ph-arrow-clockwise v-if="todosStore.isLoading" class="text-white animate-spin" />
      <ph-plus v-else class="text-white" />
    </button>
  </div>
</template>
