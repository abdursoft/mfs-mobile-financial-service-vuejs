<template>
  <header class="w-full bg-[#101828] md:fixed top-0 z-50 text-white sticky" ref="navBar">
    <div class="container mx-auto flex flex-col py-4 px-2 md:px-0">
      <div class="w-full flex items-center justify-between">
        <!-- Logo -->
        <div class="text-2xl font-bold text-gray-200">
          ABPay
        </div>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex space-x-8 text-gray-200 font-medium">
          <router-link :to="{ name: 'home' }" class="hover:text-yellow-300">{{ $t('header.primary.home') }}</router-link>
          <router-link :to="{ name: 'business' }" class="hover:text-yellow-300">{{ $t('header.primary.business')
            }}</router-link>
          <router-link :to="{ name: 'home' }" class="hover:text-yellow-300">{{ $t('header.primary.explore')
            }}</router-link>
          <router-link :to="{ name: 'home' }" class="hover:text-yellow-300">{{ $t('header.primary.contact')
            }}</router-link>
        </nav>

        <!-- Login Button -->
        <router-link :to="{ name: 'login' }"
          class="hidden md:inline-block bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
          {{ $t('header.primary.login') }}
        </router-link>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden text-white">
          <Icon v-if="!menuOpen" icon="line-md:close-to-menu-transition" width="24" height="24" />
          <Icon v-else icon="line-md:menu-to-close-transition" width="24" height="24" />
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <div v-if="menuOpen" class="md:hidden bg-white shadow-lg border-t">
      <nav class="flex flex-col px-6 py-4 space-y-4 text-gray-700">
        <router-link :to="{ name: 'home' }" class="hover:text-teal-800">{{ $t('header.primary.home') }}</router-link>
        <router-link :to="{ name: 'business' }" class="hover:text-teal-800">{{ $t('header.primary.business')
          }}</router-link>
        <router-link :to="{ name: 'home' }" class="hover:text-teal-800">{{ $t('header.primary.explore') }}</router-link>
        <router-link :to="{ name: 'home' }" class="hover:text-teal-800">{{ $t('header.primary.contact') }}</router-link>
        <router-link :to="{ name: 'login' }"
          class="md:hidden inline-block bg-teal-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
          {{ $t('header.primary.login') }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { onMounted, ref, onBeforeUnmount } from 'vue'

const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const closeMenu = () => (menuOpen.value = false)

const navBar = ref(null)

const handleScroll = () => {
  if (window.scrollY >= 20) {
    navBar.value.style.cssText = `background:#101828;shadow:0px 2px 2px;`;
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
