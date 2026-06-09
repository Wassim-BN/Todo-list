<script setup>
import { PhCheck, PhWarning } from '@phosphor-icons/vue'

// Components
import ActionBarContextMenuComponent from '@/components/ActionBarContextMenuComponent.vue'

// Stores
import { useTodosStore } from '@/stores/todos.js'

const todosStore = useTodosStore()

const props = defineProps({
  isCompleted: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <div>
    <ul class="flex flex-col gap-2 w-xl overflow-y-scroll max-h-72 justify-center items-center">
      <li
        v-for="todo in props.isCompleted ? todosStore.completedTodos : todosStore.uncompletedTodos"
        :key="todo.id"
        class="px-2 py-1 w-full flex justify-center items-center bg-green-100 rounded"
      >
        <div class="flex justify-between items-center w-full">
          <div class="flex items-center gap-2">
            <!-- Checkbox -->
            <div
              class="relative flex items-center h-5 w-5 rounded-2xl hover:bg-gray-200 active:bg-gray-300 transition-colors duration-300 ease-in-out"
            >
              <input
                type="checkbox"
                class="cursor-pointer z-10"
                @change="() => todosStore.toggleSelectedItem(todo.id)"
              />
            </div>

            <div class="flex items-center gap-2">
              <span>{{ todo.id }}</span>
              <div>
                <ph-check v-if="todo.completed" class="text-green-600" />
                <ph-warning v-else class="text-yellow-600" />
              </div>
              <span>{{ todo.text }}</span>
            </div>
          </div>
          <action-bar-context-menu-component :todo="todo" />
        </div>
      </li>
    </ul>
  </div>
</template>
