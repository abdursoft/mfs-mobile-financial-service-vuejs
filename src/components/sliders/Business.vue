<template>
  <Swiper
    :modules=[Autoplay]
    :slides-per-view="1"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :autoplay="{ delay: 3000, disableOnInteraction: false }"
    class="w-full md:h-[85vh] h-[360px] text-black md:mt-[70px]"
  >
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide>
    <!-- Add more slides as needed -->
  </Swiper>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'

// Event handlers (Composition API style)
const onSwiper = (swiper) => {
  console.log(swiper)
}

const onSlideChange = () => {
  console.log('slide change')
}
</script>
