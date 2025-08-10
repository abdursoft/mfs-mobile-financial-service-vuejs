<template>
  <div class="p-3">
    <div class="mb-2 font-medium">{{ title }}</div>
    <div
      class="border-2 border-dashed rounded p-4 text-center cursor-pointer min-h-[260px] flex flex-col items-center gap-2 justify-center"
      @dragover.prevent
      @drop.prevent="onDrop"
      @click="trigger"
    >
      <div v-if="preview">
        <img :src="preview" class="mx-auto max-h-48 object-contain" />
      </div>
      <div v-else class="text-gray-500">Drop or click to choose file • or capture from camera</div>

      <div class="mt-2 flex justify-center gap-2">
        <input ref="fileInput" type="file" :accept="accept" class="hidden" @change="onChange" />
        <button class="px-3 py-1 border rounded" @click.stop.prevent="trigger">Choose</button>
        <button class="px-3 py-1 border rounded" @click.stop.prevent="openCamera">Capture</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  title: String,
  accept: String,
  file: Object,
  preview: String
})
const emit = defineEmits(['select','capture'])
const fileInput = ref(null)

function trigger() {
  fileInput.value.click()
}
function onChange(e) {
  const f = e.target.files?.[0] ?? null
  emit('select', f)
  e.target.value = ''
}

function onDrop(e){
  const f = e.dataTransfer.files?.[0] ?? null
  emit('select', f)
}

async function openCamera(){
  // open camera, capture a photo and return blob
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    // create video to grab frame
    const v = document.createElement('video')
    v.autoplay = true
    v.srcObject = stream
    await new Promise(resolve => v.onloadedmetadata = resolve)
    // draw a frame
    const canvas = document.createElement('canvas')
    canvas.width = v.videoWidth
    canvas.height = v.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(v, 0, 0)
    // stop tracks
    stream.getTracks().forEach(t => t.stop())
    const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.9))
    emit('capture', blob)
  } catch (err) {
    console.error('Camera capture failed', err)
    alert('Could not open camera: ' + (err.message || err))
  }
}
</script>
