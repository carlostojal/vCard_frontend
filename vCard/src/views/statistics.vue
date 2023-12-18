<script setup>
import { ref, onMounted} from 'vue'
import { Bar, Pie } from 'vue-chartjs'
import Menu from '../components/menu.vue'
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios'
import ConfigUtil from '../utils/ConfigUtil';
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = [2020, 2021, 2022, 2023, 2024, 2025]

const creditChecked = ref(true);
const debitChecked = ref(true);
const radioCheck = ref('month');
var categoryWithMostMoneySpent = ref('');
var percentageOfCategoryOfMostMoneySpent = ref('');
var categoryWithMostMoneyReceived = ref('');
var percentageOfCategoryOfMostMoneyReceived = ref('');

ChartJS.register(ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = ref({
    labels: [],
    datasets: []
})
const piechartDataC = ref({
    labels: [],
    datasets: []
})

const piechartDataD = ref({
    labels: [],
    datasets: []
})
const piechartDataCatD = ref({
    labels: [],
    datasets: []
})
const piechartDataCatC = ref({
    labels: [],
    datasets: []
})

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
                const response = await axios.get(`${ConfigUtil.getApiUrl()}/statistics/DebitPerYear`, {
                    headers: {
                        Authorization: `Bearer ${userStore.token}`
                    }
                });
                const keys = Object.keys(response.data.data[0]);

                keys.forEach(key => {
                    dataD[key] = response.data.data[0][key]
                });
                newData.datasets.push({
                    label: "Debit",
                    data: dataD,
                    backgroundColor: '#f87979',
                })
            }
            if (creditChecked.value === true) {
                dataC = Array.from({ length: 6 }, () => 0);
                const response = await axios.get(`${ConfigUtil.getApiUrl()}/statistics/CreditPerYear`, {
                    headers: {
                        Authorization: `Bearer ${userStore.token}`
                    }
                });
                const keys = Object.keys(response.data.data[0]);

                keys.forEach(key => {
                    dataC[key] = response.data.data[0][key]
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
                const response = await axios.get(`${ConfigUtil.getApiUrl()}/statistics/DebitPerMonth`, {
                    headers: {
                        Authorization: `Bearer ${userStore.token}`
                    }
                });
                const keys = Object.keys(response.data.data[0]);

                keys.forEach(key => {
                    dataD[key] = response.data.data[0][key]
                });
                newData.datasets.push({
                    label: "Debit",
                    data: dataD,
                    backgroundColor: '#f87979',
                })
            }
            if (creditChecked.value === true) {
                dataC = Array.from({ length: 12 }, () => 0);
                const response = await axios.get(`${ConfigUtil.getApiUrl()}/statistics/CreditPerMonth`, {
                    headers: {
                        Authorization: `Bearer ${userStore.token}`
                    }
                });
                const keys = Object.keys(response.data.data[0]);

                keys.forEach(key => {
                    dataC[key] = response.data.data[0][key]
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
const pieData = async () => {
    try {

        const payment_Types = ["VCARD", "MBWAY", "PAYPAL", "IBAN", "MB", "VISA"]
        const paymentTypeValueD = new Array(payment_Types.length).fill(0);
        const paymentTypeValueC = new Array(payment_Types.length).fill(0);
        var newDataC = {    
            labels: payment_Types,
            datasets: []
        };
        var newDataD = {
            labels: payment_Types,
            datasets: []
        }


        const responseD = await axios.get(`${ConfigUtil.getApiUrl()}/statistics/MoneySpentPerCard`, {
            headers: {
                Authorization: `Bearer ${userStore.token}`
            }
        });
        const responseC = await axios.get(`${ConfigUtil.getApiUrl()}/statistics/MoneyReceivedPerCard`, {
            headers: {
                Authorization: `Bearer ${userStore.token}`
            }
        });
        var keys = Object.keys(responseC.data.data[0]);

        keys.forEach(key => {
            const index = payment_Types.indexOf(key);
            if (index !== -1) {
                paymentTypeValueC[index] += responseC.data.data[0][key];
            }
        });
        keys = Object.keys(responseD.data.data[0]);
        keys.forEach(key => {
            const index = payment_Types.indexOf(key);
            if (index !== -1) {
                paymentTypeValueD[index] += responseD.data.data[0][key];
            }
        });
        newDataC.datasets.push({ backgroundColor: ['#FCBA03', '#FC0328', '#BFF2eC', '#FF6384', '#36A2EB', '#9130C9'], data: paymentTypeValueC })
        newDataD.datasets.push({ backgroundColor: ['#FCBA03', '#FC0328', '#BFF2eC', '#FF6384', '#36A2EB', '#9130C9'], data: paymentTypeValueD })
        piechartDataC.value = newDataC
        piechartDataD.value = newDataD
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}
function generateRandomColors(count) {
    const colors = [];

    for (let i = 0; i < count; i++) {
        const color = '#' + Math.floor(Math.random()*16777215).toString(16);
        colors.push(color);
    }

    return colors;
}
const categoriesData = async () => {

    try {
        const response = await axios.get(`${ConfigUtil.getApiUrl()}/statistics/CategoriesSpent`, {
            headers: {
                Authorization: `Bearer ${userStore.token}`
            }
        });
        percentageOfCategoryOfMostMoneySpent = response.data.data.perc
        categoryWithMostMoneySpent.value = response.data.data.maxCategory
        var newData = {
            labels: [],
            datasets: []
        }
        var keys = Object.keys(response.data.data[0]);
        var labels = []
        var data = []
        keys.forEach(key => {
                labels.push(key)
                data.push(response.data.data[0][key])
        });
        newData.labels = labels
        newData.datasets.push({ backgroundColor: generateRandomColors(keys.length), data: data })
        piechartDataCatD.value = newData

        const responseC = await axios.get(`${ConfigUtil.getApiUrl()}/statistics/CategoriesReceived`, {
            headers: {
                Authorization: `Bearer ${userStore.token}`
            }
        });
        percentageOfCategoryOfMostMoneyReceived = responseC.data.data.perc
        categoryWithMostMoneyReceived.value = responseC.data.data.maxCategory
        var newDataC = {
            labels: [],
            datasets: []
        }
        var keys = Object.keys(responseC.data.data[0]);
        labels = []
        data = []
        keys.forEach(key => {
                labels.push(key)
                data.push(responseC.data.data[0][key])
        });
        newDataC.labels = labels
        newDataC.datasets.push({ backgroundColor: generateRandomColors(keys.length), data: data })
        piechartDataCatC.value = newDataC
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}
onMounted(async () => {
    await refreshTable()
    await pieData()
    await categoriesData()

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
                        @click="refreshTable();" />
                    <label for="byYearMonthCheckbox">By Year</label>
                </div>
                <div class="checkbox-item">
                    <input type="radio" name="Order By" v-model="radioCheck" value="month" id="radioButtonMonth"
                        @click="refreshTable();" checked />
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
    <div v-if="percentageOfCategoryOfMostMoneySpent<0">
        <h2 style="justify-content: left; text-align: left;margin-top: 50px;margin-bottom: 100px;margin-left: 20px;">Category
            with most money spent : <h4 style="margin-top: 20px;">
                <u>{{ categoryWithMostMoneySpent }}</u> with a percentage of <u>{{ percentageOfCategoryOfMostMoneySpent }} %</u>
            </h4>
        </h2>
        <div class="container">

            <div class="graph-div-pie">
                <Pie :data="piechartDataCatD" :options="piechartOptions"></Pie>
            </div>
        </div>
    </div>
    <div v-if="percentageOfCategoryOfMostMoneyReceived < 0">
        <h2 style="justify-content: left; text-align: left;margin-top: 50px;margin-bottom: 100px;margin-left: 20px;">Category
            with most money Received : <h4 style="margin-top: 20px;">
                <u>{{ categoryWithMostMoneyReceived }}</u> with a percentage of <u>{{ percentageOfCategoryOfMostMoneyReceived }} %</u>
            </h4>
        </h2>
        <div class="container">
            <div class="graph-div-pie">
                <Pie :data="piechartDataCatC" :options="piechartOptions"></Pie>
            </div>  
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
}</style>