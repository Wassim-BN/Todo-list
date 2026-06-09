<script setup>
import { ref, defineProps } from 'vue'
import { PhTrash, PhCheck, PhWarning, PhDotsThreeVertical } from '@phosphor-icons/vue'

// Stores
import { useTodosStore } from '@/stores/todos.js'

const todosStore = useTodosStore()

const isActionsMenuOpen = ref(false)

const toggleActionsMenu = () => {
  isActionsMenuOpen.value = !isActionsMenuOpen.value
}

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const handleDelete = async () => {
  await todosStore.deleteTodo(props.todo.id)
  await todosStore.fetchTodos()
}

const handleValidTodo = async () => {
  await todosStore.validTodo(props.todo.id)
  await todosStore.fetchTodos()
}

</script>

<template>
  <div class="relative flex gap-1">
    <button
      @click="toggleActionsMenu"
      class="cursor-pointer z-10 hover:bg-gray-200 rounded-2xl active:bg-gray-300 transition-colors duration-300 ease-in-out"
    >
      <ph-dots-three-vertical />
    </button>
    <div
      v-if="isActionsMenuOpen"
      class="absolute flex gap-2 -top-2 -left-25 bg-white rounded shadow px-2 py-1 z-10"
    >
      <button
        @click="handleDelete(props.todo.id)"
        class="px-2 py-1 bg-red-400 rounded hover:bg-red-500 active:bg-red-300 cursor-pointer transition-colors duration-300 ease-in-out group"
      >
        <ph-trash class="text-white group-hover:text-gray-300" />
      </button>
      <button
        @click="() => handleValidTodo(props.todo.id)"
        class="px-2 py-1 cursor-pointer transition-colors duration-300 ease-in-out group"
        :class="
          props.todo.completed
            ? 'bg-orange-400 rounded hover:bg-orange-500 active:bg-orange-300'
            : 'bg-green-400 rounded hover:bg-green-500 active:bg-green-300'
        "
      >
        <ph-check v-if="!props.todo.completed" class="text-white group-hover:text-gray-300" />
        <ph-warning v-else class="text-white group-hover:text-gray-300" />
      </button>
    </div>
  </div>
</template>
