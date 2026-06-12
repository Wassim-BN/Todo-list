<script setup>
import { ref } from 'vue'
import { useTodosStore } from '@/stores/todos.js'

const isOpen = ref(true)
const inputValue = ref('')
const inputSequence = ref(1)
const todoText = ref('')
const todosStore = useTodosStore()

const handleCreateTodo = async (text) => {
  if (text.trim().length <= 4) return
  await todosStore.createTodo(text)
  await todosStore.fetchTodos()
}

const handleSubmit = () => {
  handleCreateTodo(todoText.value.trim())
  isOpen.value = false
}

</script>
<template>
  <div v-if="isOpen" class="absolute top-1/2 -translate-y-1/2 w-xl h-xl bg-pink-50 rounded shadow z-99">
    <div class="flex justify-center items-center">
      <span class="p-2 font-size-xl">Option</span>
    </div>
    <div class="flex justify-center items-center gap-4">
      <input type="text" class="px-2 py-1 border rounded-3xl w-50" v-model="todoText" placeholder="Ajouter une tâche" />
      <input type="number" min="1" class="px-2 py-1 border rounded w-10" v-model="inputSequence" placeholder="N°" />
      <div class="flex justify-center items-center gap-4">
        <input type="radio" id="todo" name="status" value="todo" v-model="inputValue" /><label>A faire</label>
        <input type="radio" id="done" name="status" value="done" v-model="inputValue" /><label>Terminé</label>
      </div>
    </div>

    <div class="flex justify-center gap-4">
      <button class="items-center mt-4 cursor-pointer rounded hover:bg-gray-200 active:bg-gray-300 transition duration-150 ease-in-out" @click="handleSubmit" 
        :class="
          todosStore.isLoading || todoText.trim().length <= 4
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-pink-600  hover:bg-pink-700 active:bg-pink-300 cursor-pointer'"
      :disabled="todosStore.isLoading || !todoText">Ajouter</button>
      <button class="items-center cursor-pointer rounded hover:bg-gray-200 active:bg-gray-300 transition duration-150 ease-in-out" @click="isOpen = false">Fermer</button>
    </div>
  </div>
</template>
