<script setup>
import install from '@/install';
import personImage from '@/assets/avatar.jpg';

// callback emit function 
const emit = defineEmits(['setToUser']);

const {host} = install;

// define props 
const props = defineProps({
    title: {
        type: String,
        default: 'Recent Transfer'
    },
    userRole: {
        type: String,
        default: 'user'
    },
    transactions: {
        type: Array,
        default: () => []
    }
});

</script>

<template>
    <div class="card rounded-md shadow-md min-h-[160px] bg-white p-2 relative w-full">
        <div class="w-full">
            <h3 class="text-lg mt-2 font-bold">{{ props.title }}</h3>
            <div class="mt-3 w-full flex items-start flex-wrap gap-5">
                <template v-for="(transaction, index) in props.transactions" :key="index">
                    <div class="max-w-1/2 my-1" v-if="transaction.to_user?.role == props.userRole">
                        <button
                            @click="emit('setToUser',transaction.to_user.phone)"
                            class="border-gray-300 !w-[140px] rounded-md !h-[140px] border-[1.5px] flex items-center justify-center flex-col gap-2 hover:bg-blue-200 cursor-pointer">
                            <img :src="transaction.to_user.image === null ? personImage : host+transaction.to_user.image" alt="abpay" class="!w-[70px] !h-[70px] rounded-full">
                            <div class="text-center flex flex-col items-center">
                                <h3 class="text-base">{{ transaction.to_user.phone }}</h3>
                                <p class="text-sm">{{ transaction.to_user.name }}</p>
                            </div>
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>