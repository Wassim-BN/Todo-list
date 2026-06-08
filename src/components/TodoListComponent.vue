<script setup>
import { ref } from 'vue'
import { PhCheck, PhWarning, PhDotsThreeVertical } from '@phosphor-icons/vue'

import ActionBarContextMenuComponent from '@/components/ActionBarContextMenuComponent.vue'

const props = defineProps({
  todos: {
    type: Array,
    default: () => [],
  },
  removeItem: {
    type: Function,
    default: () => {},
  },
  addSelectedItem: {
    type: Function,
    default: () => {},
  },
  toggleSelectedItem: {
    type: Function,
    default: () => {},
  },
  toggleItemStatus: {
    type: Function,
    default: () => {},
  },
})
</script>
<template>
  <div>
    <ul class="flex flex-col gap-2 w-xl overflow-y-scroll max-h-72 justify-center items-center">
      <li
        v-for="todo in props.todos"
        :key="todo.id"
        class="px-2 py-1 w-full flex justify-center items-center bg-green-100 rounded"
      >
        <div class="flex justify-between items-center w-full">
          <div class="flex items-center gap-2">
            <!-- Checkbox -->
            <div class="relative flex items-center h-5 w-5  hover:bg-gray-200 rounded-2xl active:bg-gray-300 transition-colors duration-300 ease-in-out">
              <input
                type="checkbox"
                class="cursor-pointer z-10 "
                @change="(id) => toggleSelectedItem(todo.id)"
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
          <action-bar-context-menu-component
            :todo="todo"
            :toggle-item-status="(id) => toggleItemStatus(id)"
            :remove-item="removeItem"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
