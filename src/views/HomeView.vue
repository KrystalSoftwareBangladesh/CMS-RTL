<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import ProjectSection from '@/components/sections/ProjectSection.vue'
import CTASection from '@/components/sections/CTASection.vue'
import FAQSection from '@/components/sections/FAQSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import NewsSection from '@/components/sections/NewsSection.vue'
</script>

<template>
  <div class="min-h-screen">
    <Navbar />
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectSection />
      <CTASection />
      <FAQSection />
      <TestimonialsSection />
      <NewsSection />
    </main>
    <Footer />
  </div>
</template>
