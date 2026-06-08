<script setup>
import { onActivated, ref } from 'vue'
import { PhTrash, PhCheck, PhWarning } from '@phosphor-icons/vue'

const props = defineProps({
  todos: {
    type: Array,
    default: () => [],
  },
  removeItem: {
    type: Function,
    default: () => {},
  },
})
</script>
<template>
  <div>
    <ul
      class="flex flex-col gap-2 w-xl overflow-scroll max-h-150 justify-center items-center rounded"
    >
      <li
        v-for="todo in props.todos"
        :key="todo.id"
        class="px-2 py-1 w-full flex justify-center items-center bg-green-100"
      >
        <div class="flex justify-between items-center w-full">
          <div class="flex items-center gap-2">
            <div class="flex items-center h-6">
              <input id="checkbox-{{ todo.id }}" v-if="onActivated(todo.completed = true)" type="checkbox" />
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
          <div>
            <button
              @click="props.removeItem(todo.id)"
              class="px-2 py-1 bg-red-400 rounded hover:bg-red-500 active:bg-red-300 cursor-pointer transition-colors duration-300 ease-in-out group"
            >
              <ph-trash class="text-white group-hover:text-gray-300" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
