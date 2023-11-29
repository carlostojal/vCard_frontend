<script setup>

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    blocked:{
        type: Number,
        required: true
    },
    balance:{
        type: String,
        required: true
    },
    max_debit:{
        type: String,
        required: true
    },
})


</script>

<template>

    <tbody>
        <tr>
        <td>{{ props.name }}</td>
        <td>{{ props.phone }}</td>
        <td>{{ props.email }}</td>
        <td v-if="props.blocked == 1">Block</td>
        <td v-else>Unblock</td>
        <td>€{{ props.balance }}</td>
        <td>€{{ props.max_debit }}</td>
        </tr>
    </tbody>

</template>

<style scoped>

</style>
