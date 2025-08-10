<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import SideBar from '../partials/SideBar.vue';
import { useAuthStore } from '@/stores/authStore';

// import stores
const authStore = useAuthStore();

// define values 
const menuOpen = ref(false);

// toggle sidebar 
function closeOrOpenMenu(value) {
    menuOpen.value = value;
}

</script>
<template>
    <div class="w-full max-w-[1450px]">
        <!-- header component  -->
        <header class="w-full flex items-center justify-between py-3">
            <div class="flex items-center gap-10 ml-2">
                <img src="/abpay.png"
                    alt="abpay" class="w-[50px] h-[50px] rounded-full">
                <Icon  @click="menuOpen = !menuOpen" icon="line-md:menu-unfold-right" width="24" height="24" class="cursor-pointer hidden" />
                <div class="flex items-center gap-3">
                    <router-link :to="{name:'dashboard'}" >Dashboard</router-link>
                    <router-link :to="{name:'transactions'}">Transactions</router-link>
                    <router-link >Activities</router-link>
                    <router-link >My Accounts</router-link>
                    <router-link :to="{name:'kycProcess'}">KYC Process</router-link>
                </div>
            </div>
            <div class="flex items-center gap-4 pr-3">
                <Icon icon="si:notifications-thick-line" width="24" height="24" />
                <Icon icon="hugeicons:settings-01" width="24" height="24" />
                <div class="flex items-center gap-1">
                    <Icon icon="tabler:coin-taka" width="24" height="24" />
                    <span class="text-xl">{{ authStore.authUser?.balance }}</span>
                </div>
            </div>
        </header>
        <SideBar :menu-open="menuOpen" @toggleMenu="closeOrOpenMenu" />
    </div>
</template>