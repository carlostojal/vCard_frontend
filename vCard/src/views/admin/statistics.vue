<script setup>
import Menu from '@/components/menu.vue'
import { ref, onMounted} from 'vue'
import { Bar, Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios'
import ConfigUtil from '../../utils/ConfigUtil';
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = [2020, 2021, 2022, 2023, 2024, 2025]
const currentMonthActiveVcards = ref('')
const thisMonthVcards = ref('')
const totalTransactions = ref('')
const totalSumOfBalances = ref('')
const piechartDataD = ref({
    labels: [],
    datasets: []
})

ChartJS.register(ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const creditChecked = ref(true);
const debitChecked = ref(true);
const byYearChecked = ref(false);
const byMonthChecked = ref(true);
const radioCheck = ref('month');
const chartData = ref({
    labels: [],
    datasets: []
})
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
const refreshTable = async () => {
    try {
        var dataC //data of credit to add to newData
        var dataD //data of debit to add to newData
        var newData = {     //New Data to add to chart
            labels: months,
            datasets: []
        };
        if (radioCheck.value == 'year') {
            newData.labels = years;
            if (debitChecked.value === true) {
                
                dataD = Array.from({ length: 6 }, () => 0);
                const response = await axios.get(`${ConfigUtil.getApiUrl()}/statistics/AllTransactionsDebitYear`, {
                    headers: {
                        Authorization: `Bearer ${userStore.token}`
                    }
                });
                response.data.data.forEach(key => {
                    dataD[key.year.toString().slice(-1)] = key.total_value
                });
                newData.datasets.push({
                    label: "Debit",
                    data: dataD,
                    backgroundColor: '#f87979',
                })
            }
            if (creditChecked.value === true) {
                dataC = Array.from({ length: 6 }, () => 0);
                const response = await axios.get(`${ConfigUtil.getApiUrl()}/statistics/AllTransactionsCreditYear`, {
                    headers: {
                        Authorization: `Bearer ${userStore.token}`
                    }
                });
                
                response.data.data.forEach(key => {
                    dataC[key.year.toString().slice(-1)] = key.total_value
                });
                newData.datasets.push({
                    label: "Credit",
                    data: dataC,
                    backgroundColor: '#2598b8',
                })
            }
        }
        if (radioCheck.value == 'month') {
            newData.labels = months
            if (debitChecked.value === true) {
                dataD = Array.from({ length: 12 }, () => 0);
                const response = await axios.get(`${ConfigUtil.getApiUrl()}/statistics/AllTransactionsDebit`, {
                    headers: {
                        Authorization: `Bearer ${userStore.token}`
                    }
                });

                response.data.data.forEach(key => {
                    dataD[key.month] = key.total_value
                });
                newData.datasets.push({
                    label: "Debit",
                    data: dataD,
                    backgroundColor: '#f87979',
                })
            }
            if (creditChecked.value === true) {
                dataC = Array.from({ length: 12 }, () => 0);
                const response = await axios.get(`${ConfigUtil.getApiUrl()}/statistics/AllTransactionsCredit`, {
                    headers: {
                        Authorization: `Bearer ${userStore.token}`
                    }
                });
                response.data.data.forEach(key => {
                    dataC[key.month] = key.total_value
                });
                newData.datasets.push({
                    label: "Credit",
                    data: dataC,
                    backgroundColor: '#2598b8',
                })
            }
        }
        chartData.value = newData
    } catch (error) {
        console.error('Error fetching data:', error);
    }



}
const loadData = async() =>{
    const response = await axios.get(`${ConfigUtil.getApiUrl()}/statistics/ActiveVcards`, {
                    headers: {
                        Authorization: `Bearer ${userStore.token}`
                    }
                });
    currentMonthActiveVcards.value = response.data.data.active
    thisMonthVcards.value = response.data.data.currentMonth
    totalTransactions.value = response.data.data.sumofTransactions
    totalSumOfBalances.value = response.data.data.sumOfBalance

    const payment_Types = ["VCARD", "MBWAY", "PAYPAL", "IBAN", "MB", "VISA"]
    const paymentTypeValueD = new Array(payment_Types.length).fill(0);
    var newDataD = {
            labels: payment_Types,
            datasets: []
        }
        response.data.data.transactionsByType.forEach(key => {
            const index = payment_Types.indexOf(key.type);
            if (index !== -1) {
                paymentTypeValueD[index] = key.total_value
            }
        })

        
        newDataD.datasets.push({ backgroundColor: ['#FCBA03', '#FC0328', '#BFF2eC', '#FF6384', '#36A2EB', '#9130C9'], data: paymentTypeValueD })
        piechartDataD.value = newDataD
}
const piechartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
});
onMounted(async () => {
    await refreshTable()
    await loadData()
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
                        :class="{ checked: byYearChecked }" @click="refreshTable();" />
                    <label for="byYearMonthCheckbox">By Year</label>
                </div>
                <div class="checkbox-item">
                    <input type="radio" name="Order By" v-model="radioCheck" value="month" id="radioButtonMonth"
                        :class="{ checked: byMonthChecked }" @click="refreshTable();" checked />
                    <label for="totalCheckbox">By Month</label>
                </div>
            </div>
        </div>
        <div class="graph-div">
            <Bar v-model:data="chartData" :options="chartOptions"></Bar>
        </div>
    </div>
    <h3 style="justify-content: center; text-align: center;">Transactions by Payment Type</h3>
    <h4 style="justify-content: center; text-align: center;">Total ({{totalTransactions  }})</h4>
    <div class="container">

        <div class="graph-div-pie">
            <Pie :data="piechartDataD" :options="piechartOptions"></Pie>
        </div>
    </div>
    <div  style="margin: 20px;margin-top:50px;margin-bottom: 50px;" class="container">
        <h3>The System Holds an amount of : {{ totalSumOfBalances }}€</h3>
    </div>
    <div class="container" style="margin: 20px;margin-bottom: 50px;">
        <h3>You Have <u>{{ currentMonthActiveVcards }}</u> Active Vcards on the platform <u>{{ thisMonthVcards }}</u> more than last month</h3>
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
}</style>