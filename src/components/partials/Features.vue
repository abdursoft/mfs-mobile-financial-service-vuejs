<script setup>
import { Icon } from '@iconify/vue';
import Title from './Title.vue';

</script>

<template>
  <section id="features" class="py-20 px-6 bg-white">
    <div class="container mx-auto text-center mb-12 flex flex-col items-center justify-center gap-2 text-gray-800">
      <Title title="Easy payment processing" />
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
        Custom-built Payment Gateway
      </h2>
    </div>

    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800" data-aos="zoom-in" data-aos-duration="1500">
      <div class="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
        <div class="text-green-600 text-4xl mb-4"><Icon icon="material-symbols-light:integration-instructions-outline" width="44" height="44"/></div>
        <h3 class="text-xl font-semibold mb-3">Simple Integration</h3>
        <p class="text-gray-600">Easy integration between your business and our payment gateway...</p>
      </div>

      <div class="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition" data-aos="zoom-in" data-aos-duration="1500">
        <div class="text-yellow-500 text-4xl mb-4"><Icon icon="line-md:speedometer-loop" width="44" height="44" /></div>
        <h3 class="text-xl font-semibold mb-3">Speed</h3>
        <p class="text-gray-600">Instant payments processing with fast settlement time...</p>
      </div>

      <div class="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition" data-aos="zoom-in" data-aos-duration="1500">
        <div class="text-blue-500 text-4xl mb-4"><Icon icon="streamline-ultimate:headphones-customer-support-question" width="44" height="44" /></div>
        <h3 class="text-xl font-semibold mb-3">Service</h3>
        <p class="text-gray-600">24/7 support to ensure your business runs smoothly...</p>
      </div>
    </div>
  </section>
</template>
