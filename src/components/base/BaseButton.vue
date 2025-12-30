<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'white'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})

const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 cursor-pointer'

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

const variantClasses = {
  primary: 'bg-white text-primary hover:bg-gray-100',
  secondary: 'bg-secondary text-white hover:bg-secondary-light',
  outline: 'border-2 border-white text-white hover:bg-white hover:text-primary',
  white: 'bg-white text-primary hover:bg-gray-50'
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :class="[baseClasses, sizeClasses[size], variantClasses[variant]]"
  >
    <slot />
  </component>
</template>
