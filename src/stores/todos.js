import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useFetchTodos } from '@/composables/useTodos'

export const useTodosStore = defineStore('todos', () => {
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

  const fetchTodos = async () => {
    const data = await useFetchTodos()
    todos.value = data
  }

  return {
    todos,
    selectedTodos,
    uncompletedTodos,
    completedTodos,
    addItem,
    removeItem,
    addSelectedItem,
    toggleItemStatus,
    toggleSelectedItem,
    deleteSelectedItems,
    fetchTodos,
  }
})
