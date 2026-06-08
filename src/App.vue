<script setup>
import { ref, computed } from 'vue'

import TitleComponent from './components/TitleComponent.vue'
import ActionComponent from './components/ActionBarComponent.vue'
import TodoComponent from './components/TodoListComponent.vue'

const todos = ref([])
const selectedTodos = ref([])

const uncompletedTodos = computed(() => todos.value.filter((todo) => !todo.completed))
const completedTodos = computed(() => todos.value.filter((todo) => todo.completed))

function newId() {
  for (let i = 1; i <= todos.value.length; i++) {
    if (!todos.value.some((todo) => todo.id === i)) {
      return i
    }
  }
  return todos.value.length + 1
}

const addItem = (todoText) => {
  const newTodo = { id: newId(), text: todoText, completed: false }
  todos.value.push(newTodo)
}

const removeItem = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

const addSelectedItem = (id) => {
  const todo = todos.value.find((todo) => todo.id === id)
  if (todo) {
    selectedTodos.value.push(todo)
  }
}

const toggleItemStatus = (id) => {
  const todo = todos.value.find((todo) => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

const toggleSelectedItem = (todoId) => {
  if (todoId) {
    if (selectedTodos.value.includes(todoId)) {
      selectedTodos.value = selectedTodos.value.filter((selectedTodo) => selectedTodo !== todoId)
    } else {
      selectedTodos.value.push(todoId)
    }
  }
}

const deleteSelectedItems = () => {
  selectedTodos.value.forEach((todoId) => {
    removeItem(todoId)
  })
  selectedTodos.value = []
}
</script>

<template>
  <main class="w-screen max-h-screen flex flex-col items-center gap-2">
    {{ selectedTodos }}
    <TitleComponent />
    <ActionComponent
      :selected-todos="selectedTodos"
      :delete-selected-items="deleteSelectedItems"
      :add-item="(text) => addItem(text)"
    />
    <h1 class="flex bg-gray-200 w-xl rounded px-2 py-1 justify-center ">A faire</h1>
    <TodoComponent
      :todos="uncompletedTodos"
      :remove-item="removeItem"
      :toggle-selected-item="(id) => toggleSelectedItem(id)"
      :toggle-item-status="(id) => toggleItemStatus(id)"
    />
    <h1 class="flex bg-gray-200 w-xl rounded px-2 py-1 justify-center ">Terminées</h1>
    <TodoComponent
      :todos="completedTodos"
      :remove-item="removeItem"
      :toggle-selected-item="(id) => toggleSelectedItem(id)"
      :toggle-item-status="(id) => toggleItemStatus(id)"
    />
  </main>
</template>
