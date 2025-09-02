<template>
  <header class="w-full bg-[#101828] md:fixed top-0 z-50 text-white sticky" ref="navBar">
    <div class="container mx-auto flex flex-col py-4 px-6">
      <div class="w-full flex items-center justify-between">
      <!-- Logo -->
      <div class="text-2xl font-bold text-gray-200">
        ABPay
      </div>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex space-x-8 text-gray-200 font-medium">
        <a href="#features" class="hover:text-yellow-300">Explore</a>
        <a href="#gateway" class="hover:text-yellow-300">Collections</a>
        <a href="#docs" class="hover:text-yellow-300">Resources</a>
        <a href="#pricing" class="hover:text-yellow-300">Choose</a>
      </nav>

      <!-- Login Button -->
      <a href="#login"
         class="hidden md:inline-block bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
        Login
      </a>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <div v-if="menuOpen" class="md:hidden bg-white shadow-lg border-t">
      <nav class="flex flex-col px-6 py-4 space-y-4 text-gray-700">
        <a href="#features" @click="closeMenu">Explore</a>
        <a href="#gateway" @click="closeMenu">Collections</a>
        <a href="#docs" @click="closeMenu">Resources</a>
        <a href="#pricing" @click="closeMenu">Choose</a>
        <a href="#login"
           class="bg-yellow-700 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition">
          Login
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'

const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const closeMenu = () => (menuOpen.value = false)

const navBar = ref(null)

const handleScroll = () => {
  console.log(window.scrollY)
  if (window.scrollY >= 20) {
    navBar.value.style.cssText=`background:#101828;shadow:0px 2px 2px;`;
  } else {
    navBar.value.classList.add('bg-transparent')
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

