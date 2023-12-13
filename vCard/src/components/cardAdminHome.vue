<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    href: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
})

</script>

<template>

    <router-link :to="props.href" class="card">
        <h2>{{ props.title }}</h2>
        <p>{{ props.desc }}</p>
    </router-link>
</template>

<style scoped>

</style>