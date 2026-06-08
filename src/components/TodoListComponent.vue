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
        class="px-2 py-1 w-full flex justify-center items-center bg-green-100 rounded z-1"
      >
        <div class="flex justify-between items-center w-full">
          <div class="flex items-center gap-2">
            <div class=" relative flex items-center h-6 hover:group">
              <input
                type="checkbox"
                class="hover:bg-green-200 cursor-pointer z-10"
                @change="(id) => toggleSelectedItem(todo.id)"
              />
              <div class="absolute hover:bg-gray-200 w-5 h-5 rounded-2xl top-0.5 -left-1 hover:group-first-of-type:bg-gray-200"></div>
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
          />
        </div>
      </li>
    </ul>
  </div>
</template>
