<script setup>
import Menu from '../components/menu.vue'
import Transaction from '../components/transaction.vue'
import { useUserStore } from '@/stores/user'
import { ref, onMounted } from 'vue';
import { useTransactionsStore } from '@/stores/transactions'

const transactions = useTransactionsStore();
const user = useUserStore();

onMounted(async () => {
    user.fetch().catch((e) => {
      console.error('Error getting user data: ' + e)
    })
})

</script>


<template>
<Menu> </Menu>
    <div class="container">
        <div class="row justify-content-center">
            <div style="margin-top:3rem" >
                <h2 class="margens">My Transactions</h2>
            </div>

            <div class="transactions">
                <div class="transactions-list">
                    <Transaction v-for="transaction in transactions.getAll()" :key="transaction.id" :type="transaction.type" :paymentType="transaction.payment_type" :value="transaction.value" :date="transaction.date" />
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