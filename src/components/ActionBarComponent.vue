<script setup>
import { PhTrash, PhDotsThreeVertical } from '@phosphor-icons/vue'
import { ref } from 'vue'

// Stores
import { useTodosStore } from '@/stores/todos.js'

const todosStore = useTodosStore()
const isActionsMenuOpen = ref(false)

// Function to delete selected items
const handleDeleteSelectedItems = async () => {
  await todosStore.deleteSelectedItems()
}

// Toggle the actions menu
const toggleActionsMenu = () => {
  isActionsMenuOpen.value = !isActionsMenuOpen.value
}

// Function to open the modal
const handleModalOpen = () => {
  todosStore.isOpen = true
}

</script>
<template>
  <!-- Action -->
  <div class="bg-green-100 w-xl gap-1 m-1.5 p-1.5 flex justify-between items-center rounded prl-2">
    <div class="flex gap-1">
      <span>Actions</span>
    </div>
    <!-- Delete button -->
    <div class=" relative flex gap-3">
      <span class="text-sm font-bold">{{ todosStore.selectedTodos.length }} sélectionné(s)</span>
      <button
        title="Delete the selection 🗑️"
        class="bg-red-600 hover:bg-red-700 px-2 py-1 rounded active:bg-red-300 cursor-pointer transition-colors duration-300 ease-in-out"
        :class="
          todosStore.selectedTodos.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-600 hover:bg-red-700 active:bg-red-300 cursor-pointer'
        "
        :disabled="todosStore.selectedTodos.length === 0"
        @click="() => handleDeleteSelectedItems()"
      >
        <PhTrash class="text-white" />
      </button>
      <!-- Action menu button -->
      <button
        @click="toggleActionsMenu"
        class="cursor-pointer w- z-10 hover:bg-gray-200 rounded-xl active:bg-gray-300 transition-colors duration-300 ease-in-out"
      >
        <ph-dots-three-vertical />
      </button>
      <div
        v-if="isActionsMenuOpen"
        class="absolute flex w-35 -top-1 left-45 rounded shadow px-2 py-1"
      >
        <button class="rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-200">
          Tout sélectionnée          
        </button>
      </div>
    </div>
  </div>
  <!-- Todo Text -->
  <div
    class="bg-gray-100 w-xl gap-1 px-2 py-1 flex justify-center items-center rounded cursor-alias"
  >
    <button
      type="button"
      title="Add todo 📆"
      class="px-15 py-1 bg-green-600 cursor-pointer rounded-md flex hover:bg-green-700 active:bg-green-300 transition-colors duration-300 ease-in-out"
      @click="handleModalOpen()"
    >
      <span class="text-white">Todo Text</span>
    </button>
  </div>
</template>
