<script setup>
import { useHead } from '@vueuse/head';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'

onMounted(() => {
  useHead({
      link: [
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ],
      meta:[
        // Standard SEO
        { name: 'description', content: "ABPay is a seamless, hasselefree and easy to use payment service, a product of ABBank." },
        { name: 'keywords', content: "abpay payment payment-procedure" },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'en' },
        { name: 'author', content: 'AbdurSoft' },

        // Open Graph / Facebook
        { property: 'og:title', content: "ABPay payment platform" },
        { property: 'og:description', content: "ABPay is a seamles, hasselfree and easy to use payment service, a product of ABBank." },
        { property: 'og:type', content: 'video.movie' },
        { property: 'og:url', content: '/' },
        { property: 'og:image', content: "/abpay.png" },

        // Twitter Cards
        { name: 'twitter:card', content: "/abpay.png" },
        { name: 'twitter:title', content: "ABPay payment platform" },
        { name: 'twitter:description', content: "ABPay is a seamles, hasselfree and easy to use payment service, a product of ABBank." },
        { name: 'twitter:image', content: "/abpay.png" },

        // Schema (JSON-LD via script)
        {
          name: 'structured-data',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Payment",
            "name": "ABPay payment platform",
            "description": "ABPay is a seamles, hasselfree and easy to use payment service, a product of ABBank.",
            "image": "/abpay.png",
            "url": window.location.href
          })
        }
      ]
    });
})
</script>

<template>
  <RouterView />
</template>