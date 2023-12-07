<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
})

</script>

<template>

    <tbody>
    <tr>
        <th scope="row">{{ props.id }}</th>
        <td>
        <div class="d-flex align-items-center">
            {{ props.name }}
        </div>
        </td>
        <td>
        <div class="d-flex align-items-center">
            {{ props.type }}
        </div>
        </td>
    </tr>
    </tbody>


</template>

<style scoped>

</style>
