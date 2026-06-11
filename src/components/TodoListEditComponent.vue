<script setup>
import { ref } from 'vue'
import { PhCheck, PhWarning, PhX, PhDotsSixVertical } from '@phosphor-icons/vue'

// Components
import ActionBarContextMenuComponent from '@/components/ActionBarContextMenuComponent.vue'

// Stores
import { useTodosStore } from '@/stores/todos.js'

const todosStore = useTodosStore()

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const isEditing = ref(false)
const editedText = ref(props.todo.text)

const handleEdit = async () => {
  if (editedText.value.trim().length <= 4) return

  await todosStore.editTodo(
    props.todo.id,
    editedText.value,
    props.todo.completed,
    props.todo.sequence,
  )
  await todosStore.fetchTodos()
  isEditing.value = false
  editedText.value = props.todo.text
  
}

const handleCancelEdit = () => {
  isEditing.value = false
  editedText.value = props.todo.text
}
</script>

<template>
  <div class="flex justify-between items-center w-full">
    <div class="flex items-center gap-2">
      <!-- Checkbox -->
      <div class="relative flex items-center gap-2 rounded-2xl">
        <ph-dots-six-vertical class="text-gray-600 cursor-grab" />
        <input
          type="checkbox"
          class="cursor-pointer z-10"
          @change="() => todosStore.toggleSelectedItem(todo.id)"
        />
      </div>

      <div class="flex items-center gap-2">
        <span>{{ props.todo.id }}</span>
        <!-- <span>{{ props.todo.sequence }}</span> -->

        <div class="flex items-center gap-1 m -2 px-1 py-0 bg-amber-300 rounded">
          <input v-model="props.todo.sequence" class="gap-1 outline-none" type="number" min="1" />
          <div class="flex gap-1">
            <button
              class="flex items-center w-3 h-3 bg-green-400 rounded cursor-pointer hover:bg-green-500 active:bg-green-600 transition duration-150 ease-in-out"
              @click="handleEdit()"
            >
              <ph-check></ph-check>
            </button>
            <button
              class="flex items-center w-3 h-3 bg-red-400 rounded cursor-pointer hover:bg-red-500 active:bg-red-600 transition duration-150 ease-in-out"
              @click="handleCancelEdit()"
              >
              <ph-x class=""></ph-x>
            </button>
          </div>
        </div>

        <div>
          <ph-check v-if="props.todo.completed" class="text-green-600" />
          <ph-warning v-else class="text-yellow-600" />
        </div>

        <div>
          <div v-if="isEditing" class="flex items-center gap-1 px-1 py-0 bg-amber-300 rounded">
            <input v-model="editedText" class="outline-none" />
            <div class="flex items-center gap-1">
              <button
                @click="handleEdit"
                class="flex items-center px-1 py-0.5 bg-green-400 rounded cursor-pointer hover:bg-green-500 active:bg-green-600 transition duration-150 ease-in-out"
              >
                <ph-check class="w-3 h-3 text-white" />
              </button>
              <button
                @click="handleCancelEdit"
                class="flex items-center px-1 py-0.5 bg-red-400 rounded cursor-pointer hover:bg-red-500 active:bg-red-600 transition duration-150 ease-in-out"
              >
                <ph-x class="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
          <span v-else @click="() => (isEditing = true)" class="px-1">{{ props.todo.text }}</span>
        </div>
      </div>
    </div>
    <action-bar-context-menu-component :todo="props.todo" />
  </div>
</template>
