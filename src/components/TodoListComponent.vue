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
  <!-- Unordered list of todos -->
  <div class="mx-auto p-4 rounded-shadow min-h-[200px] w-xl rounded-lg">
    <ul class="flex flex-col gap-2 w-full overflow-y-scroll justify-center items-center">
      <li
        class="px-2 py-1 w-full flex justify-center items-center bg-green-100 rounded"
        draggable="true"
        v-for="todo in props.isCompleted ? todosStore.completedTodos : todosStore.uncompletedTodos"
        :key="todo.id"
        :class="{ 'bg-green-100': !todo.completed, 'bg-red-100': todo.completed }"
        :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }"
      >
        <todo-list-edit-component :todo="todo" />
      </li>
    </ul>
  </div>
</template>
