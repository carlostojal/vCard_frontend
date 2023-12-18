<script setup>
import Paginate from '@/components/paginate.vue'
import Menu from '@/components/menu.vue'
import Transaction from '@/components/transaction.vue'
import Search from '@/components/search.vue'
import { useTransactionsStore } from '@/stores/transactions'
import { onMounted, ref } from 'vue'

const transactionsStore = useTransactionsStore();

onMounted( async () => {
    await transactionsStore.fetchAllTransactionType('all')
})

const download = async () => {
    await transactionsStore.extractPDF(selected_month.value, selected_year.value);
}

const extractFlag = ref(false)
const months = ref(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
const selected_year = ref(null)
const selected_month = ref(null)

</script> 


<template>
<Menu> </Menu>
<Search :type="'transaction'"></Search>

    <div class="container">
        <div class="row justify-content-center">
            <div style="margin-top:3rem">
                <h2 class="margens">All Transactions</h2>

                <button @click="extractFlag = true" class="btn btn-outline-secondary" style="margin-top: 1rem;">
                  Extract PDF Monthly
                </button>
            </div>

            <div class="transactions">
                <div class="transactions-list">
                    <Transaction v-if="transactionsStore.allTransactions" v-for="transaction in transactionsStore.allTransactions" @click="transaction.detail = !transaction.detail" :isDetail="transaction.detail" :type="transaction.type" :paymentType="transaction.payment_type" :value="transaction.value" :date="transaction.date" :description="transaction.description" :old_balance="transaction.old_balance" :reference="transaction.payment_reference" :vcard="transaction.vcard" :category="transaction.category_id"/>
                </div>
            </div>
            <Paginate v-if="transactionsStore.lastPage" :type="'allTransactions'" :totalPages="transactionsStore.lastPage" :currentPage="1"> </Paginate>
        </div>
    </div>


    <!-- POPUP EDIT -->
    <div v-if="extractFlag">
        <div class="overlay" @click="extractFlag = false"></div>
        <div class="popup">
            <h2>Download Monthly Extract</h2>

            <label style="margin-top: 1rem;">Month</label>
            <select v-model="selected_month" class="form-select size" aria-label="">
                <option v-for="(month, id) in months" :key="id" :value="id+1"> 
                    {{ month }}
                </option>
            </select>
            
            <label style="margin-top: 0.9rem;">Year</label>
            <input v-model="selected_year" type="number" class="form-control" id="yearInput" placeholder="Year">

            <label >Vcard</label>
            <input v-model="selected_phone" type="number" class="form-control" id="yearInput" placeholder="Phone Number">

            <button style="margin-bottom: 1rem; margin-top: 1rem;" @click="download">Download</button>
            <button @click="extractFlag = false">Cancel</button>
        </div>
    </div>


</template>


<style scoped>
.overlay {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.popup {
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  flex-direction: column;

}
.popup label {
  display: block;
  margin-bottom: 10px;
}

.popup input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
}

.popup button {
  padding: 10px;
  border: none;
  cursor: pointer;
}
.transactions {
  margin-top: 2rem;
}
</style>