<script setup>

import Menu from '../components/menu.vue'
import vCard from '../components/vcard.vue'

import { useUserStore } from '@/stores/user'

const user = useUserStore();

</script>

<template>

    <Menu />

    <div class="container">
        <h1>Hello, {{ user.name }}</h1>

        <vCard :name="user.name" :phone="user.phone" :balance="user.balance" />
    </div>

</template>

<style scoped>

</style>