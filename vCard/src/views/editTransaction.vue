<script setup>
import EditTransactionForm from '@/components/EditTransactionForm.vue'
import Menu from '@/components/menu.vue'
import { defineProps } from 'vue'

const props = defineProps({
    id: {
        required: true
    },
});




</script>


<template>

    <Menu>  </Menu>
    <a>{{ props.id }}</a>
    <h2 class="container mt-5 d-flex justify-content-center">Edit Transaction</h2>
    <div class="container mt-5 d-flex justify-content-center">
            <!--<EditTransactionForm :type="props.data.type" :paymentType="props.data.paymentType" :value="props.data.value" :date="props.data.date" :description="props.data.description" :category="props.data.category"> </EditTransactionForm>-->
    </div>


</template>
