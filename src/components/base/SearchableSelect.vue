<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

export interface SelectOption {
  id: number | string
  name: string
}

const props = withDefaults(
  defineProps<{
    modelValue?: number | string | null
    options: SelectOption[]
    placeholder?: string
    noOptionLabel?: string
    searchable?: boolean
    loading?: boolean
  }>(),
  {
    placeholder: 'Search...',
    noOptionLabel: 'None',
    searchable: true,
    loading: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: number | string | undefined]
  search: [query: string]
}>()

const isOpen = ref(false)
const searchQuery = ref('')
const containerRef = ref<HTMLElement | null>(null)

const selectedOption = computed(() => {
  if (props.modelValue === null || props.modelValue === undefined) return null
  return props.options.find((opt) => opt.id === props.modelValue) || null
})

const displayValue = computed(() => {
  return selectedOption.value?.name || ''
})

function handleInputChange(event: Event) {
  const target = event.target as HTMLInputElement
  searchQuery.value = target.value
  emit('search', target.value)
  isOpen.value = true
}

function selectOption(option: SelectOption | null) {
  emit('update:modelValue', option?.id)
  searchQuery.value = ''
  isOpen.value = false
}

function handleFocus() {
  isOpen.value = true
  if (props.searchable) {
    emit('search', '')
  }
}

function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(isOpen, (open) => {
  if (!open) {
    searchQuery.value = ''
  }
})
</script>

<template>
  <div ref="containerRef" class="relative">
    <div class="relative">
      <input
        type="text"
        :value="isOpen ? searchQuery : displayValue"
        :placeholder="selectedOption ? '' : placeholder"
        @input="handleInputChange"
        @focus="handleFocus"
        class="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
      />
      <button
        v-if="modelValue"
        type="button"
        @click.stop="selectOption(null)"
        class="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <svg
        class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    <div
      v-if="isOpen"
      class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <div v-if="loading" class="px-3 py-2 text-gray-500 text-center">
        <svg class="animate-spin h-5 w-5 mx-auto text-primary" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <template v-else>
        <button
          type="button"
          @click="selectOption(null)"
          class="w-full px-3 py-2 text-left hover:bg-gray-100 text-gray-500"
        >
          {{ noOptionLabel }}
        </button>
        <button
          v-for="option in options"
          :key="option.id"
          type="button"
          @click="selectOption(option)"
          :class="[
            'w-full px-3 py-2 text-left hover:bg-gray-100',
            option.id === modelValue ? 'bg-primary/10 text-primary' : ''
          ]"
        >
          {{ option.name }}
        </button>
        <div v-if="options.length === 0 && !loading" class="px-3 py-2 text-gray-500 text-center">
          No results found
        </div>
      </template>
    </div>
  </div>
</template>
