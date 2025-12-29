<script setup lang="ts">
interface Props {
  number: string
  title: string
  description: string
}

defineProps<Props>()
</script>

<template>
  <div class="group">
    <div class="flex items-start gap-4">
      <span class="text-5xl font-bold text-secondary/30 group-hover:text-secondary transition-colors">
        {{ number }}
      </span>
      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ title }}</h3>
        <p class="text-gray-600 text-sm leading-relaxed">{{ description }}</p>
      </div>
    </div>
  </div>
</template>
