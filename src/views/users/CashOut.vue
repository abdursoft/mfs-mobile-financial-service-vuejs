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

const cashOutForm = reactive({
    user_phone: '',
    amount: 0,
    pin: ''
});



// define functions 
async function handleSubmit() {
    try {
        loadingIcon.value = true;
        const res = await transfer.cashOut(cashOutForm);
        toast.success(res.data.message,{position:'bottom-right'});
        transfer.setTransfer();
        authStore.isAuth(); 
    } catch (error) {
        toast.error(error?.response?.data?.message,{position:'bottom-right'});
    }
    loadingIcon.value = false;
}

watch(() => transfer.toUser,(value) => {
    cashOutForm.user_phone = value;
})

function onInput() {
    formError.value = [];
}
function setToUserPhone(phone) {
    cashOutForm.user_phone = phone;
}



// check user transfer data
onMounted(async () => {
   await transfer.setTransfer();
});

</script>
<template>
    <div>
        <TransferUser title="Recent Cash Out" user-role="agent"  @setToUser="setToUserPhone"  :transactions="transfer.transactionSummery?.transfer" />
        <div class="w-full flex items-center justify-between flex-col md:flex-row gap-2">
            <div class="w-full md:w-1/2 rounded-md shadow-md px-2 py-4 bg-white mt-10">
                <!-- register form  -->
                    <div class="my-3 flex flex-col items-center justify-center">
                        <h1 class="text-2xl text-center">Cash Out</h1>
                        <small class="text-italic text-center text-slate-500">Cash out from agent, charge 5.4%</small>
                    </div>
                    <InputField type="number" min="1" label="Amount" icon="mdi:dollar" :msg="formError?.amount?.[0]"
                        v-model="cashOutForm.amount" placeholder="150" />
                    <PhoneField v-model="cashOutForm.user_phone" label="Agent Phone" :msg="formError?.user_phone?.[0]"
                        @validate="onInput" />
                    <InputField type="text" min="4" label="Wallet PIN" icon="ic:outline-fiber-pin" :msg="formError?.pin?.[0]"
                        v-model="cashOutForm.pin" placeholder="****" />
                    <TextButton title="Send" :type="'button'" :loading="loadingIcon"
                        background="bg-red-500 hover:bg-red-600" @click="handleSubmit" />
            </div>
            <div class="w-full md:w-1/3">
                <RecentTransactionCard :transactions="transfer.transactionSummery?.transactions" />
            </div>
        </div>
    </div>
</template>