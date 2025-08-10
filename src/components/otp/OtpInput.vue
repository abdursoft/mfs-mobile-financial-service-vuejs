<script setup>
import { useSiteStore } from '@/stores/siteStore'
import { ref, watch } from 'vue'
import VOtpInput from 'vue3-otp-input'

// 1. Bind with the parent via `defineModel()`
const model = defineModel()

// 2. Emit event when input is complete
const emit = defineEmits(['inputComplete'])

const siteStore = useSiteStore();

function handleComplete(val) {
    siteStore.setOTP(val);
    emit('inputComplete')   // emit value to parent
}



</script>

<template>
    <v-otp-input v-model:value="model" input-classes="otp-input" :num-inputs="4" separator="-"
        inputType="letter-numeric" :should-auto-focus="true" :should-focus-order="true"
        :placeholder="['*', '*', '*', '*']" @on-complete="handleComplete" />
</template>
