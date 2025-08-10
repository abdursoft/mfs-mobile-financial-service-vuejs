<template>
  <div>
    <div
      class="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
      :class="isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'"
      @dragover.prevent="onDragOver"
      @dragenter.prevent="onDragEnter"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      @click="fileInput.click()"
    >
      <input
        ref="fileInput"
        class="hidden"
        type="file"
        :multiple="multiple"
        @change="onFileInputChange"
      />
      <div class="flex flex-col items-center gap-2">
        <svg class="w-12 h-12 opacity-60" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 15v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 10l5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="text-lg font-medium">Drop files here or click to browse</div>
        <div class="text-sm text-gray-500">Supports images, pdf; max 10MB per file (configurable)</div>
      </div>
    </div>

    <!-- Files list -->
    <ul class="mt-4 space-y-3">
      <li v-for="(f, idx) in files" :key="f.id" class="flex gap-3 items-center">
        <div class="w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
          <img v-if="f.preview && isImage(f.file)" :src="f.preview" class="object-cover w-full h-full" />
          <svg v-else class="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 15v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="flex-1">
          <div class="flex justify-between">
            <div class="font-medium text-sm truncate" :title="f.file.name">{{ f.file.name }}</div>
            <div class="text-xs text-gray-500">{{ humanFileSize(f.file.size) }}</div>
          </div>

          <div class="mt-2">
            <div class="h-2 bg-gray-200 rounded overflow-hidden">
              <div
                class="h-full bg-green-500"
                :style="{ width: f.progress + '%' }"
                v-if="f.progress > 0"
              ></div>
            </div>
            <div class="text-xs text-gray-600 mt-1 flex items-center gap-2">
              <span v-if="f.status==='idle'">Queued</span>
              <span v-if="f.status==='uploading'">Uploading — {{ f.progress }}%</span>
              <span v-if="f.status==='done'">Uploaded</span>
              <span v-if="f.status==='error'" class="text-red-600">Error</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            v-if="f.status === 'uploading'"
            class="text-sm px-3 py-1 rounded border"
            @click="cancelUpload(f)"
          >
            Cancel
          </button>

          <button
            v-if="f.status === 'error' || f.status === 'idle'"
            class="text-sm px-3 py-1 rounded bg-blue-600 text-white"
            @click="uploadFile(f)"
          >
            Upload
          </button>

          <button class="text-sm px-3 py-1 rounded border" @click="removeFile(idx)">Remove</button>
        </div>
      </li>
    </ul>

    <div class="mt-4 flex gap-2">
      <button class="px-4 py-2 rounded bg-green-600 text-white" @click="uploadAll" :disabled="isUploading">
        Upload All
      </button>
      <button class="px-4 py-2 rounded border" @click="clearAll" :disabled="isUploading">Clear</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import axios from 'axios'

// Props / config (tweak these or expose as props)
const multiple = true
const maxFileSize = 10 * 1024 * 1024 // 10 MB
const allowedTypes = ['image/png','image/jpeg','image/jpg','application/pdf']
// Backend endpoint
const uploadUrl = '/api/upload' // change to your endpoint

const fileInput = ref(null)
const isDragging = ref(false)
let seq = 0

const files = reactive([]) // each item: { id, file, preview, progress, status, cancelToken }

function onDragOver(e){ e.dataTransfer.dropEffect = 'copy' }
function onDragEnter(){ isDragging.value = true }
function onDragLeave(){ isDragging.value = false }
function onDrop(e){
  isDragging.value = false
  const dropped = Array.from(e.dataTransfer.files)
  handleFiles(dropped)
}

function onFileInputChange(e){
  const selected = Array.from(e.target.files || [])
  handleFiles(selected)
  // reset input so same file can be re-selected
  e.target.value = ''
}

function handleFiles(list){
  for (const file of list){
    if (!validateFile(file)) continue
    const id = ++seq
    const item = {
      id,
      file,
      progress: 0,
      status: 'idle', // idle | uploading | done | error
      preview: null,
      cancelSource: null,
    }
    if (isImage(file)) {
      item.preview = URL.createObjectURL(file)
    }
    files.push(item)
  }
}

function validateFile(file){
  if (file.size > maxFileSize){
    alert(`${file.name} is too large (max ${humanFileSize(maxFileSize)})`)
    return false
  }
  if (allowedTypes.length && !allowedTypes.includes(file.type)){
    alert(`${file.name} has unsupported type: ${file.type}`)
    return false
  }
  return true
}

function isImage(file){
  return file.type.startsWith('image/')
}
function humanFileSize(size){
  if (size === 0) return '0 B'
  const i = Math.floor(Math.log(size) / Math.log(1024))
  const sizes = ['B','KB','MB','GB','TB']
  return (size / Math.pow(1024, i)).toFixed( i ? 1 : 0 ) + ' ' + sizes[i]
}

const isUploading = computed(()=> files.some(f => f.status === 'uploading'))

async function uploadFile(item){
  if (item.status === 'uploading') return
  item.status = 'uploading'
  item.progress = 0

  const form = new FormData()
  form.append('file', item.file)
  // append other fields if needed, e.g. user id, folder, etc.

  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  item.cancelSource = source

  try {
    const res = await axios.post(uploadUrl, form, {
      headers: {'Content-Type': 'multipart/form-data'},
      cancelToken: source.token,
      onUploadProgress(progressEvent){
        if (progressEvent.lengthComputable) {
          item.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }
      },
    })
    item.status = 'done'
    item.progress = 100
    // optionally store server response: item.response = res.data
  } catch (err) {
    if (axios.isCancel(err)) {
      item.status = 'idle'
      item.progress = 0
      // canceled by user
    } else {
      console.error(err)
      item.status = 'error'
    }
  } finally {
    item.cancelSource = null
  }
}

function cancelUpload(item){
  if (item.cancelSource) {
    item.cancelSource.cancel('User cancelled upload')
  }
}

function removeFile(index){
  const item = files[index]
  if (item && item.preview) URL.revokeObjectURL(item.preview)
  if (item && item.cancelSource) item.cancelSource.cancel('Removed')
  files.splice(index, 1)
}

function clearAll(){
  files.forEach(f => { if (f.preview) URL.revokeObjectURL(f.preview) })
  files.splice(0, files.length)
}

function uploadAll(){
  // start uploads sequentially or in parallel
  // here we do parallel but cap concurrency if needed
  for (const f of files){
    if (f.status === 'idle' || f.status === 'error') uploadFile(f)
  }
}
</script>

<style scoped>
/* Minimal extra styling if not using Tailwind */
.border-dashed { border-style: dashed; }
</style>
