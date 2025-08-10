<script setup>
import TextButton from '@/components/button/TextButton.vue';
import { AUTH } from '@/server/Api';
import apiClient from '@/service/axios';
import { ref, reactive, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useAuthStore } from '@/stores/authStore';
import OtpInput from '@/components/otp/OtpInput.vue';
import { useSiteStore } from '@/stores/siteStore';
import router from '@/router';

const loadingIcon = ref(false);
const walletToken = ref(null);

const toast = useToast();

const authStore = useAuthStore();
const siteStore = useSiteStore();

const registerForm = reactive({
    phone: '',
    name: '',
    otp: ''
});


// check otp is available 
function checkWalletToken() {
    walletToken.value = authStore.walletToken ?? localStorage.getItem('walletToken');
}

// otp verification 
async function setPin() {
    try {
        loadingIcon.value = true;
        const res = await apiClient.post(AUTH.SET_PIN, { pin: siteStore.OTP }, {
            headers: {
                'walletToken': walletToken.value
            }
        });
        authStore.setWalletToken(null);
        localStorage.removeItem('walletToken');
        toast.success(res.data.message);
        router.push({name:'login'});
    } catch (error) {
        toast.error(error?.response.data?.message, { position: 'bottom-right' });
        router.push({name:'register',query:{sendOTP:'true'}})
    }
    loadingIcon.value = false;
}

onMounted(() => {
    checkWalletToken();

    if(!walletToken.value){
        router.push({name:'login'})
    }
})

</script>

<template>
    <main class="p-2 h-screen flex flex-col justify-center items-center">
        <div class="flex items-center justify-center text-center flex-col mb-5">
            <img src="/abpay.png" alt="abpay" class="w-[90px] h-[90px]">
            <h3 class="text-2xl">Welcome</h3>
            <p class="mt-2 text-slate-600 text-base">Welcome to ABPay PGW Integration Platform</p>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 rounded-md shadow-md px-2 py-4 bg-white">
            <!-- register form  -->
            <div class="p-[30px] flex items-center justify-center flex-col gap-[20px]">
                <h3 class="text-xl mb-2">Set 4 digits wallet PIN</h3>
                <OtpInput v-model:value="registerForm.otp" />
                <div class="mx-2 w-3/5">
                    <TextButton :loading="loadingIcon" @click="setPin()" title="Set PIN" />
                </div>
            </div>
        </div>
    </main>
</template>
