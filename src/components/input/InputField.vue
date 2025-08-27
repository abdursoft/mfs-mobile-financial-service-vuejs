<template>
  <div class="p-1 w-full">
    <label class="my-2">{{ label }}</label>
    <div class="w-full relative mt-1">
      <input :type="type" v-model="model" :placeholder="placeholder"
        class="w-full rounded-[12px] p-3 border border-black-500 pr-[35px] text-left" />
      <Icon :icon="icon" @click="$emit('click')" class="absolute -top-[2px] right-1 h-full w-[30px] cursor-pointer" />
    </div>
    <div class="small-text text-red-500" v-if="msg">{{ msg }}</div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

const emit = defineEmits(['click']);

const model = defineModel({
  type: null,
  required: true,
})

defineProps({
  label: {
    type: String,
  },
  type: {
    type: String,
    default: 'text'
  },
  icon: {
    type: String,
  },
  placeholder: String,
  msg: String
});
</script>