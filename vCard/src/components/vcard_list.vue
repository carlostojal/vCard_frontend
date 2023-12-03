<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useVcardsStore } from '@/stores/vcards'

const vcardsStore = useVcardsStore();
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

const block = ref('')
const isChange = ref(false)

onMounted(() => {
    if(props.blocked == 1){
        block.value = 1
    }else{
        block.value = 0
    }
})

const changeBlock = () => {
    //CHANGE BLOCK
    if(block.value == 1){
        block.value = 0
    }else{
        block.value = 1
    }

    //APLY BTN
    if(block.value != props.blocked){
        isChange.value = true
    }else{
        isChange.value = false
    }
}

const applyChanges = async (phone_number, block) => {
    //APPLY CHANGES
    console.log("APPLY CHANGES", phone_number, block)
    isChange.value = false
    await vcardsStore.changeBlock(phone_number, block)
}

</script>

<template>

    <tbody>
        <tr>
        <td>{{ props.name }}</td>
        <td>{{ props.phone }}</td>
        <td>{{ props.email }}</td>
        <td v-if="block == 1"><button class="btn btn-warning" @click="changeBlock" > Blocked </button></td>
        <td v-else><button class="btn btn-info" @click="changeBlock"> Unblocked </button></td>
        <td>€{{ props.balance }}</td>
        <td>€{{ props.max_debit }}</td>
        <td v-if="isChange"> <button class="btn btn-second" @:click="applyChanges(props.phone, block)"> Apply </button> </td>
        </tr>
    </tbody>

</template>

<style scoped>

</style>
