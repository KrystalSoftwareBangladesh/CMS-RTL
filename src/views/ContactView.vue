<script setup lang="ts">
import SectionHeader from '@/components/base/SectionHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import FAQSection from '@/components/sections/FAQSection.vue'
import truckImage from '@/assets/images/semi_truck_on_highwa_08289769.jpg'

const contactInfo = [
  {
    icon: 'location',
    title: 'Visit Us',
    lines: ['Dhaka, Bangladesh', 'Business District', 'Rising Trading Ltd.']
  },
  {
    icon: 'phone',
    title: 'Call Us',
    lines: ['+880 1XXX-XXXXXX', '+880 2XXX-XXXXXX', 'Sun-Thu: 9AM - 6PM']
  },
  {
    icon: 'email',
    title: 'Email Us',
    lines: ['info@risingtradingltd.com', 'support@risingtradingltd.com', 'sales@risingtradingltd.com']
  }
]

const offices = [
  { city: 'Dhaka', country: 'Bangladesh', type: 'Headquarters' },
  { city: 'Chittagong', country: 'Bangladesh', type: 'Regional Office' },
  { city: 'Singapore', country: 'Asia', type: 'Trade Partner' },
  { city: 'Dubai', country: 'UAE', type: 'Trade Partner' }
]
</script>

<template>
  <main>
    <section class="relative py-32 bg-primary">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${truckImage})` }"
      >
        <div class="absolute inset-0 bg-primary-dark/80"></div>
      </div>
      <div class="relative z-10 container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Contact Us</h1>
        <p class="text-white/70 text-lg max-w-2xl mx-auto">
          Get in touch with our team for quotes, support, or partnership inquiries
        </p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-3 gap-8 mb-16">
          <BaseCard
            v-for="info in contactInfo"
            :key="info.title"
            :hover="true"
            class="text-center"
          >
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
              <svg v-if="info.icon === 'location'" class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <svg v-else-if="info.icon === 'phone'" class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <svg v-else class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ info.title }}</h3>
            <div class="space-y-1">
              <p v-for="line in info.lines" :key="line" class="text-gray-600 text-sm">{{ line }}</p>
            </div>
          </BaseCard>
        </div>

        <div class="grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeader
              label="Send a Message"
              title="Get in Touch"
              subtitle="Fill out the form and our team will get back to you within 24 hours."
              :centered="false"
            />
            <form class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Service Interested In</label>
                <select class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent">
                  <option value="">Select a service</option>
                  <option value="road">Road Freight</option>
                  <option value="air">Air Freight</option>
                  <option value="sea">Sea Freight</option>
                  <option value="rail">Rail Freight</option>
                  <option value="warehouse">Warehousing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows="5"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
                  placeholder="Tell us about your logistics needs..."
                ></textarea>
              </div>
              <BaseButton variant="secondary" size="lg">
                Send Message
              </BaseButton>
            </form>
          </div>

          <div>
            <SectionHeader
              label="Our Locations"
              title="Global Offices"
              subtitle="We have offices around the world to serve you better."
              :centered="false"
            />
            <div class="space-y-4 mb-8">
              <BaseCard
                v-for="office in offices"
                :key="office.city"
                :padding="'sm'"
                :hover="true"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">{{ office.city }}, {{ office.country }}</h4>
                      <p class="text-sm text-gray-500">{{ office.type }}</p>
                    </div>
                  </div>
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </BaseCard>
            </div>

            <div class="rounded-2xl overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692693!2d90.27923991057058!3d23.780573258035968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1703800000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FAQSection />
  </main>
</template>
