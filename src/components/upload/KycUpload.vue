<template>
  <div class="w-full max-w-5xl mx-auto p-4">
    <h2 class="text-xl font-semibold mb-4">NID Upload (Front & Back)</h2>

    <div class="flex items-center gap-2 flex-col md:flex-row">
      <UploadCard
        title="Front Side"
        accept="image/*"
        :file="front.file"
        :preview="front.preview"
        @select="onSelect('front', $event)"
        @capture="onCapture('front', $event)"
      />
      <UploadCard
        title="Back Side (barcode)"
        accept="image/*"
        :file="back.file"
        :preview="back.preview"
        @select="onSelect('back', $event)"
        @capture="onCapture('back', $event)"
      />
    </div>

    <div class="mt-4 flex gap-3 p-3">
      <button class="px-4 py-2 bg-green-600 text-white rounded" :disabled="isUploading" @click="submit">
        Submit
      </button>
      <button class="px-4 py-2 border rounded" @click="clearAll" :disabled="isUploading">Clear</button>
    </div>

    <div class="mt-4 p-4">
      <h3 class="font-medium">Scan Result</h3>
      <pre v-if="scanResult">{{ JSON.stringify(scanResult, null, 2) }}</pre>
      <div v-else class="text-sm text-gray-500">No barcode scanned yet.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'
import UploadCard from './UploadCard.vue'
import { KYC } from '@/server/Api'
import apiClient from '@/service/axios'

const front = reactive({ file: null, preview: null })
const back  = reactive({ file: null, preview: null })

const scanResult = ref(null)
const isUploading = ref(false);

// ZXing reader instance (single)
const reader = new BrowserMultiFormatReader()

// select file event 
function onSelect(which, file) {
  if (!file) return
  const obj = which === 'front' ? front : back
  obj.file = file
  if (obj.preview) URL.revokeObjectURL(obj.preview)
  obj.preview = URL.createObjectURL(file)

  // if back selected, try client-side scan
  if (which === 'back') attemptClientScan(file)
}

// image capture 
function onCapture(which, blob) {
  // blob from camera capture (File)
  const file = new File([blob], `capture-${which}.jpg`, { type: blob.type })
  onSelect(which, file)
}

// get nid text 
async function attemptClientScan(file) {
  console.log('scanning start');
  scanResult.value = null;
  const img = document.createElement('img');
  try {
    img.src = URL.createObjectURL(file);
    await img.decode();

    const result = await reader.decodeFromImageElement(img); // ensure `await` is here

    if (result) {
      scanResult.value = {
        text: result.text,      // <-- fixed
        format: result.format   // <-- fixed
      };
    //   scanResult.value = {
    //     ID:extractField('pin',result.text),
    //     Name:extractField('name',result.text),
    //     DOB:extractField('dob',result.text)
    //   }

      return;
    }
  } catch (err) {
    if (err instanceof NotFoundException) {
      console.log('No barcode found client-side');
    } else {
      console.warn('ZXing client decode error', err);
    }
  } finally {
    URL.revokeObjectURL(img.src);
  }
}

// sanitize NID text 
function extractField(subjectKey, text) {
  // Create a regex that matches: <subjectKey>value</subjectKey> or key: value
  const regex = new RegExp(`<${subjectKey}>(.*?)<\\/${subjectKey}>`, 'i');
  const match = text.match(regex);
  
  if (match) {
    return match[1].trim();
  }
  
  // Fallback: search for "key: value" format
  const regexAlt = new RegExp(`${subjectKey}\\s*[:=]\\s*(.+)`, 'i');
  const matchAlt = text.match(regexAlt);
  
  return matchAlt ? matchAlt[1].trim() : null;
}

// clear all form data 
function clearAll(){
  if (front.preview) URL.revokeObjectURL(front.preview)
  if (back.preview) URL.revokeObjectURL(back.preview)
  front.file = front.preview = null
  back.file = back.preview = null
  scanResult.value = null
}

// form submit 
async function submit(){
  if (!front.file || !back.file) {
    alert('Please provide both front and back images')
    return
  }

  isUploading.value = true

  const form = new FormData()
  form.append('user_image', front.file)
  form.append('document_front_image', front.file)
  form.append('document_back_image', back.file)
  form.append('document_type','nid');
  form.append('document_number', '1027265436');
  // If client scanned barcode, send it
  if (scanResult.value) form.append('client_barcode', scanResult.value.text)

  try {
    const res = await apiClient.post(KYC.UPLOAD, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    // server returns parsed barcode/fields and stored paths
    const data = res.data
    if (data.success) {
      alert('Upload successful')
      scanResult.value = data.barcode_data || scanResult.value
    } else {
      alert('Upload failed: ' + (data.message || 'unknown'))
    }
  } catch (err) {
    console.error(err)
    alert('Upload error')
  } finally {
    isUploading.value = false
  }
}
</script>
