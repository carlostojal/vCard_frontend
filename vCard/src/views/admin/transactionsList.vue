<script setup>
import Paginate from '@/components/paginate.vue'
import Menu from '@/components/menu.vue'
import Transaction from '@/components/transaction.vue'
import Search from '@/components/search.vue'
import { useTransactionsStore } from '@/stores/transactions'
import { onMounted, ref } from 'vue'

const transactionsStore = useTransactionsStore();

onMounted( async () => {
    await transactionsStore.AllTransactions()
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
                    <Transaction v-if="transactionsStore.allTransactions" v-for="transaction in transactionsStore.allTransactions" @click="transaction.detail = !transaction.detail" :isDetail="transaction.detail" :key="transaction.id" :type="transaction.type" :paymentType="transaction.payment_type" :value="transaction.value" :date="transaction.date" :description="transaction.description" :pair_vcard="transaction.pair_vcard" :old_balance="transaction.old_balance"/>
                </div>
            </div>
            <Paginate v-if="transactionsStore.lastPage" :type="'allTransactions'" :totalPages="transactionsStore.lastPage" :currentPage="1"> </Paginate>
        </div>
    </div>
</template>


<style scoped>
.transactions {
  margin-top: 2rem;
}
</style>