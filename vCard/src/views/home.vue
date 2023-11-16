<script setup>

import Menu from '../components/menu.vue'
import vCard from '../components/vcard.vue'
import { ref, computed } from 'vue'
import axios from 'axios';

import { useUserStore } from '@/stores/user'

const user = useUserStore();

user.fetch().then(data => {
    console.log(data);
    user.updateName(data.name);
}).catch(e => {
    console.error("Error getting user data");
});

const userName = computed({
    get: () => user.name,
    set: (value) => user.updateName(value)
});

const userPhone = computed({
    get: () => user.phone,
    set: (value) => user.phone = value
});

const userBalance = computed({
    get: () => user.balance,
    set: (value) => user.balance = value
});



</script>

<template>

    <Menu />

    <div class="container">
        <h1>Hello, {{ userName }}</h1>

        <!-- TODO: the vCard component is not reacting to changes -->
        <vCard :name="userName" :phone="userPhone" :balance="userBalance" />
    </div>

</template>

<style scoped>

</style>
