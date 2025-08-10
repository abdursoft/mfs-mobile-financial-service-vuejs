<template>
  <div class="flex">
    <!-- sidebar component  -->
    <transition name="slide">
      <aside v-if="isOpen" class="w-64 h-screen bg-white text-slate-600 p-4 fixed top-0 left-0 z-50">
        <Icon icon="line-md:menu-to-close-alt-transition" width="25" height="25"
          class="absolute right-[10px] cursor-pointer" @click="toggleSidebar" />
        <h2 class="text-xl font-bold mb-4">ABPay Portal</h2>
        <div class="space-y-2 flex flex-col gap-2">
          <router-link :to="{ name: 'dashboard' }"
            class="flex items-center gap-2"
            :class="route.name == 'dashboard' ? 'bg-blue-500 text-white px-4 py-2 rounded-[20px] w-full flex items-center' : ''">
            <Icon icon="hugeicons:home-01" width="24" height="24"/> 
            <span>Dashboard</span>
          </router-link>

            <!-- user routes  -->
          <template v-if="authStore.authRole == 'user'">
            <router-link :to="{ name: 'sendMoney' }"
            class="flex items-center gap-2"
              :class="route.name == 'sendMoney' ? 'bg-blue-500 text-white px-4 py-2 rounded-[20px]  w-full flex items-center ' : ''">
              <Icon icon="hugeicons:money-send-square" width="24" height="24" /> 
              <span>Send Money</span>
            </router-link>
            <router-link :to="{ name: 'payment' }"
            class="flex items-center gap-2"
              :class="route.name == 'payment' ? 'bg-blue-500 text-white px-4 py-2 rounded-[20px]  w-full flex items-center ' : ''"><Icon icon="hugeicons:money-send-circle" width="24" height="24"/>
              <span>Payments</span>
             </router-link>
              <router-link :to="{ name: 'cashOut' }"
              class="flex items-center gap-2"
              :class="route.name == 'cashOut' ? 'bg-blue-500 text-white px-4 py-2 rounded-[20px]  w-full flex items-center ' : ''"><Icon icon="hugeicons:dollar-send-01" width="24" height="24" />
              <span>Cash out</span>
            </router-link>
          </template>

          <!-- agent routes  -->
          <template v-if="authStore.authRole == 'agent'">
            <router-link :to="{ name: 'cashIn' }"
            class="flex items-center gap-2"
            :class="route.name == 'cashIn' ? 'bg-blue-500 text-white px-4 py-2 rounded-[20px]  w-full flex items-center ' : ''"><Icon icon="hugeicons:money-receive-square" width="24" height="24" />
            <span>Cash In</span>
          </router-link>
          </template>

          <!-- merchant routes  -->
          <template v-if="authStore.authRole == 'merchant'">
            <router-link :to="{ name: 'register' }"
            class="flex items-center gap-2"
            :class="[route.name == 'store' ? 'bg-blue-500 text-white px-4 py-2 rounded-[20px]  w-full flex items-center ' : '', authStore.authRole == 'merchant' ? '' : 'hidden']">
            <Icon icon="material-symbols-light:storefront-outline-rounded" width="24" height="24" />
            <span>Stores</span>
            </router-link>
            <router-link :to="{ name: 'payment' }"
            class="flex items-center gap-2"
            :class="[route.name == 'payment' ? 'bg-blue-500 text-white px-4 py-2 rounded-[20px]  w-full flex items-center ' : '', authStore.authRole == 'merchant' ? '' : 'hidden']">
            <Icon icon="hugeicons:money-send-circle" width="24" height="24"/>
            <span>Payments</span>
            </router-link>
          </template>

          <router-link :to="{ name: 'settings' }"
          class="flex items-center gap-2"
            :class="[route.name == 'settings' ? 'bg-blue-500 text-white px-4 py-2 rounded-[20px]  w-full flex items-center ' : '']"><Icon icon="hugeicons:settings-03" width="24" height="24" />
            <span>Settings</span>
          </router-link>
          
        </div>
      </aside>
    </transition>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useSiteStore } from '@/stores/siteStore';
import { Icon } from '@iconify/vue';
import { ref, watch, defineProps } from 'vue';
import { useRoute } from 'vue-router';

// emits 
const emit = defineEmits(['toggleMenu']);

// Props
const props = defineProps({
  menuOpen: {
    type: Boolean,
    default: false,
    required: true,
  },
});

// define route and stores 
const route = useRoute();
const authStore = useAuthStore();
const siteStore = useSiteStore();


// Reactive state
const isOpen = ref(props.menuOpen);

// Watch for prop changes (sync external changes to local state)
watch(() => props.menuOpen, (newVal) => {
  isOpen.value = newVal;
});

// Toggle function
function toggleSidebar() {
  isOpen.value = !isOpen.value;
  siteStore.setLayout(isOpen.value);
  emit('toggleMenu', isOpen.value);
}
</script>


<style scoped>
/* Transition animation */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
