<script setup>
import { ref, onMounted, computed } from 'vue'
import { Bar, Pie } from 'vue-chartjs'
import Menu from '../components/menu.vue'
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios'
import { useTransactionsStore } from '@/stores/transactions'

const transactionsStore = useTransactionsStore();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = [2020, 2021, 2022, 2023, 2024, 2025]

const creditChecked = ref(true);
const debitChecked = ref(true);
const byYearChecked = ref(false);
const byMonthChecked = ref(true);
const radioCheck = ref('month');
ChartJS.register(ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const fetchData = async () => {
    try {
        await transactionsStore.fetch();
        console.log("BAWDAD")

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchData()

const chartData = ref({
    labels: [],
    datasets: []
})

const payment_Types = ["VCARD", "MBWAY", "PAYPAL", "IBAN", "MB", "VISA"]

const paymentTypeValueD = new Array(payment_Types.length).fill(0);

const paymentTypeValueC = new Array(payment_Types.length).fill(0);



transactionsStore.myTransactions.forEach((obj) => {
    if (obj.type === "D") {
        const index = payment_Types.indexOf(obj.payment_type);
        if (index !== -1) {
            paymentTypeValueD[index] += obj.value;
        }
    }
});
transactionsStore.myTransactions.forEach((obj) => {
    if (obj.type === "C") {
        const index = payment_Types.indexOf(obj.payment_type);
        if (index !== -1) {
            paymentTypeValueC[index] += obj.value;
        }
    }
});

const piechartDataD = ref({
    labels: payment_Types,
    datasets: [{ backgroundColor: ['#FCBA03', '#FC0328', '#BFF2eC', '#FF6384', '#36A2EB', '#9130C9'], data: paymentTypeValueD }]
})
const piechartDataC = ref({
    labels: payment_Types,
    datasets: [{ backgroundColor: ['#FCBA03', '#FC0328', '#BFF2eC', '#FF6384', '#36A2EB', '#9130C9'], data: paymentTypeValueC }]
})
const refreshTable = async () => {
    await transactionsStore.fetch();
    console.log(transactionsStore.myTransactions)
    var sumArrayCredit
    var sumArrayDebit
    var newData = {
        labels: [],
        datasets: []
    };
    if (radioCheck.value == 'year') {
        newData.labels = years;
        console.log(newData)
    }
    if (radioCheck.value == 'month') {
        newData.labels = months
    }
    if (creditChecked.value === true) {
        let filteredObjects = transactionsStore.myTransactions.filter(obj => obj.type === 'C');
        if (radioCheck.value == 'month') {
            sumArrayCredit = Array.from({ length: 12 }, () => 0);
            filteredObjects.forEach(obj => {
                const date = new Date(obj.date);
                const monthIndex = date.getMonth();
                sumArrayCredit[monthIndex] += obj.value;
            });
            newData.datasets.push({
                label: "Credit",
                data: sumArrayCredit,
                backgroundColor: '#2598b8',
            });
        }
        if (radioCheck.value == 'year') {
            sumArrayCredit = Array.from({ length: 6 }, () => 0);
            filteredObjects.forEach(obj => {
                const date = new Date(obj.date);
                const year = date.getFullYear();
                sumArrayCredit[years.findIndex(y => y == year)] += obj.value;
            });
            newData.datasets.push({
                label: "Credit",
                data: sumArrayCredit,
                backgroundColor: '#2598b8',
            });
        }
        //console.log(filteredObjects);
    }
    if (debitChecked.value === true) {
        let filteredObjects = transactionsStore.myTransactions.filter(obj => obj.type === 'D');
        if (radioCheck.value == 'month') {
            sumArrayDebit = Array.from({ length: 12 }, () => 0);
            filteredObjects.forEach(obj => {
                const date = new Date(obj.date);
                const monthIndex = date.getMonth();
                sumArrayDebit[monthIndex] += obj.value;
            });
            newData.datasets.push({
                label: "Debit",
                data: sumArrayDebit,
                backgroundColor: '#f87979',
            })
        }
        if (radioCheck.value == 'year') {
            sumArrayDebit = Array.from({ length: 6 }, () => 0);
            filteredObjects.forEach(obj => {
                const date = new Date(obj.date);
                const year = date.getFullYear()
                sumArrayDebit[years.findIndex(x => x == year)] += obj.value;
            });
            newData.datasets.push({
                label: "Debit",
                data: sumArrayDebit,
                backgroundColor: '#f87979',
            })
        }
        console.log(sumArrayCredit)
    }
    console.log(radioCheck.value)
    chartData.value = newData
    console.log(creditChecked.value)
}
//function returns months in transactions
function monthsInTransactions() {
    let uniqueMonths = [...new Set(transactionsStore.myTransactions.map(item => new Date(item.date).toLocaleString('default', { month: 'long' })))];
    return uniqueMonths
}

const piechartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
});
const chartOptions = ref({
    scales: {
        x: {
            beginAtZero: true,
        },
        y: {
            beginAtZero: true,
        },
    },
});


onMounted(async () => {
    await refreshTable()
})
</script>
 
<template>
    <Menu />
    <div class="container">
        <div class="sidebar">
            <div class="category">
                <h3>Transaction:</h3>
                <div class="checkbox-item">
                    <input type="checkbox" id="creditCheckbox" :class="{ checked: creditChecked }"
                        @click="creditChecked = !creditChecked; refreshTable()" checked />
                    <label for="creditCheckbox">Credit</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="debitCheckbox" :class="{ checked: debitChecked }"
                        @click="debitChecked = !debitChecked; refreshTable()" checked />
                    <label for="debitCheckbox">Debit</label>
                </div>
            </div>
            <div class="category">
                <h3>Order By:</h3>
                <div class="checkbox-item">
                    <input type="radio" name="Order By" v-model="radioCheck" value="year" id="radioButtonYear"
                        :class="{ checked: byYearChecked }" @click="refreshTable()" />
                    <label for="byYearMonthCheckbox">By Year</label>
                </div>
                <div class="checkbox-item">
                    <input type="radio" name="Order By" v-model="radioCheck" value="month" id="radioButtonMonth"
                        :class="{ checked: byMonthChecked }" @click="refreshTable()" checked />
                    <label for="totalCheckbox">By Month</label>
                </div>
            </div>
        </div>
        <div class="graph-div">
            <Bar v-model:data="chartData" :options="chartOptions"></Bar>
        </div>

    </div>
    <h3 style="justify-content: center; text-align: center;">Money Spent</h3>
    <div class="container">

        <div class="graph-div-pie">
            <Pie :data="piechartDataD" :options="piechartOptions"></Pie>
        </div>
    </div>
    <h3 style="justify-content: center; text-align: center;">Money Received</h3>
    <div class="container">

        <div class="graph-div-pie">
            <Pie :data="piechartDataC" :options="piechartOptions"></Pie>
        </div>
    </div>
</template>
  
<style scoped>
.container {
    display: flex;
    align-items: center;
}

.sidebar {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
}

.category {
    margin-bottom: 20px;
}

.category h3 {
    font-size: 1.2em;
    margin-bottom: 5px;
}

.checkbox-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.checkbox-item input {
    margin-right: 8px;
}

.graph-div {
    position: relative;
    margin-top: 10px;
    width: 80%;
    height: 100%;
}

.graph-div-pie {
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 10px;
    justify-content: center;
    width: 80%;
    height: 100%;
}
</style>