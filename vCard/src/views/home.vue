<script setup>
import Menu from '../components/menu.vue'
import vCard from '../components/vcard.vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

user.fetch().catch((e) => {
  console.error('Error getting user data: ' + e)
})
</script>

<template>
  <Menu />

  <div class="container">
    <h1>Hello, {{ user.name }}</h1>

    <!-- TODO: the vCard component is not reacting to changes -->
    <vCard :name="user.name" :phone="user.phone" :balance="user.balance" />
  </div>
</template>

<style scoped></style>
