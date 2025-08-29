import { PAYMENT } from "@/server/Api";
import apiClient from "@/service/axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

export const usePaymentStore = defineStore('paymentStore', () => {
    const payment = ref(null);
    const merchant = ref(null);
    const paymentStatus = ref(false);
    const loadingIcon = ref(false);
    const router = useRouter();

    const toast = useToast();

    // get merchant details 
    async function getMerchant(paymentID){
        loadingIcon.value != loadingIcon.value;
        try {
            const res = await apiClient.get(PAYMENT.MERCHANT(paymentID));
            merchant.value = res.data.merchant;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            router.push({name:'login'});
        }
        loadingIcon.value != loadingIcon.value;
    }

    // init payment 
    async function initPayment(paymentID,data){
        loadingIcon.value != loadingIcon.value;
        try {
            const res = await apiClient.post(PAYMENT.PROCEED(paymentID),data);
            payment.value = res.data.data;
            return res;
        } catch (error) {
            toast.error(error?.response?.data?.message, {position:'bottom-right'});
        }
        loadingIcon.value != loadingIcon.value;
    }

    // verify otp 
    async function verifyOTP(data){
        loadingIcon.value != loadingIcon.value;
        try {
            const res = await apiClient.post(PAYMENT.VERIFY_OTP(payment.value?.txn_id),data);
            toast.success(res.data.message,{position:'bottom-right'});
            return res;
        } catch (error) {
            toast.error(error?.response?.data?.message,{position:'bottom-right'})
        }
        loadingIcon.value != loadingIcon.value;
    }

    // validate wallet pin 
    async function verifyPIN(data){
        loadingIcon.value != loadingIcon.value;
        try {
            const res = await apiClient.post(PAYMENT.VERIFY_PIN(payment.value?.txn_id),data);
            toast.success(res.data.message,{position:'bottom-right'})
            paymentStatus.value = true;
            return res;
        } catch (error) {
            toast.error(error?.response?.data?.message,{position:'bottom-right'})
        }
        loadingIcon.value != loadingIcon.value;
    }

    return {payment,merchant,paymentStatus,loadingIcon,getMerchant,initPayment,verifyOTP,verifyPIN}
})