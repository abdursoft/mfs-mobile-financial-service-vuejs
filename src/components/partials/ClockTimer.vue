<template>
  <div class="countdown-timer">
    <p class="text-sm md:text-xl lg:text-2xl" v-if="timeLeft > 0">
      Time left: {{ formattedTime }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Define props at top level
const props = defineProps({
  duration: {
    type: Number,
    default: 180
  }
})

// Emits
const emit = defineEmits(['timeEnd'])

// Reactive state
const timeLeft = ref(props.duration)
let interval = null

// Computed formatted time
const formattedTime = computed(() => {
  const hours = Math.floor(timeLeft.value / 3600)
  const minutes = Math.floor((timeLeft.value % 3600) / 60)
  const seconds = timeLeft.value % 60

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  } else {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
})

// Start countdown
const startCountdown = () => {
  interval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(interval)
      emit('timeEnd', true)
    }
  }, 1000)
}

// Lifecycle hooks
onMounted(() => {
  startCountdown()
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>
