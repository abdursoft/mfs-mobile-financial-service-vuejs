<script setup>
import { setTransactionText } from '@/handler/TransactionHandler';
import { useAuthStore } from '@/stores/authStore';
import { watch } from 'vue';


// define stores 
const authStore = useAuthStore();

// define props data 
const props = defineProps({
    title: {
        type: String,
        default: 'Recent Transactions'
    },
    transactions: {
        type: Array,
        default: () => []
    }
})

watch(() => props.transactions, (newVal) => {
    if (newVal && newVal.length > 0) {
        console.log('Transactions updated:', newVal);
    }
}, { immediate: true });
</script>

<template>
    <div class="card rounded-md min-h-[300px] bg-white p-2 relative">
        <div class="w-full">
            <h3 class="text-lg mt-2 font-bold">{{ props.title }} ({{props.transactions.length}})</h3>
            <div class="mt-3 w-full flex items-center flex-col">
                <div class="flex items-center justify-between w-full mt-1" v-for="(transaction, index) in props.transactions" :key="index">
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">{{ authStore.authUser?.id == transaction.from_user_id ? transaction.to_user?.phone : transaction.from_user?.phone }} <span class="text-sm">({{ setTransactionText(transaction,authStore)  }})</span></h2>
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">${{ transaction.amount }}</h2>
                </div>
            </div>
            <div class="w-full mt-5 flex items-center justify-center">
                <router-link :to="{ name: 'dashboard' }"
                class="w-[90%] rounded-md text-center p-3 border-gray-400 border-[1.8px] hover:bg-gray-100">Search Transaction</router-link>
            </div>
        </div>
    </div>
</template>