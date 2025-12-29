<script setup lang="ts">
interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: boolean
  rounded?: boolean
  hover?: boolean
}

withDefaults(defineProps<Props>(), {
  padding: 'md',
  shadow: true,
  rounded: true,
  hover: false
})

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}
</script>

<template>
  <div
    :class="[
      'bg-white',
      paddingClasses[padding],
      shadow ? 'shadow-lg' : '',
      rounded ? 'rounded-2xl' : '',
      hover ? 'hover:shadow-xl transition-shadow duration-300' : ''
    ]"
  >
    <slot />
  </div>
</template>
