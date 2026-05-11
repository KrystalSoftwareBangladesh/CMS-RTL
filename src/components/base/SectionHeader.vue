<script setup lang="ts">
interface Props {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

withDefaults(defineProps<Props>(), {
  centered: true,
  light: false
})
</script>

<template>
  <div :class="['mb-12', centered ? 'text-center' : '']">
    <span
      v-if="label"
      :class="[
        'text-sm font-medium tracking-wider uppercase mb-2 block',
        light ? 'text-white/80' : 'text-gray-600'
      ]"
    >
      {{ label }}
    </span>
    <h2
      :class="[
        'text-3xl md:text-4xl font-bold mb-4',
        light ? 'text-white' : 'text-gray-900'
      ]"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      :class="[
        'text-lg max-w-2xl',
        centered ? 'mx-auto' : '',
        light ? 'text-white/85' : 'text-gray-700'
      ]"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
