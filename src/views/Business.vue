<script setup>
import Features from '@/components/partials/Features.vue';
import Gateway from '@/components/partials/Gateway.vue';
import Merchant from '@/components/partials/Merchant.vue';
import MerchantPayment from '@/components/partials/MerchantPayment.vue';
import BusinessSlider from '@/components/sliders/Business.vue';

</script>

<template>
    <div>
        <BusinessSlider />
        <MerchantPayment />
        <Merchant />
        <Gateway />
        <Features />
    </div>
</template>