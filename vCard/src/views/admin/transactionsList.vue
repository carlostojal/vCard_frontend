<script setup>
import Menu from '@/components/menu.vue'
import Transaction from '@/components/transaction.vue'
import Search from '@/components/search.vue'
import { useTransactionsStore } from '@/stores/transactions'
import { onMounted } from 'vue'

const transactions = useTransactionsStore();

onMounted( async () => {
    await transactions.AllTransactions()
})

</script>


<template>
<Menu> </Menu>
<Search :type="'transaction'"></Search>
    <div class="container">
        <div class="row justify-content-center">
            <div style="margin-top:3rem" >
                <h2 class="margens">All Transactions</h2>
            </div>

            <div class="transactions">
                <div class="transactions-list">
                    <Transaction v-for="transaction in transactions.allTransactions" @click="transaction.detail = !transaction.detail" :isDetail="transaction.detail" :key="transaction.id" :type="transaction.type" :paymentType="transaction.payment_type" :value="transaction.value" :date="transaction.date" :description="transaction.description" :pair_vcard="transaction.pair_vcard" :old_balance="transaction.old_balance"/>
                </div>
            </div>

        </div>
    </div>
</template>


<style scoped>
.transactions {
  margin-top: 2rem;
}
</style>