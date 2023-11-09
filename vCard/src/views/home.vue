<script setup>

import Menu from '../components/menu.vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore();

</script>

<template>

    <Menu />

    <h1>Hello, {{ user.name }}</h1>

</template>

<style scoped>

</style>