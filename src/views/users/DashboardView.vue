<script setup>
import TransactionCard from '@/components/card/TransactionCard.vue';
import TransactionsTable from '@/components/table/TransactionsTable.vue';
import { useAuthStore } from '@/stores/authStore';


const authStore = useAuthStore();

</script>
<template>
    <div>
        <div class="flex flex-col md:flex-row items-start gap-3">
            <TransactionCard :auth-user="authStore?.authUser" />
        </div>
        <TransactionsTable />
    </div>
</template>