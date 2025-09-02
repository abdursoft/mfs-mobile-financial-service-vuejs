<template>
  <section id="gateway" class="py-20 px-6 bg-gray-900 text-white">
    <div class="container mx-auto flex flex-col md:flex-row items-center gap-12" data-aos="fade-up">
      <!-- Left: Text -->
      <div class="flex-1">
        <h2 class="text-3xl md:text-4xl font-bold leading-snug">
          Simplify payment <br /> system with <span class="text-yellow-400">API</span>
        </h2>
        <p class="mt-6 text-gray-300">
          Leverage our API-first technology to prepare your business for new insights.
        </p>
        <a href="#docs"
           class="inline-block mt-8 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
          Access API Docs
        </a>
      </div>

      <!-- Right: Code Block -->
      <div class="flex-1 bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-6" data-aos="fade-down">
        <pre class="text-sm text-green-400">
<code>
const data = {
  amount: 5000,
  currency: "USD",
  recipient: "example@pai-nan.com"
}

fetch("https://api.painan.com/payment", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
</code>
        </pre>
      </div>
    </div>
  </section>
</template>
