<script setup>
import TextButton from '@/components/button/TextButton.vue';
import Merchant from '@/components/header/MerchantNav.vue';
import InputField from '@/components/input/InputField.vue';
import { useMerchantStore } from '@/stores/merchantStore';
import { ref } from 'vue';
import { reactive } from 'vue';
import { useToast } from 'vue-toast-notification';

const merchantStore = useMerchantStore();
const toast = useToast();

const merchantForm = reactive({
    app_name: "",
    app_logo: "",
    app_type: "development",
    webhook_events: [],
    webhook_url: ""
});

const formError = ref([]);
const loadingIcon = ref(false);


async function handleSubmit() {
    loadingIcon.value = true;
    try {
        const response = await merchantStore.addStore({
            app_name: merchantForm.app_name,
            app_logo: merchantForm.app_logo,
            app_type: merchantForm.app_type,
            webhook_url: merchantForm.webhook_url,
            webhook_events: merchantForm.webhook_events
        });
        toast.success(response.data.message,{position:'bottom-right'});
    } catch (error) {
        toast.error(error?.response?.data?.message,{position:'bottom-right'});
        console.log(error, 'error')
    }
    loadingIcon.value = false;
}

</script>

<template>
    <div class="w-full">
        <Merchant />
        <div class="w-full py-30 flex items-center justify-center">
            <div class="w-full flex items-center justify-center ap-2">
                <div class="w-full md:w-1/2 rounded-md shadow-md px-2 py-4 bg-white mt-10">
                    <!-- merchant app register form  -->
                    <div class="my-3 flex flex-col items-center justify-center">
                        <h1 class="text-2xl text-center">Create Merchant APP</h1>
                        <small class="text-italic text-center text-slate-500">Accept payment for your business</small>
                    </div>
                    <InputField type="text" label="App name" icon="arcticons:namecheap"
                        :msg="formError?.app_name?.[0]" v-model="merchantForm.app_name" placeholder="Abdursoft" />
                    <InputField type="url" label="App Logo" icon="streamline-logos:ello-logo" :msg="formError?.app_logo?.[0]"
                        v-model="merchantForm.app_logo" placeholder="App Logo URL size 60x60 pixels" />
                    <TextButton title="Create" :type="'button'" :loading="loadingIcon"
                        background="bg-red-500 hover:bg-red-600" @click="handleSubmit" />
                </div>
            </div>
        </div>
    </div>
</template>