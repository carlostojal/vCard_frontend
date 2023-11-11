<script setup>

import Menu from '../components/menu.vue'
import vCard from '../components/vcard.vue'
import { ref } from 'vue'

import { useUserStore } from '@/stores/user'

const user = useUserStore();
const user_name = ref(user.name);

</script>

<template>

    <Menu />

    <div class="container">
        <h1>Hello, {{ user_name }}</h1>

        <vCard :name="user_name" :phone="user.phone" :balance="user.balance" />
    </div>

</template>

<style scoped>

</style>
