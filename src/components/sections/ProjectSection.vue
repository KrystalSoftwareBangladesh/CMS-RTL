<script setup lang="ts">
import SectionHeader from '@/components/base/SectionHeader.vue'
import workerImage from '@/assets/images/warehouse_worker_wit_259b881f.jpg'
import portImage from '@/assets/images/cargo_ship_container_77664e3d.jpg'
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="relative">
          <div class="rounded-3xl overflow-hidden shadow-xl">
            <img
              :src="workerImage"
              alt="Delivery worker"
              class="w-full h-96 object-cover"
            />
          </div>
        </div>

        <div>
          <SectionHeader
            label="Recent Project"
            title="Transporting Across The World"
            subtitle="A TMS is a software system that helps companies manage logistics associated with the movement of physical of goods."
            :centered="false"
          />

          <div class="rounded-2xl overflow-hidden shadow-lg">
            <img
              :src="portImage"
              alt="Container port"
              class="w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
