<script setup>

import FormatUtil from '../utils/FormatUtil';

const props = defineProps({
    originName: {
        type: String,
        required: false
    },
    value: {
        type: Number,
        required: true
    },
    type: { // "C" for credit, "D" for debit
        type: String,
        required: true
    }
});

</script>
<template>

    <div class="transaction">
        <i class="transaction-icon {{ props.type == 'C' ? 'arrow-bar-down' : 'arrow-bar-up' }}"></i>
        <div class="transaction-title">
            <p class="transaction-origin">{{ props.originName }}</p>
            <p class="transaction-value">{{ FormatUtil.formatBalance(props.value) }}</p>
        </div>
    </div>
</template>