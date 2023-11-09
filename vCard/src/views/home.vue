<script setup>

import Menu from '../components/menu.vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore();

</script>

<template>

    <Menu />

    <div class="container">
        <h1>Hello, {{ user.name }}</h1>
    </div>

</template>

<style scoped>

</style>