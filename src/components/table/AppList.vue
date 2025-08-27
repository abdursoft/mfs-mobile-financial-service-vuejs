<template>
  <div class="p-6 bg-slate-50 rounded-lg shadow-sm mt-3">
    <h2 class="text-xl font-semibold mb-4">Merchant APP</h2>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row items-center md:items-end gap-3 mb-4">
      <div class="flex items-center gap-2">
        <label class="text-sm">From</label>
        <input v-model="filters.from" type="date" class="border rounded px-2 py-1" />
      </div>
      <div class="flex items-center gap-2">
        <label class="text-sm">To</label>
        <input v-model="filters.to" type="date" class="border rounded px-2 py-1" />
      </div>

      <div class="flex items-center gap-2 flex-1">
        <label class="text-sm">APP</label>
        <input v-model="filters.txn" type="text" placeholder="Search transaction id" class="border rounded px-2 py-1 w-full" />
      </div>

      <div class="flex items-center gap-2">
        <label class="text-sm">Per page</label>
        <select v-model.number="perPage" class="border rounded px-2 py-1">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </div>

      <div>
        <button @click="resetFilters" class="bg-red-500 text-white px-3 py-1 rounded">Reset</button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
            <th class="px-4 py-2 text-right text-sm font-medium text-gray-700">App Name</th>
            <th class="px-4 py-2 text-right text-sm font-medium text-gray-700">Image</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Type</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Secret Key</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Public Key</th>
            <th class="px-4 py-2 text-right text-sm font-medium text-gray-700">Status</th>
            <th class="px-4 py-2 text-right text-sm font-medium text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="tx in paginated" :key="tx.id" class="hover:bg-gray-50">
            <td class="px-4 py-3 text-sm text-gray-700">{{ formatDate(tx?.created_at ?? tx.date) }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ tx.app_name }}</td>
            <td class="px-4 py-3 text-sm text-gray-700"><img :src="tx.app_logo" :alt="tx.app_name" class="w-[50px] h-[50px]"></td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ tx.app_type }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ tx.secret_key.substr(0,20) }}</td>
            <td class="px-4 py-3 text-sm text-right text-gray-800">{{ tx.public_key.substr(0,20) }}</td>
            <td class="px-4 py-3 text-sm text-right text-gray-800">{{ tx?.status ?? 'Pending' }}</td>
            <td class="px-4 py-3 text-sm text-right text-gray-800"><button title="Delete" @click="merchantStore.deleteStore(tx.id)" class="bg-red-400 hover:bg-red-600 text-white py-2 px-3 rounded-md shadow-md cursor-pointer">Delete</button></td>
          </tr>
          <tr v-if="paginated.length === 0">
            <td colspan="5" class="px-4 py-6 text-center text-sm text-gray-500">No apps found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4">
      <div class="hidden md:block text-sm text-gray-600">Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ filtered.length }}</span> transactions</div>

      <div class="flex items-center gap-2">
        <button @click="goPage(1)" :disabled="page === 1" class="hidden md:block px-2 py-1 rounded border disabled:opacity-50"> {{ '<<' }} </button>
        <button @click="prev" :disabled="page === 1" class="px-3 py-1 rounded border disabled:opacity-50">Prev</button>

        <template v-for="p in pageNumbers" :key="p">
          <button @click="goPage(p)" :class="['px-3 py-1 rounded border', { 'bg-blue-500 text-white': p === page }]">{{ p }}</button>
        </template>

        <button @click="next" :disabled="page === lastPage" class="px-3 py-1 rounded border disabled:opacity-50">Next</button>
        <button @click="goPage(lastPage)" :disabled="page === lastPage" class="hidden md:block px-2 py-1 rounded border disabled:opacity-50">{{ '>>' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMerchantStore } from '@/stores/merchantStore';
import { ref, computed, watch } from 'vue'

// define Stores
const merchantStore = useMerchantStore();
merchantStore.getStores();

const perPage = ref(10)
const page = ref(1)
const filters = ref({ from: '', to: '', txn: '' })

const raw = ref(merchantStore?.stores || []);

watch(() => merchantStore?.stores, (newTransactions) => {
  raw.value = newTransactions || [];
  page.value = 1; // reset to first page on data change
}, { immediate: true })

// Filtering logic
const filtered = computed(() => {
  const f = filters.value
  let list = raw.value.slice()

  // filter by txn id (case-insensitive, partial)
  if (f.txn && f.txn.trim() !== '') {
    const q = f.txn.trim().toLowerCase()
    list = list.filter(x => x.txn_id.toLowerCase().includes(q))
  }

  // filter by date range
  if (f.from) {
    const from = new Date(f.from)
    list = list.filter(x => new Date(x.date) >= from)
  }
  if (f.to) {
    const to = new Date(f.to)
    // include entire day
    to.setHours(23,59,59,999)
    list = list.filter(x => new Date(x.date) <= to)
  }

  return list
})

// Pagination
const lastPage = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage.value)))

watch([perPage, filtered], () => {
  // reset to page 1 if current page exceeds last
  if (page.value > lastPage.value) page.value = lastPage.value
})

const startIndex = computed(() => (page.value - 1) * perPage.value)
const endIndex = computed(() => Math.min(page.value * perPage.value, filtered.value.length))
const paginated = computed(() => filtered.value.slice(startIndex.value, endIndex.value))

function prev() { if (page.value > 1) page.value-- }
function next() { if (page.value < lastPage.value) page.value++ }
function goPage(p) { page.value = Math.min(Math.max(1, p), lastPage.value) }

const pageNumbers = computed(() => {
  const total = lastPage.value
  const current = page.value
  const delta = 2 // how many pages around current
  const range = []
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i)
  }
  // optionally show first/last pages if far away
  if (range[0] !== 1) range.unshift('...')
  if (range[range.length-1] !== total) range.push('...')
  return range
})

function resetFilters() {
  filters.value = { from: '', to: '', txn: '' }
  page.value = 1
}

function formatDate(d) {
  const dt = new Date(d)
  return dt.toLocaleDateString()
}

function formatNumber(n) {
  return Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<style scoped>
/* tiny tweak for disabled buttons */
button[disabled] { cursor: not-allowed }
</style>
