<script setup>
import { ref, onMounted } from 'vue';
import Menu from '../components/menu.vue'
import { useUserStore } from '@/stores/user'
import { useTransactionsStore} from '@/stores/transactions'
import { useToast } from 'vue-toastification'
import router from '../router'
import { useCategoriesStore } from '@/stores/categories'

const categoryStore = useCategoriesStore();
const toast = useToast()
const user = useUserStore();
const transaction = useTransactionsStore();
const reference = ref('')
const entity = ref('')
const amount = ref('')
const description = ref('')
const pin = ref('')
const isPin = ref(false)
const payment_type_array = ref(["VCARD", "MBWAY", "PAYPAL", "IBAN", "MB", "VISA"])
const payment_type = ref('VCARD')
const category_id = ref(null)

const regexVerifyEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
onMounted(() => {
    fetchUser()
    categoryStore.fetchAndFilterVcardCategoriesAll(null, null);
})

const fetchUser = async () => {
    await transaction.fetch().catch((e) => {
        console.error('Error getting user data: ' + e)
    })
}

const validatePin = async () => {
    if(validationFields() == false){
        return false
    }
    if(pin.value.length >= 3){
        let response = "";
        let ref = reference.value
        try {
            if(payment_type.value == 'MB'){
                ref = entity.value + '-' + ref
            }
            response = await transaction.sendMoneyTo(amount.value, ref, pin.value, payment_type.value, description.value, category_id.value)
        } catch(e) {
            toast.error("Error sending money: " + e.message);
        }

        if(response.status == 'success'){
            toast.success("Money sent successfully")
            fetchUser() //para carregar as novas transações do user para a home
            router.replace('/home')
        }
    }else{
       toast.warning("Pin must be 4 digits")
        return false 
    }
}


const validationFields = () => {
    String.prototype.isNumber = function(){return /^\d+$/.test(this);}
    reference.value = reference.value.toString()

    switch(payment_type.value) {
        case '':
            toast.warning("Payment type must be selected")
            return false 
        case 'VCARD' || 'MBWAY':
            if(reference.value.length != 9){
                toast.warning("Phone number must be 9 digits")
                return false
            }
            if(reference.value[0] != '9'){
                toast.warning("Phone number must start with 9")
                return false
            }
            if(!reference.value.isNumber()){
                toast.warning("Phone number must use only numbers")
                return false
            }
            break;
        case 'MB':
            if(entity.value.length != 5){
                toast.warning("Entity must be 5 digits long")
                return false
            }
            if(!entity.value.isNumber()){
                toast.warning("Entity must be only numbers")
                return false
            }
            if(reference.value.length != 9){
                toast.warning("Reference must be 9 digits")
                return false
            }
            if(!reference.value.isNumber()){
                toast.warning("Reference must use only numbers")
                return false
            }
            break;
        case 'VISA':
            if(!reference.value.isNumber()){
                toast.warning("Reference must use only numbers")
                return false
            }
            if(reference.value[0] != 4){
                toast.warning("Reference must start with the number 4")
                return false
            }
            if(reference.value.length != 16){
                toast.warning("Reference must 16 digits long")
                return false
            }
            break;
        case 'PAYPAL':
            if(!regexVerifyEmail.test(reference.value)){
                toast.warning("Email must be valid");
                return false
            }
            break;
        case 'IBAN':
            if(reference.value.slice(0, 2).isNumber()){
                toast.warning("IBAN must start with 2 letters");
                return false
            }
            if(!reference.value.slice(2, reference.value.length).isNumber()){
                toast.warning("IBAN must have 23 digits, not letters");
                return false
            }
            if(reference.value.length != 25){
                toast.warning("IBAN must be have 2 letters and 23 digits");
                return false
            }
            break;
    }
   
    if(amount.value < 1 ){
        toast.warning("Amount must be greater than 0")
        return false
    }

    if(amount.value > user.balance){
        toast.warning("Amount must be less than your balance")
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
                        <label for="payment" class="form-label">Payment Type:</label>
                        <select v-model="payment_type" id="payment" class="form-control" @change="PaymentTypeChange">
                            <option v-for="p_type in payment_type_array" :key="p_type" :value="p_type">
                                {{ p_type }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-3" v-if="payment_type == 'VCARD' || payment_type == 'MBWAY' || payment_type == ''">
                        <label for="reference" class="form-label">Phone Number:</label>
                        <input type="number" id="reference" v-model="reference" class="form-control" required>
                    </div>
                    <div class="mb-3" v-if="payment_type == 'MB'">
                        <div class="row">
                            <div class="col-md-5">
                              <label for="entity" class="form-label">Entity:</label>
                              <input type="text" id="entity" v-model="entity" class="form-control" maxlength="5" minlength="5" required>
                            </div>

                            <div class="col-md-7">
                              <label for="reference" class="form-label">Reference:</label>
                              <input type="text" id="reference" v-model="reference" class="form-control" maxlength="9" minlength="9" required>
                            </div>
                          </div>
                    </div>
                    <div class="mb-3" v-if="payment_type == 'PAYPAL'">
                        <label for="reference" class="form-label">Email:</label>
                        <input type="email" id="reference" v-model="reference" class="form-control" required>
                    </div>
                    <div class="mb-3" v-if="payment_type == 'IBAN'">
                        <label for="reference" class="form-label">IBAN:</label>
                        <input type="text" id="reference" v-model="reference" class="form-control" maxlength="25" required>
                    </div>
                    <div class="mb-3" v-if="payment_type == 'VISA'">
                        <label for="reference" class="form-label">VISA:</label>
                        <input type="text" id="reference" v-model="reference" class="form-control" maxlength="16" required>
                    </div>
                    <div class="mb-3">
                        <label for="amount" class="form-label">Amount:</label>
                        <input type="number" step="0.1" id="amount" v-model="amount" class="form-control" required min="1">
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Description:</label>
                        <input type="text" id="description" v-model="description" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Category:</label>
                        <select v-model="category_id" class="form-control">
                            <option v-for="cat in categoryStore.myCategories" :key="cat.id" :value="cat.id">
                                {{ cat.name }}
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
