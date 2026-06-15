<script setup>
import { onMounted } from 'vue'

// Components
import TitleComponent from '@/components/TitleComponent.vue'
import ActionComponent from '@/components/ActionBarComponent.vue'
import TodoComponent from '@/components/TodoListComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'

// Store
import { useTodosStore } from '@/stores/todos'
const todosStore = useTodosStore()

onMounted(() => {
  todosStore.fetchTodos()
})

</script>

<template>
    <!-- <div class="absolute w-15 h-15 top-1/2 left-1/5 bg-blue-500 rounded-full"></div>
    <div class="absolute w-15 h-15 top-90 left-62 bg-white rounded-full z-3 border"></div>
    <div class="absolute w-15 h-15 top-90 left-74 bg-white rounded-full z-2 border"></div>
    <div class="absolute w-15 h-15 top-97 left-68 bg-yellow-500 rounded z-1"></div>
    <div class="absolute w-5 h-5 top-95 left-70 bg-black rounded-full z-3"></div>
    <div class="absolute w-5 h-5 top-95 left-80 bg-black rounded-full z-3"></div>
    <div class="absolute w-5 h-5 top-105 left-70 bg-black rounded-full z-3"></div>              -->
    <main class="flex flex-col items-center gap-2 bg-black w-screen h-screen overflow-hidden" @click.ctrl="bg-white || bg-black">
      <ModalComponent /> 
      <TitleComponent />
      <ActionComponent />
      <h1 class="flex bg-gray-200 w-xl rounded px-2 py-1 justify-center">A faire 💻</h1>
      <TodoComponent />
      <h1 class="flex bg-gray-200 w-xl rounded px-2 py-1 justify-center">🎉🥳 Terminées 🥳🎉</h1>
      <TodoComponent :is-completed="true" />
    </main>
</template>
