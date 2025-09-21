<template>
  <section class="py-20 px-6 bg-gray-50">
    <div class="container mx-auto text-center mb-12">
      <div class="w-full flex items-center justify-center">
        <Title class="text-gray-600" title="Commercial users" />
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900" data-aos="fade-up">Our Valued Merchants</h2>
    </div>

    <!-- Logo Grid -->
    <div class="container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center" >
      <div v-for="merchant in merchants" :key="merchant.name"
        class="flex justify-center rounded-md p-3 shadow-md overflow-hidden">
        <img :src="merchant.logo" :alt="merchant.name" class="h-12 md:h-16 object-contain" data-aos="fade-in" />
      </div>
    </div>
  </section>
</template>

<script setup>
import Title from './Title.vue';

const merchants = [
  { name: 'Google Play', logo: '/images/google-play.png' },
  { name: 'Amazon', logo: '/images/amazon.png' },
  { name: 'Shopee', logo: '/images/shopee.png' },
  { name: 'Ramayana', logo: '/images/ramayana.png' },
  { name: 'Maybank', logo: '/images/maybank.png' },
  { name: 'Alfamart', logo: '/images/alfamart.png' },
  { name: 'Emirates', logo: '/images/emirates.png' },
  { name: 'Telkomsel', logo: '/images/telkomsel.png' },
  { name: 'Bukalapak', logo: '/images/bukalapak.png' },
  { name: 'Mentari', logo: '/images/mentari.png' },
  { name: 'Tokopedia', logo: '/images/tokopedia.png' },
]
</script>
