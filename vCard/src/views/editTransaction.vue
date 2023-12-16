<script setup>
import EditTransactionForm from '@/components/EditTransactionForm.vue'
import Menu from '@/components/menu.vue'
import { defineProps, onMounted } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'

const transactionsStore = useTransactionsStore();

const props = defineProps({
    id: {
        required: true
    },
});

onMounted( async () => {
    await transactionsStore.getTransaction(props.id)
    console.log("transactionsStore.transaction_edit", transactionsStore.transaction_edit)
})

</script>


<template>

    <Menu>  </Menu>
    <h2 class="container mt-5 d-flex justify-content-center">Edit Transaction</h2>
    <div class="container mt-5 d-flex justify-content-center">
           <EditTransactionForm v-if="transactionsStore.transaction_edit" :type="transactionsStore.transaction_edit.type" :paymentType="transactionsStore.transaction_edit.payment_type" :value="transactionsStore.transaction_edit.value" :date="transactionsStore.transaction_edit.date" :description="transactionsStore.transaction_edit.description" :category="transactionsStore.transaction_edit.category_id"> </EditTransactionForm>
    </div>


</template>
