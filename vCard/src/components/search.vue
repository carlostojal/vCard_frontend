<script setup>
import { onMounted, ref, watch } from 'vue';
import { defineProps } from 'vue';
import { useVcardsStore } from '@/stores/vcards';
import { useTransactionsStore } from '@/stores/transactions'
import { useCategoriesStore } from '@/stores/categories'
import { usePaginateSearchStore } from '../stores/paginateSearch';

const paginateSearchStore = usePaginateSearchStore();
const categoriesStore = useCategoriesStore();
const transactionStore = useTransactionsStore();
const vcardsStore = useVcardsStore();

const props = defineProps({
    type: {
        type: String,
        required: true
    }
})

const submit = async () => {

    switch(props.type) {
        case 'vcard':
            if(paginateSearchStore.query == null || paginateSearchStore.query == "" || paginateSearchStore.query == undefined){
                await vcardsStore.fetchVcardsBlock(paginateSearchStore.blocked) //get all -> apenas com o type (all ou block ou unblock)
            }else{
                await vcardsStore.searchVcards(paginateSearchStore.query, paginateSearchStore.blocked) //with filter -> com o type e query
            }
            break;
        case 'transaction':
            if(paginateSearchStore.query == null || paginateSearchStore.query == "" || paginateSearchStore.query == undefined){
                await transactionStore.fetchAllTransactionType(paginateSearchStore.trans_type) //get all -> apenas com o type (all ou D ou C)
            }else{
                await transactionStore.searchAllTransaction(paginateSearchStore.query, paginateSearchStore.trans_type) //with filter -> com o type e query
            }
            break;
        case 'categories':
            if(paginateSearchStore.query == null || paginateSearchStore.query == "" || paginateSearchStore.query == undefined){
                await categoriesStore.fetchCategoriesType(paginateSearchStore.categorie_type) //get all -> apenas com o type (all ou D ou C)
            }else{
                await categoriesStore.searchCategories(paginateSearchStore.query, paginateSearchStore.categorie_type) //with filter -> com o type e query
            }
            break;
        case 'myTransaction':
            if(paginateSearchStore.query == null || paginateSearchStore.query == "" || paginateSearchStore.query == undefined){
                await transactionStore.fetchMyTransactionType(paginateSearchStore.myTrans_type) //get all -> apenas com o type (all ou D ou C)
            }else{
                await transactionStore.searchMyTransaction(paginateSearchStore.query, paginateSearchStore.myTrans_type) //with filter -> com o type e query
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

        <div v-if="props.type == 'vcard'">
            <select v-model="paginateSearchStore.blocked" class="form-select size" aria-label="">
                <option value="all" selected>All</option>
                <option value="1">Blocked</option>
                <option value="0">Unblocked</option>
            </select>
        </div>

        <div v-if="props.type == 'transaction'">
            <select v-model="paginateSearchStore.trans_type" class="form-select size" aria-label="">
                <option value="all" selected>All</option>
                <option value="D">Debit</option>
                <option value="C">Credit</option>
            </select>
        </div>

        <div v-if="props.type == 'categories'">
            <select v-model="paginateSearchStore.categorie_type" class="form-select size" aria-label="">
                <option value="all" selected>All</option>
                <option value="D">Debit</option>
                <option value="C">Credit</option>
            </select>
        </div>


      <input v-model="paginateSearchStore.query" class="form-control" type="text" name="query" placeholder="Search...">
      <button class="btn btn-outline-success" type="submit">Search</button>
    </div>
  </form>

</template>

<style scoped>
.size{
    width: 11rem;
}
</style>