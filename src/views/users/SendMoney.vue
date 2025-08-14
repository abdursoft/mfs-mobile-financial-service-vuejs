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

const moneyTransferForm = reactive({
    to_phone: '',
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
        const res = await transfer.sendMoney(moneyTransferForm);
        toast.success(res.data.message, { position: 'bottom-right' });
        transfer.setTransfer();
        authStore.isAuth();
    } catch (error) {
        toast.error(error?.response?.data?.message, { position: 'bottom-right' });
    }
    loadingIcon.value = false;
}

watch(() => transfer.toUser, (value) => {
    moneyTransferForm.to_phone = value;
})

function onInput() {
    formError.value = [];
}
function timerEvent() {
    otpToken.value = null;
}

function setToUserPhone(phone) {
    moneyTransferForm.to_phone = phone;
}

</script>
<template>
    <div>
        <TransferUser userRole="user" @setToUser="setToUserPhone"
            :transactions="transfer.transactionSummery?.transfer" />
        <div class="w-full flex items-center justify-between flex-col md:flex-row gap-2">
            <div class="w-full md:w-1/2 rounded-md shadow-md px-2 py-4 bg-white mt-10">
                <!-- register form  -->
                <div class="my-3 flex flex-col items-center justify-center">
                    <h1 class="text-2xl text-center">Send Money</h1>
                    <small class="text-italic text-center text-slate-500">Send money in a second without any
                        fees</small>
                </div>
                <InputField type="number" min="1" label="Amount" icon="mdi:dollar" :msg="formError?.amount?.[0]"
                    v-model="moneyTransferForm.amount" placeholder="150" />
                <PhoneField v-model="moneyTransferForm.to_phone" label="Phone" :msg="formError?.to_phone?.[0]"
                    @validate="onInput" />
                <InputField type="text" min="4" label="Wallet PIN" icon="ic:outline-fiber-pin"
                    :msg="formError?.pin?.[0]" v-model="moneyTransferForm.pin" placeholder="****" />
                <TextButton title="Send" :type="'button'" :loading="loadingIcon"
                    background="bg-red-500 hover:bg-red-600" @click="handleSubmit" />
            </div>
            <div class="w-full md:w-1/3">
                <RecentTransactionCard :transactions="transfer.transactionSummery?.transactions" />
            </div>
        </div>
    </div>
</template>