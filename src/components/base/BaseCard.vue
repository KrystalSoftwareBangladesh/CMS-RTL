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
      'bg-white border border-slate-200/80',
      paddingClasses[padding],
      shadow ? 'shadow-[0_18px_45px_-24px_rgba(15,23,42,0.28)]' : '',
      rounded ? 'rounded-2xl' : '',
      hover ? 'transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_-28px_rgba(15,23,42,0.34)]' : ''
    ]"
  >
    <slot />
  </div>
</template>
