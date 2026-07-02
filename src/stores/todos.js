// imports function from vue
import { ref, computed } from 'vue'
// Store definition from pinia
import { defineStore } from 'pinia'

// import composables
import {
  useFetchTodos,
  useCreateTodo,
  useEditTodo,
  useDeleteTodo,
  useDeleteSelectedTodos,
} from '@/composables/useTodos'

// export store definition
export const useTodosStore = defineStore('todos', () => {
  // Variables of the store
  const isLoading = ref(false)
  const todos = ref([])
  const selectedTodos = ref([])
  const isOpen = ref(false)
  
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
  // 
  const addItem = (todoText, sequence, completed) => {
    const newTodo = { id: newId(), text: todoText, sequence: sequence, completed: completed }
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

  const selectAllTodos = () => {
    selectedTodos.value = todos
  }

  const deleteSelectedItems = async () => {
    isLoading.value = true
    try {
      await useDeleteSelectedTodos(selectedTodos.value)
      selectedTodos.value = []
      await fetchTodos()
    } catch (error) {
      //
    } finally {
      isLoading.value = false
    }
  }

  const fetchTodos = async () => {
    try {
      const data = await useFetchTodos()
      todos.value = data
    } catch (error) {
      todos.value = []
    } finally {
      isLoading.value = false
    }
  }

  const createTodo = async (text, completed, sequence) => {
    isLoading.value = true
    try {
      const newTodo = await useCreateTodo(text, completed, sequence)
      todos.value.push(newTodo)
    } catch (error) {
      //
    } finally {
      isLoading.value = false
    }
  }

  const editTodo = async (id, text, completed, sequence) => {
    isLoading.value = true
    try {
      await useEditTodo(id, text, completed, sequence)
    } catch (error) {
      //
    } finally {
      isLoading.value = false
    }
  }

  const deleteTodo = async (id) => {
    isLoading.value = true
    try {
      await useDeleteTodo(id)
    } catch (error) {
      //
    } finally {
      isLoading.value = false
    }
  }

  const uniqueTodo = (sequence) => {
    return todos.value.find(todo => todo.sequence == sequence)
  }

  return {
    isLoading,
    todos,
    selectedTodos,
    isOpen,
    uncompletedTodos,
    completedTodos,
    addItem,
    removeItem,
    addSelectedItem,
    toggleItemStatus,
    toggleSelectedItem,
    selectAllTodos,
    deleteSelectedItems,
    fetchTodos,
    createTodo,
    editTodo,
    deleteTodo,
    uniqueTodo,
  }
})
