<script setup>
import Title from './Title.vue';

</script>

<template>
  <section class="py-20 px-6 bg-white">
    <div class="container mx-auto flex gap-8 flex-col md:flex-row items-center justify-between">

      <!-- Left -->
      <div>
        <Title class="text-gray-600" title="Notification" />
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-aos="fade-up">
          Don't want to miss offers and notification
        </h2>
        <p class="text-gray-600 md:pr-10" data-aos="fade-up">
          To get every updates and offer from ABPay, please subscribe our newsletter. We promise we are notify our
          subscribers for any update and offers. Stay tune with ABPay and enjoy our services.
        </p>
      </div>

      <!-- Right: Email form -->
      <form class="flex w-full max-w-md gap-2">
        <input type="email" placeholder="Email Address"
          class="flex-1 border text-gray-700 border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400" />
        <button type="submit"
          class="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
          Subscribe
        </button>
      </form>
    </div>
  </section>
</template>
