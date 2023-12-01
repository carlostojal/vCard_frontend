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
const blocked = ref('all');

const submit = async () => {

    switch(props.type) {
        case 'vcard':
            if(query.value == null || query.value == "" || query.value == undefined){
                await vcardsStore.fetchVcardsBlock(blocked.value) //get all
            }else{
                await vcardsStore.searchVcards(query.value, blocked.value) //with filter
            }

            break;
        case 'transaction':
            if(query.value == null || query.value == "" || query.value == undefined){
                await transactionStore.fetch() //get all
            }else{
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

        <div v-if="props.type == 'vcard'">
            <select v-model="blocked" class="form-select size" aria-label="Default select example">
                <option value="all" selected>All</option>
                <option value="1">Blocked</option>
                <option value="0">Unblocked</option>
            </select>
        </div>

      <input v-model="query" class="form-control" type="text" name="query" placeholder="Search...">
      <button class="btn btn-outline-success" type="submit">Search</button>
    </div>
  </form>

</template>

<style scoped>
.size{
    width: 11rem;
}
</style>