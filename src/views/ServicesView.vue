<script setup lang="ts">
import SectionHeader from '@/components/base/SectionHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import ServiceCard from '@/components/base/ServiceCard.vue'
import FAQSection from '@/components/sections/FAQSection.vue'
import CTASection from '@/components/sections/CTASection.vue'
import { services } from '@/data/services'
import truckImage from '@/assets/images/yellow_truck_transpo_661ef152.jpg'
import cargoImage from '@/assets/images/cargo_ship_container_77664e3d.jpg'

const additionalServices = [
  {
    number: '05',
    title: 'Warehousing',
    description: 'Secure storage solutions with inventory management, order fulfillment, and distribution services tailored to your needs.'
  },
  {
    number: '06',
    title: 'Supply Chain',
    description: 'End-to-end supply chain management optimizing your logistics from sourcing to final delivery.'
  }
]

const allServices = [...services, ...additionalServices]

const benefits = [
  {
    icon: 'clock',
    title: 'On-Time Delivery',
    description: 'We guarantee timely deliveries with real-time tracking and proactive communication.'
  },
  {
    icon: 'shield',
    title: 'Cargo Insurance',
    description: 'Comprehensive insurance coverage to protect your goods throughout the journey.'
  },
  {
    icon: 'globe',
    title: 'Global Network',
    description: 'Access to a worldwide network of partners ensuring seamless international shipping.'
  },
  {
    icon: 'chart',
    title: 'Cost Optimization',
    description: 'Smart routing and consolidation strategies to minimize your shipping costs.'
  }
]

const processSteps = [
  { step: '01', title: 'Request Quote', description: 'Share your shipping requirements and get a competitive quote.' },
  { step: '02', title: 'Book Shipment', description: 'Confirm your booking and prepare your cargo for pickup.' },
  { step: '03', title: 'Track & Monitor', description: 'Real-time visibility of your shipment at every stage.' },
  { step: '04', title: 'Safe Delivery', description: 'Your goods delivered safely to the destination.' }
]
</script>

<template>
  <main>
    <section class="relative py-32 bg-slate-800">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${truckImage})` }"
      >
        <div class="absolute inset-0 bg-slate-900/80"></div>
      </div>
      <div class="relative z-10 container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Our Services</h1>
        <p class="text-white/70 text-lg max-w-2xl mx-auto">
          Comprehensive logistics solutions tailored to meet your business needs
        </p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <SectionHeader
          label="What We Offer"
          title="Logistics Services for Every Need"
          subtitle="From road to sea, air to rail, we provide end-to-end transportation solutions."
        />
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BaseCard
            v-for="service in allServices"
            :key="service.number"
            :hover="true"
          >
            <ServiceCard
              :number="service.number"
              :title="service.title"
              :description="service.description"
            />
          </BaseCard>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="relative">
            <img
              :src="cargoImage"
              alt="Cargo shipping"
              class="rounded-2xl shadow-xl w-full h-[450px] object-cover"
            />
          </div>
          <div>
            <span class="text-sm font-medium tracking-wider uppercase text-teal-500 mb-2 block">Why Choose Us</span>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Benefits of Working With Us
            </h2>
            <div class="space-y-6">
              <div
                v-for="benefit in benefits"
                :key="benefit.title"
                class="flex gap-4"
              >
                <div class="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                  <svg v-if="benefit.icon === 'clock'" class="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else-if="benefit.icon === 'shield'" class="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <svg v-else-if="benefit.icon === 'globe'" class="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else class="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ benefit.title }}</h3>
                  <p class="text-gray-600 text-sm">{{ benefit.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-slate-800">
      <div class="container mx-auto px-6">
        <SectionHeader
          label="Our Process"
          title="How It Works"
          subtitle="Simple steps to get your cargo moving"
          :light="true"
        />
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(item, index) in processSteps"
            :key="item.step"
            class="relative text-center"
          >
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-teal-500 flex items-center justify-center text-white text-2xl font-bold">
              {{ item.step }}
            </div>
            <h3 class="text-white font-semibold text-lg mb-2">{{ item.title }}</h3>
            <p class="text-gray-400 text-sm">{{ item.description }}</p>
            <div
              v-if="index < processSteps.length - 1"
              class="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-teal-500/30"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container mx-auto px-6 text-center">
        <SectionHeader
          label="Get Started"
          title="Ready to Ship?"
          subtitle="Contact us today for a free quote and experience our premium logistics services."
        />
        <div class="flex flex-wrap justify-center gap-4">
          <BaseButton variant="secondary" size="lg">
            Get a Quote
          </BaseButton>
          <BaseButton variant="primary" size="lg">
            Contact Us
          </BaseButton>
        </div>
      </div>
    </section>

    <FAQSection />

    <CTASection />
  </main>
</template>
