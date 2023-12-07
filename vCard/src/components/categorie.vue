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
        <div v-if="props.type == 'D'" class="d-flex align-items-center"> Debit </div>
        <div v-if="props.type == 'C'" class="d-flex align-items-center"> Credit </div>
        </td>
    </tr>
    </tbody>


</template>

<style scoped>

</style>
