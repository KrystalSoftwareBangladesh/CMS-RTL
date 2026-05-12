<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'white'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})

const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 cursor-pointer shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2'

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

const variantClasses = {
  primary: 'bg-white text-primary hover:bg-slate-100 hover:-translate-y-0.5',
  secondary: 'bg-secondary text-white hover:bg-secondary-light hover:-translate-y-0.5',
  outline: 'border-2 border-white/85 text-white backdrop-blur-sm hover:bg-white hover:text-primary hover:-translate-y-0.5',
  white: 'bg-white text-primary hover:bg-slate-50 hover:-translate-y-0.5'
}

const componentType = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})
</script>

<template>
  <component
    :is="componentType"
    :to="to"
    :href="href"
    :type="!to && !href ? 'button' : undefined"
    :class="[baseClasses, sizeClasses[size], variantClasses[variant]]"
  >
    <slot />
  </component>
</template>
