import { defineStore } from "pinia";
import { ref } from "vue";

export const useSiteStore = defineStore('siteStore',() => {
    const isLoader = ref(false);
    const OTP = ref('');
    const layout = ref(false);

    // set layout screen  width
    function setLayout(value){
        layout.value = value;
    }

    // set progress loader 
    function setLoader(){
        isLoader.value = !isLoader.value;
    }

    // set otp input value 
    function setOTP(value){
        OTP.value = value;
    }

    return {isLoader,OTP,layout,setLayout,setLoader,setOTP}
})