<script setup>
import { onMounted, ref, watch } from 'vue';
import { defineProps } from 'vue';
import { useVcardsStore } from '@/stores/vcards';
import { useUsersStore } from '@/stores/users';
import { useTransactionsStore } from '@/stores/transactions'
import { useCategoriesStore } from '@/stores/categories'
import { usePaginateSearchStore } from '../stores/paginateSearch';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const paginateSearchStore = usePaginateSearchStore();
const categoriesStore = useCategoriesStore();
const transactionStore = useTransactionsStore();
const vcardStore = useVcardsStore();
const adminStore = useUsersStore();

const currentPage = ref();
const totalPages = ref();

const props = defineProps({
    currentPage: {
        required: true
    },
    totalPages: {
        required: true
    },
    type: {
        required: true
    }   
})

onMounted(() => {
    currentPage.value = props.currentPage
    totalPages.value = props.totalPages
})

//atualiza currentPage quando faz uma nova pesquisa
watch(() => props.currentPage, (newValue) => {
    currentPage.value = newValue
})
//atualiza totalPages quando faz uma nova pesquisa
watch(() => props.totalPages, (newValue) => {
    totalPages.value = newValue
})

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        switch(props.type){
            case 'vcard':
                // if(paginateSearchStore.query == null || paginateSearchStore.query == "" || paginateSearchStore.query == undefined){
                //     vcardStore.paginateType(page, paginateSearchStore.blocked) //vai buscar os dados da pagina com os filtros de type
                // }else{
                //     vcardStore.paginateSearch(page, paginateSearchStore.blocked, paginateSearchStore.query)
                // }
                vcardStore.fetchAndFilter(paginateSearchStore.query, paginateSearchStore.blocked, page);
                break;
            case 'allTransactions':
                if(paginateSearchStore.query == null || paginateSearchStore.query == "" || paginateSearchStore.query == undefined){
                    transactionStore.paginate_allTransactionsType(page, paginateSearchStore.trans_type)
                }else{
                    transactionStore.paginate_allTransactionsSearch(page, paginateSearchStore.trans_type, paginateSearchStore.query)
                }
                break;
            case 'myTransactions':
                if(paginateSearchStore.query == null || paginateSearchStore.query == "" || paginateSearchStore.query == undefined){
                    transactionStore.paginate_myTransactionsType(page, paginateSearchStore.myTrans_type)
                }else{
                    transactionStore.paginate_myTransactionsSearch(page, paginateSearchStore.myTrans_type, paginateSearchStore.query)
                }
                break;
            case 'categories':
                // if(paginateSearchStore.query == null || paginateSearchStore.query == "" || paginateSearchStore.query == undefined){
                //     categoriesStore.paginateType(page, paginateSearchStore.categorie_type)
                // }else{
                //     categoriesStore.paginateSearch(page, paginateSearchStore.categorie_type, paginateSearchStore.query)
                // }
                categoriesStore.fetchAndFilter(paginateSearchStore.query, paginateSearchStore.categorie_type, page);
                break;
            case 'myCategories':
                categoriesStore.fetchAndFilterVcardCategories(paginateSearchStore.query, paginateSearchStore.categorie_type, page);
                break;
            case 'admins':
                adminStore.fetchAdmins(page);
                break;
            default:
              console.log("Invalid type")
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
