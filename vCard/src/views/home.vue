<script setup>
import Menu from '../components/menu.vue'
import vCard from '../components/vcard.vue'
import Transaction from '../components/transaction.vue'
import { useUserStore } from '@/stores/user'
import { useTransactionsStore } from '@/stores/transactions'
import FormatUtil from '../utils/FormatUtil'
import { onMounted } from 'vue'

const user = useUserStore();
const transactionsStore = useTransactionsStore();

onMounted( async () => {
    await user.fetch().catch((e) => {
      console.error('Error getting user data: ' + e)
    })
    await transactionsStore.getAll()
})


</script>

<template>
  <Menu> </Menu>

  <div class="container">

    <div class="header">
      <h1 class="welcome">Hello, {{ FormatUtil.formatFirstName(user.name) }}.</h1>

      <!-- TODO: the vCard component is not reacting to changes -->
      <vCard :name="user.name" :phone="user.phone" :balance="user.balance" />

    </div>

    <div class="transactions">
      <h2>Recent Transactions</h2>

      <div class="transactions-list">
        <Transaction v-if="transactionsStore.myTransactions" v-for="transaction in transactionsStore.myTransactions.slice(0,3)" @click="transaction.detail = !transaction.detail" :isDetail="transaction.detail" :key="transaction.id" :type="transaction.type" :paymentType="transaction.payment_type" :value="transaction.value" :date="transaction.date" :description="transaction.description" :pair_vcard="transaction.pair_vcard" :old_balance="transaction.old_balance"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

.welcome {
  font-size: 3rem;
  margin: 1rem 0 0.7rem 0;
}

.transactions {
  margin-top: 2rem;
}

</style>
