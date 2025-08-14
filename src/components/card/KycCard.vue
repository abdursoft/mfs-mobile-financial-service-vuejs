<script setup>
// define props data 
const props = defineProps({
    idType: {
        type: String,
        default: 'NID'
    },
    idNumber: {
        type: String,
        default: '10******01'
    },
    status: {
        type: String,
        default: 'Pending'
    }
});
</script>

<template>
    <div class="card rounded-md shadow-md min-h-[160px] bg-white p-2 relative mt-5">
        <div class="w-full">
            <h3 class="text-lg mt-2 font-bold">KYC overview</h3>
            <div class="mt-3 w-full flex items-center flex-col">
                <div class="flex items-center justify-between w-full mt-1">
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">ID Type</h2>
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">{{ props.idType.toUpperCase() }}</h2>
                </div>
                <div class="flex items-center justify-between w-full mt-1">
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">ID Number</h2>
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">{{ props.idNumber }}</h2>
                </div>
                <div class="flex items-center justify-between w-full mt-1">
                    <h2 class="text-lg text-gray-500 font-[nunito-header]">Status</h2>
                    <h2 class="text-lg text-gray-500 font-[nunito-header]" :class="props.status == 'approved' ? 'text-green-600' : ''">{{ props.status.toUpperCase() }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>