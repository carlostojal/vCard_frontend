<script setup>
import Menu from '@/components/menu.vue'
import { useUserStore } from '@/stores/user'
import {ref} from 'vue';
import FormatUtil from '@/utils/FormatUtil'
import { useTransactionsStore} from '@/stores/transactions'
import { useToast } from 'vue-toastification'
const user = useUserStore()
const amount = ref('')
const sendmoney = async () => {
    const userStore = useUserStore();
    const useTransactions = useTransactionsStore()
    const toast = useToast()
    try {
        
        const reference = ref('')
            if(payment_type.value == 'Banco Alimentar'){
                reference.value = '999999997'
            }
            if(payment_type.value == 'Cruz Vermelha'){
                reference.value = '999999998'
            }
            if(institution.value == 'Instituição Frederico Mendonça'){
                reference.value = '999999999'
            }
            response = await useTransactions.sendMoneyTo(amount.value, reference.value, user.pin,'VCARD', 'Donation')
        } catch(e) {
            console.log(user.pin)
            toast.error("Error sending money: " + e.message);
        }

}

const institution = ref('');

</script>
<template>
  
    <Menu> </Menu>

    <div class="container">
        <div class="header">
            <h1 class="welcome">Hello, {{ FormatUtil.formatFirstName(user.name) }}</h1>
        </div>
    </div>

    <div class="container" style="margin-top: 5rem;">

      <div class="card" @click="institution = 'Instituição Frederico Mendonça'"><h2>Instituição Frederico Mendonça</h2><p>The Foundation Of Instituição Frederico Mendoça helps bring new dreams tochildren in need</p></div>
      <div class="card" @click="institution = 'Cruz Vermelha'"><h2>Cruz Vermelha</h2><p>Globally recognized humanitarian organization dedicated to alleviating human suffering and promoting peace and well-being.</p></div>
      <div class="card" @click="institution = 'Banco Alimentar'"><h2>Banco Alimentar</h2><p>Welcome to Banco Alimentar, where we are dedicated to fighting hunger and nourishing communities. As a leading nonprofit organization, Banco Alimentar strives to create a world where no one goes to bed hungry.</p></div>     
    </div>

    <div style="justify-content: center; text-align: center;margin-top: 20px;">
        <h3><p>Institution: {{ institution }}</p></h3>
    </div>
    <div style="justify-content: center; text-align: center;">
        <h3><p>Amount: </p></h3><input type="number" v-model="amount">
    </div>
    <div style="justify-content: center; text-align: center;margin-top: 20px;">
        <button @click="sendmoney()" class="styled-button">Donate</button>
    </div>
</template>

<style scoped>
.container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      max-width: 800px;
      width: 100%;
      margin: 0 auto;
    }
.card:hover {
      transform: scale(1.05);
    }
.card {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      text-decoration: none;
      color: #333;
      transition: transform 0.2s;
    }
.welcome {
  font-size: 3rem;
  margin: 1rem 0 0.7rem 0;
}

.transactions {
  margin-top: 2rem;
}

body {
    background-image: url("/img/gear.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0;
    padding: 0;
}
.styled-button {
      display: inline-block;
      padding: 12px 24px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s, transform 0.3s;
      background-color: #3498db;
      color: #fff;
      border: 2px solid #3498db;
    }

    .styled-button:hover {
      background-color: #2980b9;
      transform: scale(1.1);
    }
</style>
