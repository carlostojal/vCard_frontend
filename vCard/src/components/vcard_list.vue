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
    id:{
        type: Number,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    blocked:{
        type: String,
        required: true
    },
    balance:{
        type: Number,
        required: true
    },
    max_debit:{
        type: Number,
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
