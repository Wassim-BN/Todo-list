<script setup>
// Components
import TodoListEditComponent from '@/components/TodoListEditComponent.vue'

// Stores
import { useTodosStore } from '@/stores/todos.js'

const todosStore = useTodosStore()

const props = defineProps({
  isCompleted: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <div class="mx-auto p-4 rounded-shadow">
    <ul class="flex flex-col gap-2 w-xl overflow-y-scroll justify-center items-center">
      <li
        v-for="todo in props.isCompleted ? todosStore.completedTodos : todosStore.uncompletedTodos"
        :key="todo.id"
        class="px-2 py-1 w-full flex justify-center items-center bg-green-100 rounded"
        draggable="true"
      >
        <todo-list-edit-component :todo="todo" />
      </li>
    </ul>
  </div>
</template>
