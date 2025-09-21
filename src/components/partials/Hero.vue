<script setup>
import Title from './Title.vue';

</script>

<template>
  <section class="bg-gray-900 text-white pt-32 pb-20 px-6" data-aos="fade-up">
    <div class="container mx-auto flex flex-col md:flex-row items-center gap-10">
      <!-- Text -->
      <div class="flex-1">
        <Title title="ABPay digital wallet" />
        <h1 class="text-4xl md:text-5xl font-bold leading-tight">
          Simplify all your <br />
          business financial <span class="text-yellow-400">transactions</span>
        </h1>
        <p class="mt-6 text-lg text-gray-300">
          <span class="text-yellow-400">ABPay</span> is a payment gateway that helps your business grow. We help businesses
          accept multiple payment methods and send funds to multiple destinations.
        </p>
        <a href="#get-started"
          class="inline-block mt-8 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
          Get Started
        </a>
      </div>

      <!-- Image -->
      <div class="flex-1 flex justify-center">
        <img src="/images/mobile.png" alt="Hero Phone" class="w-[300px] md:w-[400px] lg:w-[450px] object-contain" />
      </div>
    </div>
  </section>
</template>
