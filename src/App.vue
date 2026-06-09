<script setup>
import { onMounted } from 'vue'

// Components
import TitleComponent from '@/components/TitleComponent.vue'
import ActionComponent from '@/components/ActionBarComponent.vue'
import TodoComponent from '@/components/TodoListComponent.vue'

// Store
import { useTodosStore } from '@/stores/todos'
const todosStore = useTodosStore()

onMounted(() => {
  todosStore.fetchTodos()
})
</script>

<template>
  <main class="w-screen max-h-screen flex flex-col items-center gap-2">
    <TitleComponent />
    <ActionComponent />
    <h1 class="flex bg-gray-200 w-xl rounded px-2 py-1 justify-center">A faire</h1>
    <TodoComponent />
    <h1 class="flex bg-gray-200 w-xl rounded px-2 py-1 justify-center">Terminées</h1>
    <TodoComponent :is-completed="true" />
  </main>
</template>
