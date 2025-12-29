<script setup lang="ts">
import SectionHeader from '@/components/base/SectionHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import CTASection from '@/components/sections/CTASection.vue'
import warehouseImage from '@/assets/images/warehouse_worker_wit_259b881f.jpg'
import cargoImage from '@/assets/images/cargo_ship_container_77664e3d.jpg'

const stats = [
  { value: '25+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Completed' },
  { value: '150+', label: 'Team Members' },
  { value: '50+', label: 'Countries Served' }
]

const values = [
  {
    icon: 'shield',
    title: 'Reliability',
    description: 'We deliver on our promises, ensuring your cargo reaches its destination safely and on time.'
  },
  {
    icon: 'users',
    title: 'Customer Focus',
    description: 'Your success is our priority. We tailor our services to meet your unique logistics needs.'
  },
  {
    icon: 'globe',
    title: 'Global Reach',
    description: 'With partners worldwide, we connect you to markets across the globe seamlessly.'
  },
  {
    icon: 'leaf',
    title: 'Sustainability',
    description: 'We are committed to eco-friendly practices that minimize our environmental footprint.'
  }
]

const team = [
  { name: 'James Wilson', role: 'CEO & Founder', initials: 'JW' },
  { name: 'Sarah Chen', role: 'Operations Director', initials: 'SC' },
  { name: 'Michael Brown', role: 'Logistics Manager', initials: 'MB' },
  { name: 'Emily Davis', role: 'Customer Relations', initials: 'ED' }
]
</script>

<template>
  <main>
    <section class="relative py-32 bg-slate-800">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${cargoImage})` }"
      >
        <div class="absolute inset-0 bg-slate-900/80"></div>
      </div>
      <div class="relative z-10 container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">About Us</h1>
        <p class="text-white/70 text-lg max-w-2xl mx-auto">
          Delivering excellence in logistics and transportation since 1998
        </p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-sm font-medium tracking-wider uppercase text-teal-500 mb-2 block">Our Story</span>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Building Trust Through Reliable Logistics
            </h2>
            <p class="text-gray-600 mb-4">
              Founded in 1998, The Transport began as a small regional carrier with a simple mission: deliver goods safely and on time. Over the years, we've grown into a global logistics provider, serving businesses of all sizes across more than 50 countries.
            </p>
            <p class="text-gray-600 mb-6">
              Our success is built on a foundation of trust, innovation, and an unwavering commitment to customer satisfaction. We invest in cutting-edge technology and sustainable practices to ensure we remain at the forefront of the logistics industry.
            </p>
            <BaseButton variant="primary">
              Our Services
            </BaseButton>
          </div>
          <div class="relative">
            <img
              :src="warehouseImage"
              alt="Warehouse operations"
              class="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
            <div class="absolute -bottom-6 -left-6 bg-teal-500 text-white p-6 rounded-2xl shadow-lg">
              <div class="text-4xl font-bold">25+</div>
              <div class="text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center"
          >
            <div class="text-4xl md:text-5xl font-bold text-teal-500 mb-2">{{ stat.value }}</div>
            <div class="text-gray-600">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <SectionHeader
          label="Our Values"
          title="What Drives Us Forward"
          subtitle="Our core values shape every decision we make and every service we provide."
        />
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BaseCard
            v-for="value in values"
            :key="value.title"
            :hover="true"
          >
            <div class="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
              <svg v-if="value.icon === 'shield'" class="w-7 h-7 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <svg v-else-if="value.icon === 'users'" class="w-7 h-7 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else-if="value.icon === 'globe'" class="w-7 h-7 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else class="w-7 h-7 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ value.title }}</h3>
            <p class="text-gray-600 text-sm">{{ value.description }}</p>
          </BaseCard>
        </div>
      </div>
    </section>

    <section class="py-20 bg-slate-800">
      <div class="container mx-auto px-6">
        <SectionHeader
          label="Our Team"
          title="Meet The Experts"
          subtitle="Our dedicated professionals work tirelessly to deliver exceptional logistics solutions."
          :light="true"
        />
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="member in team"
            :key="member.name"
            class="text-center group"
          >
            <div class="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-105 transition-transform">
              {{ member.initials }}
            </div>
            <h3 class="text-white font-semibold text-lg">{{ member.name }}</h3>
            <p class="text-gray-400">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <TestimonialsSection />

    <CTASection />
  </main>
</template>
