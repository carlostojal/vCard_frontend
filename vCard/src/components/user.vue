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
    created_at:{
        type: String,
        required: true
    },
    updated_at:{
        type: String,
        required: true
    }
})


</script>

<template>

    <tbody>
        <tr>
        <th scope="row">{{ props.id }}</th>
        <td>{{ props.name }}</td>
        <td>{{ props.email }}</td>
        <td>{{ props.created_at }}</td>
        <td>{{ props.updated_at }}</td>
        </tr>
    </tbody>

</template>

<style scoped>

</style>
