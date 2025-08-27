import { MERCHANT } from "@/server/Api";
import apiClient from "@/service/axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

export const useMerchantStore = defineStore('merchantStore', () => {
    const stores = ref([]);
    const toast = useToast();


    // get merchant stores 
    async function getStores(id=''){
        try {
            const res = await apiClient.get(MERCHANT.GET_APP(id));
            stores.value = res.data.data;
        } catch (error) {
            toast.error(error?.response.data.message);
        }
    }

    // add new store 
    async function addStore(data){
        return await apiClient.post(MERCHANT.CREATE_APP,data);
    }

    // update store 
    async function updateStore(id,data){

    }

    // delete store 
    async function deleteStore(id){
        try {
            const res = await apiClient.post(MERCHANT.DELETE_APP(id));
            await getStores();
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    return {stores,getStores,addStore,updateStore,deleteStore}
})