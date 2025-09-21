<script setup>
import TextButton from '@/components/button/TextButton.vue';
import InputField from '@/components/input/InputField.vue';
import PhoneField from '@/components/input/PhoneField.vue';
import ClockTimer from '@/components/partials/ClockTimer.vue';
import { AUTH } from '@/server/Api';
import apiClient from '@/service/axios';
import { ref, reactive, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useAuthStore } from '@/stores/authStore';
import OtpInput from '@/components/otp/OtpInput.vue';
import { useSiteStore } from '@/stores/siteStore';
import router from '@/router';
import { useRoute } from 'vue-router';

const passType = ref('password');
const formError = ref([]);
const loadingIcon = ref(false);
const otpToken = ref(null);
const resendBtn= ref(false);

const toast = useToast();

const route = useRoute();

const authStore = useAuthStore();
const siteStore = useSiteStore();

const registerForm = reactive({
  phone: '',
  name: '',
  otp: ''
});


// check otp is available 
function checkOTPAuth() {
  otpToken.value = authStore.signupToken ?? localStorage.getItem('signUpOTPToken');
}

// resend new otp 
async function sendNewOTP() {
  try {
    resendBtn.value = false;
    loadingIcon.value = true;
    const res = await apiClient.post(AUTH.RESEND_OTP, { phone: localStorage.getItem('userPhone')
    });
    authStore.setSignupToken(res.data.otpToken);
    localStorage.setItem('signUpOTPToken',res.data.otpToken);
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error?.response.data?.message, { position: 'bottom-right' });
  }
  loadingIcon.value = false;
}


// resend otp timer 
function timerEvent(value){
  resendBtn.value = value;
}

// otp verification 
async function otpVerify() {
  try {
    loadingIcon.value = true;
    const res = await apiClient.post(AUTH.VERIFY_OTP, { otp: siteStore.OTP }, {
      headers: {
        'otpToken': authStore.signupToken
      }
    });
    authStore.setWalletToken(res.data.walletToken);
    localStorage.setItem('walletToken',res.data.walletToken);
    toast.success(res.data.message);
    authStore.setSignupToken(null);
    localStorage.removeItem('signupToken');
    router.push({name:'setPin'});
  } catch (error) {
    toast.error(error?.response.data?.message, { position: 'bottom-right' });
  }
  loadingIcon.value = false;
}

async function handleSubmit() {
  try {
    formError.value = [];
    loadingIcon.value = true
    const res = await apiClient.post(AUTH.REGISTER, {
      phone: registerForm.phone,
      name: registerForm.name
    });
    authStore.setSignupToken(res.data.otpToken);
    localStorage.setItem('userPhone',registerForm.phone);
    localStorage.setItem('signUpOTPToken', res.data.otpToken);
    toast.success(res.data.message, { position: 'bottom-right' });
    checkOTPAuth();
    loadingIcon.value = false;
  } catch (error) {
    loadingIcon.value = false;
    formError.value = error?.response?.data?.errors;
    toast.error(error?.response.data?.message, { position: 'bottom-right' });
  }
}

onMounted(async () => {
  checkOTPAuth();
  if(route?.query?.sendOTP == 'true'){
    await sendNewOTP();
  }
})

</script>

<template>
  <main class="p-2 h-screen flex flex-col justify-center items-center">
    <div class="flex items-center justify-center text-center flex-col mb-5">
      <img src="/abpay.png" alt="abpay" class="w-[90px] h-[90px]">
      <h3 class="text-2xl">Welcome</h3>
      <p class="mt-2 text-white text-base">Welcome to ABPay PGW Integration Platform</p>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 xl:2/5 rounded-md shadow-md px-2 py-4 bg-white">
      <!-- register form  -->
      <template v-if="!otpToken">
        <div class="my-3 flex flex-col items-center justify-center">
          <h1 class="text-2xl text-center">Signup</h1>
          <small class="text-italic text-center text-slate-500">Please enter your wallet number and password to sign
            in</small>
        </div>
        <InputField type="text" label="Name" icon="mdi:user" :msg="formError?.name?.[0]" v-model="registerForm.name"
          placeholder="Jhon Doe" />
        <PhoneField v-model="registerForm.phone" label="Phone" :msg="formError?.phone?.[0]" @validate="onInput" />
        <div class="my-1 flex items-center justify-end">
          <router-link>Forgot password?</router-link>
        </div>
        <TextButton title="Sign up" :type="'button'" :loading="loadingIcon" background="bg-red-500 hover:bg-red-600"
          @click="handleSubmit" />
        <h5 class="text-center">Already have an account? <router-link :to="{ name: 'login' }" class="text-blue-900">Sign
            In</router-link></h5>
      </template>

      <!-- otp validation form  -->
      <template v-else>
        <div class="p-[30px] flex items-center justify-center flex-col gap-[20px]">
          <h3 class="text-xl mb-2">Verify your phone</h3>
          <OtpInput v-model:value="registerForm.otp"/>
          <div class="mx-2 w-3/5">
            <TextButton @click="otpVerify()" title="Verify" />
          </div>
          <ClockTimer v-if="!resendBtn" :duration="180" v-on:timeEnd="timerEvent" />
          <TextButton v-else :loading="loadingIcon" background="!text-white !bg-green-600 !w-[120px] !p-2 !min-h-[30px]" title="Resend OTP"
            @click="sendNewOTP()" />
        </div>
      </template>
    </div>
  </main>
</template>
