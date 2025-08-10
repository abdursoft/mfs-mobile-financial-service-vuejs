<template>
  <div class="p-1 w-full">
    <label class="my-2">{{ label }}</label>
    <div class="w-full relative">
      <vue-tel-input @validate="$emit('onInput')" v-model="model" class="w-full rounded-[12px] p-3 border border-black-500 pr-[5px]"></vue-tel-input>
    </div>
    <div class="small-text text-red-500" v-if="msg">{{ msg }}</div>
  </div>
</template>

<script setup>
const emit = defineEmits(['onInput']);

const model = defineModel({
  type: null,
  required: true,
})

defineProps({
  label: {
    type: String,
  },
  msg: String
});
</script>