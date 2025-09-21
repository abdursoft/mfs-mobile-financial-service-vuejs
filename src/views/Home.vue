<template>
  <div>
    <Hero />
    <Transfer />
    <OpenAccount />
    <Features />
    <Gateway />
    <MultiAccount />
    <Merchants />
    <Newsletter />
  </div>
</template>

<script setup>
import Hero from '../components/partials/Hero.vue'
import Features from '../components/partials/Features.vue'
import Gateway from '../components/partials/Gateway.vue'
import MultiAccount from '../components/partials/MerchantPayment.vue'
import Merchants from '../components/partials/Merchant.vue'
import Newsletter from '../components/partials/Newsletter.vue'
import Transfer from '@/components/partials/Transfer.vue'
import OpenAccount from '@/components/partials/OpenAccount.vue'
</script>
