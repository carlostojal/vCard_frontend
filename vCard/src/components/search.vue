<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import { useVcardsStore } from '@/stores/vcards'
//import { useTransactionStore } from '@/stores/transactions'

const props = defineProps({
    type: {
        type: String,
        required: true
    }
})

//const transactionStore = useTransactionStore();
const vcardsStore = useVcardsStore();
const query = ref(null);

const submit = () => {

console.log(props.type)

    switch(props.type) {
        case 'vcard':
            vcardsStore.fetchVcards(query.value)
            break;
        /*case 'transaction':
            transactionStore.searchTransactions(query.value)
            break;*/
        default:
            console.log("Invalid type")
    }
    
}

</script>

<template>

    <form class="navbar navbar-expand-lg" style="margin-top: 2.5rem" @submit.prevent="submit">
        <div class="container">
            <input v-model="query" class="form-control" type="text" name="query" placeholder="Search...">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </div>
    </form>

</template>

<style scoped>

</style>