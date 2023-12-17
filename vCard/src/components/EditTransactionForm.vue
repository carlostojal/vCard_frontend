<script setup>
import { onMounted, ref } from 'vue';
import FormatUtil from '../utils/FormatUtil';
import router from '../router';
import { useToast } from 'vue-toastification';
import { useCategoriesStore } from '@/stores/categories'
import { useTransactionsStore } from '@/stores/transactions'


const props = defineProps({
    id: {
        required: true
    },
    type: {
        type: String,
        required: true
    },
    paymentType: {
        required: true
    },
    value: {
        required: true
    },
    date: {
        required: true
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    category_id: {
        required: false
    },
});

const category = ref(props.category)
const description = ref(props.description)
const toast = useToast()
const categoriesStore = useCategoriesStore()
const transactionsStore = useTransactionsStore()

onMounted( async () => {
    await categoriesStore.fetchMyTypeCategories("D")
    description.value = props.description
})

const editTransaction = async () => {
    console.log("editTransaction", category.value, description.value, props.id)
    await transactionsStore.editTransaction(props.id, category.value, description.value)
}



</script>

<template>

  <div>
    <form @submit.prevent="editTransaction" class="mt-4">

        <div class="transaction">
            <div class="transaction-header">
                <img v-if="props.type == 'D'" class="transaction-icon" src="/icons/arrow-bar-up.svg" />
                <img v-else class="transaction-icon" src="/icons/arrow-bar-down.svg" />

                <img v-if="props.paymentType == 'VCARD'" class="transaction-icon" src="/icons/phone.svg" />
                <img v-if="props.paymentType == 'IBAN'" class="transaction-icon" src="/icons/bank.svg" />
                <img v-if="props.paymentType == 'VISA'" class="transaction-icon" src="/icons/credit-card.svg" />
                <img v-if="props.paymentType == 'MB'" class="transaction-icon" src="/icons/credit-card.svg" />
            </div>

            <p class="transaction-value"><b>{{ (props.value) }}</b></p>
            <p class="transaction-date">{{ (props.date) }}</p>

            <div class="margens">
            
            </div>
 
            <div class="margens">
                <label>Category</label>
                <select v-model="category" class="form-control" id="type">
                    <option v-for="cat in categoriesStore.myCategories" :value="cat.id" :selected="cat.id == props.category_id"> {{ cat.name }} </option>
                </select>
            </div>

            <div class="margens">
                <label>Description</label>
                
                <input v-id="props.description" type="text" v-model="description" class="form-control">
                
            </div>

            <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
            
            
        </div>

    </form>
  </div>

</template>
     
<style scoped>

.transaction {
    padding: 0.6rem;
    border-color: rgb(204, 204, 204);
    border-style: solid;
    border-width: 0.1rem;
    border-radius: 0.6rem;
    margin-bottom: 1rem;
}

.transaction .transaction-header {
    display: flex;
    flex-direction: row;
    align-items: left;
}

.transaction .transaction-icon {
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;
}
.transaction .transaction-date {
    color: rgb(92, 92, 92);
}

.transaction .transaction-value {
    font-size: 2rem;
}
.margens{
    margin-bottom: 1rem;
    min-width: 25rem;
}
</style>
