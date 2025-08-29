<script setup>
import TextButton from '@/components/button/TextButton.vue';
import InputField from '@/components/input/InputField.vue';
import { usePaymentStore } from '@/stores/paymentStore';
import { Icon } from '@iconify/vue';
import { reactive } from 'vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import VOtpInput from 'vue3-otp-input';

const route = useRoute();

const walletStage = ref(true);
const OTPStage = ref(false);
const PinStage = ref(false);
const paymentForm = reactive({
    phone:'',
    otp:'',
    pin:''
});

const payment = usePaymentStore();


const otpInput = ref(null);

const handleOnComplete = (value) => {
    paymentForm.otp = value;
};

async function createPayment(){
   const res = await payment.initPayment(route.query?.paymentID,{
            phone: paymentForm.phone
        });

    if(res?.status == 200 || res?.status == 201){
        walletStage.value = false;
        OTPStage.value = true;
        PinStage.value = false;
    }
}

async function OTPProcess() {
    const res = await payment.verifyOTP({
        otp: paymentForm.otp
    });

    if(res?.status == 200 || res?.status == 201){
        walletStage.value = false;
        OTPStage.value = false;
        PinStage.value = true;
    }
}

async function checkOut(){
    const res = await payment.verifyPIN({
        pin: paymentForm.pin
    })
    if(res?.status == 200 || res?.status == 201){
        walletStage.value = true;
        OTPStage.value = false;
        PinStage.value = false;

        let inNumber = 0;
        setInterval(() => {
            inNumber++;
            if(inNumber >= 3){
                window.location.href = res.data.callback_url;
            }
        },500)
    }
}

onMounted(() => {
    payment.getMerchant(route.query?.paymentID);
})

</script>



<template>
    <div class="w-screen h-screen bg-gray-100 flex items-center justify-center p-3">
        <div
            class="w-full md:max-w-[40%] lg:max-w-[24%] rounded-[18px] shadow-lg py-8 px-3 min-h-[600px] bg-gradient-to-r from-teal-50 via-cyan-100 to-teal-200 p-6 rounded-2xl shadow-lg max-w-sm mx-auto">
            <div class="w-full flex items-center justify-center mb-3 flex-col">
                <img src="http://localhost:5173/abpay.png" alt="" class="w-[80px] h-[80px] rounded-full mb-3">
                <h1 class="text-xl md:text-2xl mb-5">ABPay Payment</h1>
            </div>
            <div class="w-full rounded-md shadow-md bg-teal-100 p-3 flex items-center justify-between">
                <div>
                    <div class="w-full flex items-center gap-2">
                        <img :src="payment.merchant?.app_logo" alt="" class="w-[40px] h-[40px] rounded-full">
                        <h3 class="text-lg md:text-xl text-center">{{ payment.merchant?.app_name }}</h3>
                    </div>
                    <h3 class="text-sm">Invoice : {{ route.query?.paymentID }}</h3>
                </div>
                <h3 class="text-base md:text-lg">Amount : {{ payment.merchant?.currency +' '+payment.merchant?.amount }}</h3>
            </div>
            <div class="mt-5 py-5" v-if="walletStage">
                <p class="mb-2 text-base text-center">Enter your wallet number</p>
                <InputField class="text-center" placeholder="e.g 01XXXXXXXXX" v-model="paymentForm.phone" />
                <p class="mb-2 text-sm text-center">By clicking on NEXT, you're agreeing to the terms and conditions</p>

                <div class="w-full flex items-center justify-between">
                    <TextButton title="CLOSE"
                        background="bg-slate-500 text-white !rounded-[0px] cursor-pointer w-full hover:bg-slate-600" />
                    <TextButton title="NEXT"
                        background="bg-teal-700 text-white !rounded-[0px] cursor-pointer w-full hover:bg-teal-800" :loading="payment.loadingIcon" @click="createPayment" />
                </div>
            </div>
            <div class="mt-5 py-5" v-if="OTPStage">
                <p class="mb-2 text-base text-center">Enter OTP code</p>
                <div class="flex items-center justify-center mb-3">
                    <v-otp-input
                        ref="otpInput"
                        input-classes="otp-input"
                        :conditionalClass="['one', 'two', 'three', 'four','five','six']"
                        separator="-"
                        inputType="numeric"
                        :num-inputs="6"
                        v-model:value="bindValue"
                        :should-auto-focus="true"
                        :should-focus-order="true"
                        @on-complete="handleOnComplete"
                        :placeholder="['*', '*', '*', '*','*','*']"
                    />
                </div>
                <p class="mb-2 text-sm text-center">Don't share your OTP and PIN with anybody</p>

                <div class="w-full flex items-center justify-between">
                    <TextButton title="CANCEL"
                        background="bg-slate-500 text-white !rounded-[0px] cursor-pointer w-full hover:bg-slate-600" />
                    <TextButton title="NEXT"
                        background="bg-teal-700 text-white !rounded-[0px] cursor-pointer w-full hover:bg-teal-800" @click="OTPProcess" />
                </div>
            </div>
            <div class="mt-5 py-5" v-if="PinStage">
                <p class="mb-2 text-base text-center">Enter your wallet PIN</p>
                <InputField class="text-center" placeholder="e.g 9251" v-model="paymentForm.pin" />
                <p class="mb-2 text-sm text-center">Don't share your OTP and PIN with anybody</p>

                <div class="w-full flex items-center justify-between">
                    <TextButton title="CANCEL"
                        background="bg-slate-500 text-white !rounded-[0px] cursor-pointer w-full hover:bg-slate-600" />
                    <TextButton title="PAY"
                        background="bg-teal-700 text-white !rounded-[0px] cursor-pointer w-full hover:bg-teal-800" @click="checkOut" />
                </div>
            </div>
            <p class="mt-3 text-center" v-if="!payment.paymentStatus">ABPay is a mobile financial service by ABDURSOFT</p>
            <div class="flex items-center justify-center gap-3" v-else>
                <p class="text-center">Please wait, redirecting to your merchant website</p>
                <Icon icon="svg-spinners:3-dots-bounce" width="24" height="24" class="text-red-600" />
            </div>
        </div>
    </div>
</template>