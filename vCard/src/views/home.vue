<script setup>
import Menu from '../components/menu.vue'
import vCard from '../components/vcard.vue'
import Transaction from '../components/transaction.vue'
import { useUserStore } from '@/stores/user'
import { useTransactionsStore } from '@/stores/transactions'
import FormatUtil from '../utils/FormatUtil'

const user = useUserStore();
const transactions = useTransactionsStore();

user.fetch().catch((e) => {
  console.error('Error getting user data: ' + e)
})
</script>

<template>
  <Menu />

  <div class="container">

    <div class="header">
      <h1 class="welcome">Hello, {{ FormatUtil.formatFirstName(user.name) }}.</h1>

      <!-- TODO: the vCard component is not reacting to changes -->
      <vCard :name="user.name" :phone="user.phone" :balance="user.balance" />

    </div>

    <div class="transactions">
      <h2>Recent Transactions</h2>

      <div class="transactions-list">
        <Transaction v-for="transaction in transactions.getAll()" :key="transaction.id" :type="transaction.type" :value="transaction.value" :date="transaction.date" />
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
