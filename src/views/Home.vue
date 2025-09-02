<template>
  <div>
    <Navbar />
    <Hero />
    <Features />
    <Gateway />
    <MultiAccount />
    <Merchants />
    <Newsletter />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/header/HomeNav.vue'
import Hero from '../components/partials/Hero.vue'
import Features from '../components/partials/Features.vue'
import Gateway from '../components/partials/Gateway.vue'
import MultiAccount from '../components/partials/Accounts.vue'
import Merchants from '../components/partials/Merchant.vue'
import Newsletter from '../components/partials/Newsletter.vue'
import Footer from '../components/footer/Footer.vue'
</script>
