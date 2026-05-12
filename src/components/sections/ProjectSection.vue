<script setup lang="ts">
import SectionHeader from '@/components/base/SectionHeader.vue'
import workerImage from '@/assets/images/warehouse_worker_wit_259b881f.jpg'
import portImage from '@/assets/images/cargo_ship_container_77664e3d.jpg'
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <div class="grid items-center gap-16 lg:grid-cols-2">
        <div class="relative">
          <div class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.36)]">
            <img
              :src="workerImage"
              alt="Delivery worker"
              class="h-96 w-full rounded-[1.4rem] object-cover"
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

          <div class="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.32)]">
            <img
              :src="portImage"
              alt="Container port"
              class="h-48 w-full rounded-[1.2rem] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
