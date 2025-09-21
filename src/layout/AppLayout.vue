<template>
    <div>
        <HomeNav />
        <router-view></router-view>
        <Footer />
    </div>
</template>

<script setup>
import Footer from '@/components/footer/Footer.vue';
import HomeNav from '@/components/header/HomeNav.vue';

</script>