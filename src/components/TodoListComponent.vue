<script setup>
// Components
import TodoListEditComponent from '@/components/TodoListEditComponent.vue'

import { ref } from 'vue'

// Stores
import { useTodosStore } from '@/stores/todos.js'

const todosStore = useTodosStore()

const props = defineProps({
  isCompleted: {
    type: Boolean,
    default: false,
  },
})

const startDrag = (ev) => {
  ev.dataTransfer.dropEffect = 'move'
  ev.dataTransfer.effectAllowed = 'move'
  ev.dataTransfer.setData('text/plain', ev.id)
}

const onDrop = (ev) => {
  ev.preventDefault()
  const data = ev.dataTransfer.getData('text/plain')
  ev.target.appendChild(document.getElementById(data))
}

// const startDrag = (todo) => {
//   isDragging.value = true
//   if (event.dataTransfer) {
//     event.dataTransfer.dropEffect = 'move'
//     event.dataTransfer.effectAllowed = 'move'
//     event.dataTransfer?.setData('text/plain', todo.id)
//   }
// }
  
// const onDrop = () => {
//   isDragging.value = false
//   if (event.dataTransfer) {
//     const todoID = event.dataTransfer?.getData('text/plain')
//     const todo = todo.value.find((todo) => todo.id == todoID)

//     if (todo) {
//       todo.status = status
//     }
//   }
// }

</script>
<template>
  <div class="mx-auto p-4 rounded-shadow" @drop="onDrop($event, status)" @dragover.prevent>
    <ul class="flex flex-col gap-2 w-xl overflow-y-scroll justify-center items-center">
      <li
        class="px-2 py-1 w-full flex justify-center items-center bg-green-100 rounded"
        draggable="true"
        @dragstart="startDrag($event, todo)"
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
