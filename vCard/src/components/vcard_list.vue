<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';
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
    showButton:{
        type: Boolean,
        default: false
    }
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

const vcardDelete = async (phone_number) => {
    await vcardsStore.deleteVcard(phone_number)
}

//watch ao props.blocked para paginate
watch(() => props.blocked, (newValue) => {
    block.value = newValue    
});

//watch a todas as linahs para quando paginate não acartar com o valor do novo block para a página seguinte
watch(() => props.phone, (newValue) => {
    isChange.value = false
    block.value = props.blocked
});


</script>

<template>

    <tbody>
        <tr @mouseover="showButton = true" @mouseleave="showButton = false">
        <td>{{ props.name }}</td>
        <td>{{ props.phone }}</td>
        <td>{{ props.email }}</td>

        <td v-if="block == 1"><button class="btn btn-warning" @click="changeBlock" > Blocked </button></td>
        <td v-else><button class="btn btn-info" @click="changeBlock"> Unblocked </button></td>
        
        <td>€{{ props.balance }}</td>
        <td>€{{ props.max_debit }}</td>
        <td v-if="isChange"> <button class="btn btn-second" @:click="applyChanges(props.phone, block)"> Apply </button> </td>
        
        <td v-if="showButton && props.balance==0">
            <div class="d-flex align-items-center">
                <button class="btn btn-outline-danger" style="max-width: 10rem;" @click="vcardDelete(props.phone)">Delete</button>
            </div>
        </td>

        </tr>
    </tbody>

</template>

<style scoped>

</style>
