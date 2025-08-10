<script setup>
import { Icon } from '@iconify/vue';


// define routes and name 
const myRoutes = [
    {
        name: 'sendMoney',
        icon: 'hugeicons:money-send-circle',
        label: 'Send Money',
        role: 'user'
    },
    {
        name: 'payment',
        icon: 'hugeicons:money-send-02',
        label: 'Payment',
        role: 'user'
    },
    {
        name: 'cashOut',
        icon: 'streamline-freehand:money-cash-bill',
        label: 'Cash Out',
        role: 'user'
    },
    {
        name: 'cashIn',
        icon: 'hugeicons:money-receive-02',
        label: 'Cash In',
        role: 'agent'
    },
    {
        name: 'dashboard',
        icon: 'hugeicons:dollar-send-01',
        label: 'Top UP',
        role: 'auth'

    },
    {
        name: 'cashIn',
        icon: 'circum:bank',
        label: 'Bank Transfer',
        role: 'auth'
    },
]

// define auth props 
const authProps = defineProps({
    authUser: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="card rounded-md min-h-[160px] relative w-full">
        <div class="w-full">
            <h3 class="text-lg font-bold">Transaction Methods</h3>
            <div class="mt-3 w-full flex items-start justify-between flex-wrap">
                <div class="max-w-1/2 my-1" v-for="(item, index) in myRoutes" :key="index">
                    <router-link :to="{ name: item.name }"
                        class="border-gray-300 w-[140px] h-[140px] rounded-md border-[1.5px] flex items-center justify-center flex-col gap-2 hover:bg-blue-200">
                        <Icon :icon="item.icon" class="w-[50px] h-[50px]" />
                        <h3 class="text-base">{{ item.label }}</h3>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>