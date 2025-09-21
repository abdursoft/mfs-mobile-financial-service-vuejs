<script setup>

const props = defineProps({
    title:{
        String,
        require:true
    }
})
</script>
<template>
    <div class="w-auto flex items-center justify-start gap-3" data-aos="fade-right">
        <span class="w-[40px] h-[3px] bg-gray-400"></span>
        <h3 class="text-xl md:text-2xl">{{ props?.title }}</h3>
    </div>
</template>