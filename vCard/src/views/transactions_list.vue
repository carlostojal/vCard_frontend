<script setup>
import Menu from '../components/menu.vue'
import { ref, onMounted } from 'vue';
import { useTransactionsStore } from '@/stores/transactions'

const transactionsStore = useTransactionsStore()
const array_transactions = ref([])

onMounted(async () => {
    await transactionsStore.getAll()
    array_transactions.value = transactionsStore.transactions
    console.log(array_transactions.value)
})

</script>


<template>
<Menu> </Menu>
    <div class="container">
        <div class="row justify-content-center">
            <div style="margin-top:3rem" >
                <h2 class="margens">My Transactions</h2>
            </div>

            <div style="margin-top:1rem" class="container">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>To</th>
                        <th>Value</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="transaction in array_transactions" :key="transaction.id">
                        <td>{{ transaction.id }}</td>
                        <td>{{ transaction.pair_vcard }}</td>
                        <td>{{ transaction.value }}</td>
                        <td>{{ transaction.date }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>


<style scoped>

</style>