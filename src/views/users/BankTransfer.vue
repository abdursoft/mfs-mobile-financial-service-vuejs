<script setup>
import TextButton from '@/components/button/TextButton.vue';
import RecentTransactionCard from '@/components/card/RecentTransactionCard.vue';
import InputField from '@/components/input/InputField.vue';
import PhoneField from '@/components/input/PhoneField.vue';
import TransferUser from '@/components/partials/TransferUser.vue';
import { useAuthStore } from '@/stores/authStore';
import { useTransferStore } from '@/stores/transferStore';
import { onMounted, reactive, ref, watch } from 'vue';
import { useToast } from 'vue-toast-notification';


// define stores 
const transfer = useTransferStore();
const authStore = useAuthStore();
const toast = useToast();

// define variables 
const otpToken = ref(null);
const loadingIcon = ref(false);
const formError = ref([]);

const cashInForm = reactive({
    user_phone: '',
    amount: 0,
    pin: ''
});

// check user transfer data
onMounted(async () => {
    await transfer.setTransfer();
});

// define functions 
async function handleSubmit() {
    try {
        loadingIcon.value = true;
        const res = await transfer.cashIn(cashInForm);
        toast.success(res.data.message, { position: 'bottom-right' });
        transfer.setTransfer();
        authStore.isAuth();
    } catch (error) {
        toast.error(error?.response?.data?.message, { position: 'bottom-right' });
    }
    loadingIcon.value = false;
}

watch(() => transfer.toUser, (value) => {
    cashInForm.user_phone = value;
})

function onInput() {
    formError.value = [];
}
function timerEvent() {
    otpToken.value = null;
}

function setToUserPhone(phone) {
    cashInForm.user_phone = phone;
}

</script>
<template>
    <div>
        <TransferUser userRole="user" title="Recent cash in" @setToUser="setToUserPhone"
            :transactions="transfer.transactionSummery?.transfer" />
        <div class="w-full flex items-center justify-between flex-col md:flex-row gap-2">
            <div class="w-full md:w-1/2 rounded-md shadow-md px-2 py-4 bg-white mt-10">
                <!-- register form  -->
                <div class="my-3 flex flex-col items-center justify-center">
                    <h1 class="text-2xl text-center">Bank Transfer</h1>
                    <small class="text-italic text-center text-slate-500">Cash in user wallet and get 0.25% commission</small>
                </div>
                <InputField type="number" min="1" label="Amount" icon="mdi:dollar" :msg="formError?.amount?.[0]"
                    v-model="cashInForm.amount" placeholder="150" />
                <PhoneField v-model="cashInForm.user_phone" label="Phone" :msg="formError?.user_phone?.[0]"
                    @validate="onInput" />
                <InputField type="text" min="4" label="Wallet PIN" icon="ic:outline-fiber-pin"
                    :msg="formError?.pin?.[0]" v-model="cashInForm.pin" placeholder="****" />
                <TextButton title="Send" :type="'button'" :loading="loadingIcon"
                    background="bg-red-500 hover:bg-red-600" @click="handleSubmit" />
            </div>
            <div class="w-full md:w-1/3">
                <RecentTransactionCard :transactions="transfer.transactionSummery?.transactions" />
            </div>
        </div>
    </div>
</template>