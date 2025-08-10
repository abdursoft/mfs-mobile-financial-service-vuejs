<script setup>
import KycCard from '@/components/card/KycCard.vue';
import ProfileCard from '@/components/card/ProfileCard.vue';
import SummeryCard from '@/components/card/SummeryCard.vue';
import TopHeader from '@/components/header/TopHeader.vue';
import { useAuthStore } from '@/stores/authStore';
import { useSiteStore } from '@/stores/siteStore';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTransferStore } from '@/stores/transferStore';


// define stores 
const route = useRoute();
const siteStore = useSiteStore();
const authStore = useAuthStore();
const transferStore = useTransferStore();

watch(() => siteStore.layout, (newValue) => {
    console.log(newValue);
})

// fetch transactions on mount
onMounted(() => {
    transferStore.setTransfer();
});

</script>

<template>
    <main class="w-full flex items-center justify-center">
        <div class="w-full flex items-center justify-center flex-col">
            <TopHeader />
            <hr class="bg-gray-400 mt-1 text-gray-300 w-full" />
            <div class="p-2 w-full max-w-[1450px]">
                <div class="flex flex-col md:flex-row items-start gap-3">
                    <div class="w-full p-2 md:w-2/5 lg:w-1/4">
                        <ProfileCard :user="authStore.authUser" />
                        <SummeryCard :transactions="transferStore?.transactionSummery" />
                        <KycCard :id-number="authStore.authUser?.document" :status="authStore.authUser?.kyc_status" :id-type="authStore.authUser?.document_type" />
                    </div>
                    <div class="w-full p-2 md:w-2/3 lg:w-4/5">
                        <router-view />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>