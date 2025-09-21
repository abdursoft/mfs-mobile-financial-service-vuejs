<script setup>
import Title from './Title.vue';

</script>

<template>
  <section class="py-20 px-6 bg-white" id="multi-account">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      <!-- Left: Illustration -->
      <div class="p-6 flex items-center justify-center">
        <img src="/images/digital-marketing.png" alt="Multi-Account" class="w-72 md:w-96 object-cover" data-aos="fade-right" />
      </div>

      <!-- Right: Content -->
      <div>
        <Title class="text-gray-600" title="Merchant" />
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6" data-aos="fade-left">
          Merchant Services
        </h2>

        <ul class="space-y-6 text-gray-700">
          <li class="flex gap-4" data-aos="fade-up">
            <span class="text-yellow-500 font-bold">01</span>
            <p>Create and integrate ABPay Merchant in your website or Application</p>
          </li>
          <li class="flex gap-4" data-aos="fade-up">
            <span class="text-yellow-500 font-bold">02</span>
            <p>Receive or Accept payments from your audience</p>
          </li>
          <li class="flex gap-4" data-aos="fade-up">
            <span class="text-yellow-500 font-bold">03</span>
            <p>Create invoices and collect payments</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
