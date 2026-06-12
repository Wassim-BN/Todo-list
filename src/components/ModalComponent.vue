<script setup>
import { ref } from 'vue'
import { useTodosStore } from '@/stores/todos.js'

const todoText = ref('')
const todosStore = useTodosStore()
const isOpen = ref(todosStore.isOpen)

// const props = defineProps({
//   todo: {
//     type: Object,
//     required: true,
//   },
// })

const handleCreateTodo = async (text) => {
  if (text.trim().length <= 4) return
  await todosStore.createTodo(text)
  await todosStore.fetchTodos()
}

const handleSubmit = () => {
  handleCreateTodo(todoText.value.trim())
  isOpen.value = false
}

const handleFinishedTodo = async () => {
  
}

</script>
<template>
  <div v-if="isOpen" class="absolute top-1/2 -translate-y-1/2 w-xl h-50 bg-pink-50 rounded shadow z-99">
    <div class="flex justify-center items-center">
      <span class="p-2 font-size-xl">Option</span>
    </div>
    <div class="flex justify-center items-center p-4 gap-4">
      <input type="text" class="px-2 py-1 border rounded-3xl w-50 outline-none" v-model="todoText" placeholder="Ajouter une tâche" />
      <input type="number" min="1" class="px-2 py-1 border rounded w-15 outline-none" placeholder="N°" />
      <div class="flex justify-center items-center gap-4">
        <input type="radio" id="todo" name="status" value="todo" /><label>A faire</label>
        <input type="radio" id="done" name="status" value="done" /><label>Terminé</label>
      </div>
    </div>

    <div class="flex justify-center p-4 gap-4">
      <button class="items-center text-white px-2 py-1 cursor-pointer rounded hover:bg-gray-200 active:bg-gray-300 transition duration-150 ease-in-out" @click="handleSubmit" 
        :class="
          todosStore.isLoading || todoText.trim().length <= 4
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-pink-600  hover:bg-pink-700 active:bg-pink-300 cursor-pointer'"
      :disabled="todosStore.isLoading || !todoText">Ajouter</button>
      <button class="items-center px-2 py-1 cursor-pointer rounded hover:bg-gray-200 active:bg-gray-300 transition duration-300 ease-in-out" @click="isOpen = false">Fermer</button>
    </div>
  </div>
</template>
