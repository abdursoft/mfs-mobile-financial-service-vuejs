<template>
    <div class="w-full flex items-center justify-between mb-3 border-b-[0.6px] border-gray-300 py-2">
        <router-link v-if="$route.name !== 'merchantApp'" :to="{ name: 'merchantApp' }" class="bg-red-500 text-white py-2 px-3 rounded-md shadow-md hover:bg-red-400 delay-30">Back</router-link>
        <span></span>
        <router-link v-if="$route.name !== 'addMerchantApp'" :to="{ name: 'addMerchantApp' }" class="bg-red-500 text-white py-2 px-3 rounded-md shadow-md hover:bg-red-400 delay-30">Create App</router-link>
    </div>
</template>