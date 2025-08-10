<script setup>
import TextButton from '@/components/button/TextButton.vue';
import CheckBox from '@/components/input/CheckBox.vue';
import InputField from '@/components/input/InputField.vue';
import PhoneField from '@/components/input/PhoneField.vue';
import router from '@/router';
import { AUTH } from '@/server/Api';
import apiClient from '@/service/axios';
import { useAuthStore } from '@/stores/authStore';
import { reactive, ref } from 'vue';
import { useToast } from 'vue-toast-notification';

// define stores 
const authStore = useAuthStore();
const toast = useToast();

// define variables 
const loadingIcon = ref(false);
const loginError = ref([]);

const loginForm = reactive({
  phone:null,
  pin:null,
  remember:false,
});

const passType = ref('password');
const passIcon = ref('mdi:eye');

async function handleSubmit() {
  try {
    console.log(loginForm)
    loadingIcon.value = true;
    const res = await apiClient.post(AUTH.LOGIN,{
      phone:loginForm.phone,
      pin:loginForm.pin
    });
    authStore.setAuthRole(res?.data?.role);
    authStore.setAuthToken(res?.data?.token);
    toast.success(res?.data?.message,{ position: 'bottom-right' });
    localStorage.setItem('abpToken',res.data.token);
    if(loginForm.remember){
      localStorage.setItem('abpRefToken',res.data.refToken);
    }
    authStore.setSignupToken(null);
    localStorage.removeItem('signUpOTPToken');
    router.push({name:'dashboard'});
  } catch (error) {
    console.log(error)
    loginError.value = error?.response?.data?.errors ?? [];
    toast.error(error?.response?.data?.message,{ position: 'bottom-right' });
  }
  loadingIcon.value = false;
}

function iconClick() {
  if (passType.value === 'password') {
    passType.value = 'text';
    passIcon.value = 'mdi:eye-off-outline';
  } else {
    passType.value = 'password';
    passIcon.value = 'mdi:eye';
  }
}
</script>

<template>
  <main class="p-2 h-screen flex flex-col justify-center items-center">
    <div class="flex items-center justify-center text-center flex-col mb-5">
      <img src="/abpay.png" alt="abpay" class="w-[90px] h-[90px]">
      <h3 class="text-2xl">Welcome</h3>
      <p class="mt-2 text-slate-600 text-base">Welcome to ABPay PGW Integration Platform</p>
    </div>
    <div class="w-full md:w-1/3 lg:w-1/4 rounded-md shadow-md px-2 py-4 bg-white">
      <div class="my-3 flex flex-col items-center justify-center">
        <h1 class="text-2xl text-center">Signin</h1>
        <small class="text-italic text-center text-slate-500">Please enter your wallet number and password to sign
          in</small>
      </div>
      <PhoneField v-model="loginForm.phone" label="Phone" :msg="loginError?.phone?.[0]" />
      <InputField :type="passType" v-model="loginForm.pin" label="Wallet PIN" :msg="loginError?.pin?.[0]" @click="iconClick" :icon="passIcon" placeholder="****" />
        <div class="my-1 flex items-center justify-between">
          <CheckBox value="1" v-model="loginForm.remember" label="Remember Me" />
          <router-link >Forgot password?</router-link>
        </div>
        <TextButton title="Sign in" :type="'button'" :loading="loadingIcon" background="bg-green-500 hover:bg-green-600"
        @click="handleSubmit" />
        <h5 class="text-center">Don't have an account? <router-link :to="{name:'register'}" class="text-blue-900">Sign Up</router-link></h5>
    </div>
  </main>
</template>
