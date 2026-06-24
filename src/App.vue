<script setup>
import { onMounted } from 'vue'
import { PhSun, PhMoon } from '@phosphor-icons/vue'

// Components
import TitleComponent from '@/components/TitleComponent.vue'
import ActionComponent from '@/components/ActionBarComponent.vue'
import TodoComponent from '@/components/TodoListComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'

// Store
import { useTodosStore } from '@/stores/todos'
import { useDark, useToggle } from "@vueuse/core";

const todosStore = useTodosStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)

onMounted(() => {
  todosStore.fetchTodos()
})

</script>

<template>        
    <main class="flex flex-col items-center gap-2 w-screen h-screen overflow-hidden">
      <ModalComponent /> 
      <button title="Toggle dark mode 🌓"
      class="absolute right-10 top-12 px-2 py-1 rounded active:bg-gray-300 cursor-pointer transition-colors duration-300 ease-in-out"
      :class="
        isDark
          ? 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-300 cursor-pointer'
          : 'bg-gray-600 hover:bg-gray-700 active:bg-gray-300 cursor-pointer'
      "
      @click="toggleDark()">
        
        <PhSun v-if="isDark" class="w-6 h-6" />
        <PhMoon v-else class="w-6 h-6" />
      </button>
      <TitleComponent />
      <ActionComponent />
      <h1 class="flex bg-gray-200 w-xl rounded px-2 py-1 justify-center">A faire 💻</h1>
      <TodoComponent />
      <h1 class="flex bg-gray-200 w-xl rounded px-2 py-1 justify-center">🎉🥳 Terminées 🥳🎉</h1>
      <TodoComponent :is-completed="true" />
    </main>
</template>
<style>
  .dark {
    background: #16171d;
  }
</style>