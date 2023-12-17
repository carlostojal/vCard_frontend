<script setup>
import router from '../router';
import FormatUtil from '../utils/FormatUtil';
import { useToast } from 'vue-toastification';

const props = defineProps({
    entityName: {
        type: String,
        required: false
    },
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: { // "C" for credit, "D" for debit
        type: String,
        required: true
    },
    paymentType: { // "IBAN" or "VCARD"
        type: String,
        required: true
    },
    isDetail: { // if true, show the details of the transaction
        type: Boolean,
        required: false,
        default: false
    },
    description: {
        type: String,
        required: false
    },
    pair_vcard: {
        type: String,
        required: true
    },
    old_balance: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
});

const toast = useToast()

const data = {
    type: props.type,
    paymentType: props.paymentType,
}

const routeEditTrans = () => {
    if(props.type == 'D'){
        router.push({ name: 'editTransaction', params: { id: props.id } })
    }else{
        toast.error("You can not edit a credit transaction")
    }
}

</script>
<template>
    
    <div class="transaction">
        <div class="transaction-header">
            <img v-if="props.type == 'D'" class="transaction-icon" src="/icons/arrow-bar-up.svg" />
            <img v-else class="transaction-icon" src="/icons/arrow-bar-down.svg" />

            <img v-if="props.paymentType == 'VCARD'" class="transaction-icon" src="/icons/phone.svg" />
            <img v-if="props.paymentType == 'IBAN'" class="transaction-icon" src="/icons/bank.svg" />
            <img v-if="props.paymentType == 'VISA'" class="transaction-icon" src="/icons/credit-card.svg" />
            <img v-if="props.paymentType == 'MB'" class="transaction-icon" src="/icons/credit-card.svg" />
        </div>
        <p class="transaction-value"><b>{{ FormatUtil.formatBalance(props.value) }}</b></p>
        <p class="transaction-date">{{ FormatUtil.formatDate(props.date) }}</p>
        <div v-if="props.isDetail">
            <p class="details" v-if="props.type == 'D'"> <b>Balance:</b> €{{ props.old_balance }} (-{{ props.value }})</p>
            <p class="details" v-else> <b>Balance:</b> €{{ props.old_balance }} (+{{ props.value }})</p>

            <p v-if="props.description" class="details"> <b>Message:</b> {{ props.description }} </p>

            <!-- If Vcard -->
            <p class="details" v-if="props.type == 'D' && props.paymentType == 'VCARD'"> <b>To:</b> {{ props.pair_vcard }} </p>
            <p class="details" v-else-if="props.type == 'C' && props.paymentType == 'VCARD'"> <b>From:</b> {{ props.pair_vcard }} </p>

            <!-- If not Vcard -->
            <p class="details" v-else-if="props.type == 'D' && props.paymentType != 'VCARD'"> <b>To:</b> {{ props.reference }} </p>
            <p class="details" v-else-if="props.type == 'C' && props.paymentType != 'VCARD'"> <b>From:</b> {{ props.reference }} </p>

            <button class="btn btn-outline-secondary" @click="routeEditTrans">Edit Category/Description</button>
        </div>
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

.details{
    font-size: 1.1rem;
}
.transaction:hover {
    scale: 1.001;
    box-shadow: 0.3rem 0.3rem 0.6rem 0.6rem rgb(175, 175, 175);
    transition: 0.25s;
    transition-timing-function: ease-in-out;
}
</style>
