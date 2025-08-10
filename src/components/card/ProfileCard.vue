<script setup>
import install from '@/install';

const {host} = install;

import personImage from '@/assets/person.jpg';

// define props variables 
const props = defineProps({
    user: {
        type: Object,
        default: () => ({})
    }
})
console.log(host);
</script>

<template>
    <div class="card rounded-md shadow-md min-h-[300px] bg-white p-2 relative">
        <div class="flex items-center justify-center flex-col h-full">
            <img :src="props?.user?.image === null ? personImage : host+props?.user?.image" :alt="props?.user?.name"
                class="!w-[90px] !h-[90px] rounded-full border-[1.4px] border-gray-300 mt-[50px]" />
            <h3 class="text-xl mt-2 font-bold">{{ props?.user?.name }}</h3>
            <p class="text-base text-gray-600">@{{ props?.user?.role }}</p>
            <router-link :to="{ name: 'dashboard' }"
                class="mt-7 w-[90%] rounded-md text-center p-3 border-gray-400 border-[1.8px] hover:bg-gray-100">Edit
                Profile</router-link>
        </div>
    </div>
</template>