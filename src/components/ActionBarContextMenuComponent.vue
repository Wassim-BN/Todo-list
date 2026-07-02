<script setup>
import { ref } from 'vue'
// Phosphor icons
import { PhTrash, PhCheck, PhWarning, PhDotsThreeVertical } from '@phosphor-icons/vue'

// Stores
import { useTodosStore } from '@/stores/todos.js'

const todosStore = useTodosStore()

// Set the initial state of the actions menu
const isActionsMenuOpen = ref(false)

// Toggle the actions menu
const toggleActionsMenu = () => {
  isActionsMenuOpen.value = !isActionsMenuOpen.value
}

// Define an object, the props for todos
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

// Function to handle delete todo asyncrhonously
const handleDelete = async () => {
  await todosStore.deleteTodo(props.todo.id, props.todo.sequence)
  await todosStore.fetchTodos()
}

// Function to handle edit todo asyncrhonously
const handleEditTodo = async () => {
  await todosStore.editTodo(props.todo.id, props.todo.text, !props.todo.completed)
  await todosStore.fetchTodos()
}
</script>

<template>
  <div class="relative flex gap-1">
    <!-- Action context menu button -->
    <button
      @click="toggleActionsMenu"
      class="cursor-pointer z-10 hover:bg-gray-200 rounded-2xl active:bg-gray-300 transition-colors duration-300 ease-in-out"
    >
      <ph-dots-three-vertical />
    </button>
    <!-- Action Menu -->
    <div
      v-if="isActionsMenuOpen"
      class="absolute flex gap-2 -top-2 -left-25 bg-white rounded shadow px-2 py-1 z-10"
    >
      <!-- Delete todo button -->
      <button
        @click="() => handleDelete(props.todo.id)"
        class="px-2 py-1 bg-red-400 rounded hover:bg-red-500 active:bg-red-300 cursor-pointer transition-colors duration-300 ease-in-out"
      >
        <ph-trash class="text-white group-hover:text-gray-300" />
      </button>
      <!-- Edit todo button -->
      <button
        @click="() => handleEditTodo(props.todo.id)"
        class="px-2 py-1 cursor-pointer transition-colors duration-300 ease-in-out group"
        :class="
          props.todo.completed
            ? 'bg-orange-400 rounded hover:bg-orange-500 active:bg-orange-300'
            : 'bg-green-400 rounded hover:bg-green-500 active:bg-green-300'
        "
      >
        <!-- Check or warning icon if todo completed -->
        <ph-check v-if="!props.todo.completed" class="text-white group-hover:text-gray-300" />
        <ph-warning v-else class="text-white group-hover:text-gray-300" />
      </button>
    </div>
  </div>
</template>
