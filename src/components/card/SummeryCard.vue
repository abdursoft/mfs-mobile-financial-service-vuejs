<script setup>
// transactions props 
const props = defineProps({
    transactions: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="card rounded-md shadow-md min-h-[300px] bg-white p-2 relative mt-5">
        <div class="w-full">
            <h3 class="text-lg mt-2 font-bold">Transaction overview</h3>
            <div class="mt-3 w-full flex items-center flex-col">
                <div class="flex items-center justify-between w-full mt-1">
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">Send Money</h2>
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">${{ props.transactions?.send }}</h2>
                </div>
                <div class="flex items-center justify-between w-full mt-1">
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">Received Money</h2>
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">${{ props.transactions?.receive }}</h2>
                </div>
                <div class="flex items-center justify-between w-full mt-1">
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">Payments</h2>
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">${{ props.transactions?.payment }}</h2>
                </div>
                <div class="flex items-center justify-between w-full mt-1">
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">Cash Out</h2>
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">${{ props.transactions?.cash_out }}</h2>
                </div>
                <div class="flex items-center justify-between w-full mt-1">
                    <h2 class="text-lg text-gray-500 font-[Ubuntu-medium]">Cash In</h2>
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">${{ props.transactions?.cash_in }}</h2>
                </div>
            </div>
            <div class="w-full mt-5 flex items-center justify-center">
                <router-link :to="{ name: 'dashboard' }"
                class="w-[90%] rounded-md text-center p-3 border-gray-400 border-[1.8px] hover:bg-gray-100">Search Transaction</router-link>
            </div>
        </div>
    </div>
</template>