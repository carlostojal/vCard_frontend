<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import { useVcardsStore } from '@/stores/vcards';
import { useTransactionsStore } from '@/stores/transactions'

const props = defineProps({
    type: {
        type: String,
        required: true
    }
})

const transactionStore = useTransactionsStore();
const vcardsStore = useVcardsStore();
const query = ref(null);

const submit = async () => {

    switch(props.type) {
        case 'vcard':
            if(query.value == null || query.value == "" || query.value == undefined){
                await vcardsStore.fetchVcards() //get all
            }
            else{
                await vcardsStore.searchVcards(query.value) //with filter
            }
            break;
        case 'transaction':
            if(query.value == null || query.value == "" || query.value == undefined){
                await transactionStore.fetch() //get all
            }
            else{
                await transactionStore.searchTransaction(query.value) //with filter
            }
            break;
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