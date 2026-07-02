<script setup>
import { onMounted } from 'vue'

// Components
import ActionComponent from '@/components/ActionBarComponent.vue'
import TodoComponent from '@/components/TodoListComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import DarkThemeComponent from '@/components/DarkThemeComponent.vue'


// Store
import { useTodosStore } from '@/stores/todos'

const todosStore = useTodosStore()

onMounted(() => {
  todosStore.fetchTodos()
})

</script>

<template>        
    <main class="flex flex-col pb-10 items-center gap-2 w-screen h-screen">
      <ModalComponent /> 
      <DarkThemeComponent />
      <ActionComponent />
      <h1 class="flex bg-gray-200 w-xl rounded px-2 py-1 justify-center">A faire 💻</h1>
      <TodoComponent />
      <h1 class="flex bg-gray-200 w-xl rounded px-2 py-1 justify-center">🎉🥳 Terminées 🥳🎉</h1>
      <TodoComponent :is-completed="true" />
    </main>
</template>