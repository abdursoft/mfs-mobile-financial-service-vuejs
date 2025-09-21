<script setup>
import Title from './Title.vue';

</script>

<template>
  <section id="transfer" class="py-20 px-6 text-white">
    <div class="container mx-auto flex flex-col md:flex-row items-center gap-12" data-aos="fade-up">
      <!-- Left: Text -->
      <div class="flex-1">
        <img src="/images/transfer.png" alt="">
      </div>

      <!-- Right: Code Block -->
      <div class="flex-1 rounded-2xl text-gray-800 overflow-hidden p-6" data-aos="fade-down">
        <Title title="Easy transactions" />
        <h1 class="text-2xl md:text-3xl 2xl:text-4xl">Send and Received Money</h1>
        <p class="mt-6 text-gray-800 text-base md:text-lg lg:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore laudantium vel quaerat nemo consequuntur obcaecati repellat quas accusantium fugiat non?
        </p>

        <a href="#login"
         class="inline-block bg-yellow-400 text-black px-5 py-4 rounded-[28px] mt-10 font-semibold hover:bg-yellow-300 transition">
        {{ $t('button.getStarted') }}
      </a>
      </div>
    </div>
  </section>
</template>
