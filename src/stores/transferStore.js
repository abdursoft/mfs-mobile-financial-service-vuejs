import { TRANSACTION } from "@/server/Api";
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
            const res = await apiClient.get(TRANSACTION.SUMMERY);
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

    return { toUser, OTP, transactionSummery, setToUser, setOTP, setTransfer, sendMoney };
});
