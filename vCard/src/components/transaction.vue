<script setup>

import FormatUtil from '../utils/FormatUtil';

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
        type: Number,
        required: true
    }
});

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
            <p class="transaction-entity">{{ props.entityName }}</p>
        </div>
        <p class="transaction-value"><b>{{ FormatUtil.formatBalance(props.value) }}</b></p>
        <p class="transaction-date">{{ FormatUtil.formatDate(props.date) }}</p>
        <div v-if="props.isDetail">
            <p class="details" v-if="props.type == 'D'"> <b>Balance:</b> €{{ props.old_balance }} (-{{ props.value }})</p>
            <p class="details" v-else> <b>Balance:</b> €{{ props.old_balance }} (+{{ props.value }})</p>
            <p v-if="props.description" class="details"> <b>Description:</b> {{ props.description }} </p>
            <p class="details"> <b>From:</b> {{ props.pair_vcard }} </p>
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
</style>