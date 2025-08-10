<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useTransferStore } from '@/stores/transferStore';
import install from '@/install';
import personImage from '@/assets/avatar.jpg';


// define stores
const transfer = useTransferStore();    
const authStore = useAuthStore();

const {host} = install;

// define props 
const props = defineProps({
    transactions: {
        type: Array,
        default: () => []
    }
});

</script>

<template>
    <div class="card rounded-md shadow-md min-h-[160px] bg-white p-2 relative w-full">
        <div class="w-full">
            <h3 class="text-lg mt-2 font-bold">Recent transfer</h3>
            <div class="mt-3 w-full flex items-start justify-between flex-wrap">
                <template v-for="(transaction, index) in props.transactions" :key="index">
                    <div class="max-w-1/2 my-1" >
                        <button
                            @click="transfer.setToUser(transaction.to_user.phone)"
                            class="border-gray-300 !w-[140px] rounded-md !h-[140px] border-[1.5px] flex items-center justify-center flex-col gap-2 hover:bg-blue-200 cursor-pointer">
                            <img :src="transaction.to_user.image === null ? personImage : host+transaction.to_user.image" alt="abpay" class="!w-[70px] !h-[70px] rounded-full">
                            <h3 class="text-base">{{ transaction.to_user.phone }}</h3>
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>