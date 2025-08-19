import { AGENT, TRANSACTION, WALLET } from "@/server/Api";
import apiClient from "@/service/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTransferStore = defineStore("transferStore", () => {
    // define exportable variables
    const toUser = ref(null);
    const OTP = ref("");
    const transactionSummery = ref([]);
    const loading = ref(false);

    // define functions

    // set to user
    function setToUser(user) {
        toUser.value = user;
    }

    // set confirmation otp
    function setOTP(otp) {
        OTP.value = otp;
    }

    // set transfer data
    async function setTransfer() {
        loading.value = true;
        try {
            const res = await apiClient.get(WALLET.SUMMERY);
            if (res.data) {
                transactionSummery.value = res.data || [];
                loading.value = false;
            }
        } catch (error) {
            return false;
        }
    }

    // send money
    async function sendMoney(data) {
        return await apiClient.post(TRANSACTION.SEND, data);
    }

    // user cash out 
    async function cashOut(data) {
        return await apiClient.post(TRANSACTION.CASH_OUT, data);
    }

    // online payment 
    async function onlinePayment(data) {
        return await apiClient.post(TRANSACTION.PAYMENT, data);
    }

    // cash in 
    async function cashIn(data){
        return await apiClient.post(AGENT.CASH_IN,data);
    }

    return { toUser, OTP, transactionSummery, loading, setToUser, setOTP, setTransfer, sendMoney, cashOut, cashIn,onlinePayment};
});
