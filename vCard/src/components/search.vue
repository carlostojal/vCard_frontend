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

console.log(props.type)

    switch(props.type) {
        case 'vcard':
            if(query.value == null || query.value == "" || query.value == undefined){
                console.log("fetching all vcards", query.value)
                await vcardsStore.fetchVcards()
            }
            else{
                console.log("fetching with search", query.value)
                await vcardsStore.searchVcards(query.value)
            }
            break;
        case 'transaction':
            if(query.value == null || query.value == "" || query.value == undefined){
                console.log("fetching all transactions", query.value)
                await transactionStore.fetch()
            }
            else{
                console.log("fetching with search", query.value)
                await transactionStore.searchTransaction(query.value)
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