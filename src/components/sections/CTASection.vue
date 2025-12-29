<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import heroImage from '@/assets/images/semi_truck_on_highwa_08289769.jpg'
</script>

<template>
  <section class="relative py-24">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${heroImage})` }"
    >
      <div class="absolute inset-0 bg-primary/90"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6">
      <div class="max-w-2xl">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Let's Connect With Us And Work Together
        </h2>
        <p class="text-white/70 mb-8">
          Tell us your requirement, we will work on it and give you best result.
        </p>
        <BaseButton variant="outline" size="md">
          Contact Us
        </BaseButton>
      </div>
    </div>
  </section>
</template>
