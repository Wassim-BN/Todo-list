<script setup>
import { ref } from 'vue'
import { useTodosStore } from '@/stores/todos.js'

const todoText = ref('')
const todoSequence = ref(0)
const todoCompleted = ref(false)
const todosStore = useTodosStore()

const handleCreateTodo = async (text, completed, sequence) => {
  if (text.trim().length <= 4) return
  if (sequence < 0) return
  if (todosStore.uniqueTodo(sequence)) {
    return alert('La séquence existe déjà')
  } 

  await todosStore.createTodo(text, completed, sequence)
  await todosStore.fetchTodos()
}

const handleSubmit = async () => {
  await handleCreateTodo(todoText.value.trim(), todoCompleted.value, todoSequence.value)
  todoText.value = ''
  todoSequence.value = 0
  todoCompleted.value = false
  todosStore.isOpen = false
}

const closeModal = () => {
  todosStore.isOpen = false
}
</script>

<template>
  <div v-if="todosStore.isOpen" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-xl h-50 bg-blue-500 rounded-xl border shadow z-99">
    <div class="flex justify-center items-center">
      <span class="p-2 font-size-xl underline">Todo Text</span>
    </div>
    <div class="flex justify-center items-center p-4 gap-4">
      <input type="text" class="bg-sky-200 px-2 py-1 border rounded-3xl w-50 outline-none" v-model="todoText" placeholder="Ajouter une tâche" />
      <input type="number" min="1" class="bg-sky-200 px-2 py-1 border rounded w-15 outline-none" placeholder="N°" v-model="todoSequence"/>
      <div class="flex justify-center items-center gap-4 bg-sky-200 rounded border px-2 py-1">
        <input type="radio" id="todo" name="status" value="false" v-model="todoCompleted" /><label for="todo">A faire</label>
        <input type="radio" id="done" name="status" value="true" v-model="todoCompleted" /><label for="done">Terminé</label>
      </div>
    </div>

    <div class="flex justify-center p-4 gap-4">
      <button 
        class="items-center text-white px-2 py-1 cursor-pointer rounded border transition duration-150 ease-in-out" 
        @click="handleSubmit" 
        :class="todosStore.isLoading || todoText.trim().length <= 4 ? 'bg-gray-500 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 active:bg-pink-300 cursor-pointer'"
        :disabled="todosStore.isLoading || todoText.trim().length <= 4"
      >
        Ajouter
      </button>
      <button class="items-center px-2 py-1 cursor-pointer rounded border bg-gray-300 hover:bg-gray-400 transition duration-300 ease-in-out" @click="closeModal">
        Fermer
      </button>
    </div>
  </div>
</template>