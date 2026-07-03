<script setup>
import { VueDraggable } from 'vue-draggable-plus'
import TodoListEditComponent from '@/components/TodoListEditComponent.vue'
import { useTodosStore } from '@/stores/todos'

const todosStore = useTodosStore()

const props = defineProps({
  isCompleted: {
    type: Boolean,
    default: false,
  },
})

</script>

<template>
  <VueDraggable
    class=" overflow-y-scroll h-50"
    animation="100"
    ghost-class="ghost"
  >
    <div class="flex flex-col gap-1 max-h-37.5 w-full pt-4 items-center" v-for="todo in props.isCompleted ? todosStore.completedTodos : todosStore.uncompletedTodos" :key="todo.id">
      <div
        class="px-2 py-1 w-140 flex justify-center items-center rounded hover:-translate-y-1 duration-150 ease-in-out shadow hover:shadow-md"
        :class="{ 'bg-green-100': !todo.completed, 'bg-red-100': todo.completed }"
        :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }"
      >
        <TodoListEditComponent :todo="todo" />
      </div>
    </div>
  </VueDraggable>
</template>

<!-- <template>
   Unordered list of todos 
  <div class="mx-auto min-h-[200px] w-xl">
    <ul class="flex flex-col gap-2 max-h-[300px] w-full pt-4 overflow-y-scroll items-center">
      <li
        class="px-2 py-1 w-full flex justify-center items-center rounded hover:-translate-y-1 duration-200 ease-in-out shadow hover:shadow-md"
        v-for="todo in props.isCompleted ? todosStore.completedTodos : todosStore.uncompletedTodos"
        :key="todo.id"
        :class="{ 'bg-green-100': !todo.completed, 'bg-red-100': todo.completed }"
        :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }"
      >
        <todo-list-edit-component :todo="todo" />
      </li>
    </ul>
  </div>
</template> -->
