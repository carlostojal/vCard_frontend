<script setup>
import Menu from '../components/menu.vue'
import vCard from '../components/vcard.vue'
import transaction from '../components/transaction.vue'
import { useUserStore } from '@/stores/user'
import FormatUtil from '../utils/FormatUtil'

const user = useUserStore()

user.fetch().catch((e) => {
  console.error('Error getting user data: ' + e)
})
</script>

<template>
  <Menu />

  <div class="container">

    <div class="header">
      <h1>Hello, {{ FormatUtil.formatFirstLastName(user.name) }}</h1>

      <!-- TODO: the vCard component is not reacting to changes -->
      <vCard :name="user.name" :phone="user.phone" :balance="user.balance" />

    </div>

    <div class="transactions">
      <h2>Recent Transactions</h2>

      <div class="transactions-list">
        <transaction v-for="transaction in user.transactions" :key="transaction.id" :type="transaction.type" :value="transaction.value" />
      </div>
    </div>
  </div>
</template>

<style scoped>

.transactions {
  margin-top: 2rem;
}

</style>
