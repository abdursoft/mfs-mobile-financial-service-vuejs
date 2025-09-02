<template>
  <section class="py-20 px-6 bg-white">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      
      <!-- Left -->
      <div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Receive and send payments
        </h2>
        <p class="text-gray-600">
          Pai Nan is a payment gateway that helps your business grow. We help businesses accept multiple payment methods.
        </p>
      </div>

      <!-- Right: Email form -->
      <form class="flex w-full max-w-md gap-2">
        <input type="email" placeholder="Email Address"
               class="flex-1 border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400"/>
        <button type="submit"
                class="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
          Subscribe
        </button>
      </form>
    </div>
  </section>
</template>
