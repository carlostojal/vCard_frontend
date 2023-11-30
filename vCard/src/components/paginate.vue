<script setup>
import { onMounted, ref } from 'vue';
import { defineProps } from 'vue';
import { useVcardsStore } from '@/stores/vcards';
import { useTransactionsStore } from '@/stores/transactions'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const transactionStore = useTransactionsStore();
const vcardStore = useVcardsStore();
const currentPage = ref();
const totalPages = ref();

onMounted(() => {
    currentPage.value = props.currentPage
    totalPages.value = props.totalPages
})


const props = defineProps({
    type: {
        type: String,
        required: true
    },
    totalPages: {
        required: true,
    },
    currentPage: {
        required: true,
    },
})
    

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        if(props.type == 'vcard'){
            vcardStore.paginate(page)
        }else if(props.type == 'transactions'){
            transactionStore.paginate(page)
        }
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        goToPage(--currentPage.value);
    }
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        goToPage(++currentPage.value);
    }
}   
    
    
    
</script>

<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-outline-secondary">
      <i class="bi bi-arrow-left"></i> Prev
    </button>

    <span>{{ currentPage }} / {{ totalPages }}</span>

    <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-outline-secondary">
      Next <i class="bi bi-arrow-right"></i>
    </button>
  </div>
</template>





<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 2rem;
}

button {
  margin: 0 5px;
}
.custom-arrow {
  color: rgba(0, 0, 0, 0.5); /* Adjust the alpha value for transparency */
}
</style>
