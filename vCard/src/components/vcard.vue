<script setup>

import FormatUtil from '../utils/FormatUtil'

const props = defineProps({
    balance: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

</script>

<template>

    <div class="vcard">
        <h2 class="vcard-title balance"> {{ FormatUtil.formatBalance(props.balance) }} </h2>
        <div class="holder">
            <p class="phone">{{ props.phone }}</p>
            <p class="name">{{ props.name }}</p>
        </div>
        <div class="entity">
            <small>vCard</small>
        </div>
    </div>
</template>

<style scoped>

.vcard {
    padding: 1.3rem;
    background-image: linear-gradient(45deg, black, #636363be);
    color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    aspect-ratio: 16/10;
    height: 20rem;
    transition: 0.3s;
    cursor: default;
}

.vcard:hover {
    scale: 1.01;
    box-shadow: 0.3rem 0.3rem 0.6rem 0.6rem rgb(175, 175, 175);
    transition: 0.5s;
    transition-timing-function: ease-in-out;
}

.vcard .balance {
    font-size: 2.5rem;
    font-weight: bold;
    flex-grow: 4;
}

.vcard .holder {
    margin-top: 2rem;
    color: #a5a5a5;
    font-size: 1.2rem;
    flex-grow: 4;
    justify-self: center;
}

.vcard .holder .phone {
    margin-bottom: 0;
}

.vcard .holder .name {
    text-transform: uppercase;
}

.vcard .entity {
    font-size: 3rem !important;
    color: #797979 !important;
    flex-grow: 1;
    justify-self: flex-end;
    align-self: flex-end;
}

</style>
