<template>
    <div class="w-auto px-2 flex items-center gap-3">
        <input @change="$emit('change')" type="checkbox" :id="model" v-model="model">
        <label :for="model" class="my-2">{{ label }}</label>
    </div>
</template>

<script setup>
const emit = defineEmits(['change']);

const model = defineModel({
    type: null,
    default:false,
    required: true,
})

defineProps({
    label: {
        type: String,
    }
});
</script>