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

const removeItem = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}
</script>

<template>
  <main class="w-screen flex flex-col items-center gap-2 pt-16">
    <TitleComponent />
    <ActionComponent :add-item="(text) => addItem(text)" />
    <TodoComponent :todos="todos" :remove-item="removeItem" />
  </main>
</template>
