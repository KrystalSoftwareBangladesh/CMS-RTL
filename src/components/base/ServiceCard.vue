<script setup lang="ts">
interface Props {
  number: string
  title: string
  description: string
}

defineProps<Props>()
</script>

<template>
  <div class="group rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.32)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)] sm:p-6">
    <div class="flex items-start gap-4">
      <span class="text-5xl font-bold text-secondary/40 transition-colors group-hover:text-secondary">
        {{ number }}
      </span>
      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ title }}</h3>
        <p class="text-sm leading-relaxed text-gray-700">{{ description }}</p>
      </div>
    </div>
  </div>
</template>
