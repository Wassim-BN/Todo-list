<script setup>
import { ref } from 'vue'

import TitleComponent from './components/TitleComponent.vue'
import ActionComponent from './components/ActionBarComponent.vue'
import TodoComponent from './components/TodoListComponent.vue'

const todos = ref([])

const addItem = (todoText) => {
  const newTodo = { id: todos.value.length + 1, text: todoText, completed: false }
  todos.value.push(newTodo)
}
</script>

<template>
  <main class="w-screen flex flex-col items-center gap-2 pt-16">
    <TitleComponent />
    <ActionComponent :add-item="() => addItem(text)" />
    <TodoComponent />
    {{ todos }}
  </main>
</template>
