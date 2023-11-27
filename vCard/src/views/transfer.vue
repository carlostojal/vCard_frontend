<script setup>
import { ref, onMounted } from 'vue';
import Menu from '../components/menu.vue'
import { useUserStore } from '@/stores/user'
import { useTransactionsStore} from '@/stores/transactions'
import { useToast } from 'vue-toastification'
import router from '../router'

const toast = useToast()
const user = useUserStore();
const transaction = useTransactionsStore();
const phone_number = ref('')
const amount = ref('')
const description = ref('')
const pin = ref('')
const isPin = ref(false)
const payment_type_array = ref(["VCARD", "MBWAY", "PAYPAL", "IBAN", "MB", "VISA"])
const payment_type = ref('')

onMounted(() => {
    fetchUser()
})

const fetchUser = async () => {
    await user.fetch().catch((e) => {
        console.error('Error getting user data: ' + e)
    })
}

const validatePin = async () => {

    if(pin.value.length >= 3){
        const response = await transaction.sendMoneyTo(amount.value, phone_number.value, pin.value, payment_type.value, description.value)

        if(response == 'success'){
            toast.success("Money sent successfully")
            fetchUser() //para carregar as novas transações do user para a home
            router.replace('/home')
        }else{
            toast.error(response.data)
            return false
        }
    }else{
       toast.warning("Pin must be 4 digits")
        return false 
    }
}

const validationFields = () => {

    if(phone_number.value.length != 9){
        toast.warning("Phone number must be 9 digits")
        return false
    }

    if(amount.value < 1 ){
        toast.warning("Amount must be greater than 0")
        return false
    }

    if(amount.value > user.balance){
        toast.warning("Amount must be less than your balance")
        return false 
    }

    if(payment_type.value == ''){
        toast.warning("Payment type must be selected")
        return false 
    }

    isPin.value = true
}

</script>


<template>
    <Menu> </Menu>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2 class="margens">Transfer Money</h2>

                <form @submit.prevent="validationFields">
                    <div class="mb-3">
                        <label for="phoneNumber" class="form-label">Phone Number:</label>
                        <input type="text" id="phoneNumber" v-model="phone_number" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="amount" class="form-label">Amount:</label>
                        <input type="number" id="amount" v-model="amount" class="form-control" required min="1">
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <input type="text" id="description" v-model="description" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="payment" class="form-label">Payment Type:</label>
                        <select v-model="payment_type" id="payment" class="form-control">
                            <option v-for="p_type in payment_type_array" :key="p_type" :value="p_type">
                                {{ p_type }}
                            </option>
                        </select>
                    </div>

                    <button type="submit" class="btn btn-primary">Transfer Money</button>
                </form>

                <div style="margin-top: 2rem"> 
                <form v-show="isPin" @submit.prevent="validatePin">
                    <div class="mb-3">
                        <label for="pin" class="form-label">Pin:</label>
                        <input type="password" id="pin" v-model="pin" class="form-control" required>
                    </div>

                    <button type="submit" class="btn btn-primary">Verify Pin</button>
                </form>
            </div>
            </div>
        </div>
  </div>
</template>



<style scoped>
.margens{
    margin-top: 5rem; 
    margin-bottom: 2rem;
}
.container {
    margin-top: 20px;
}
</style>
