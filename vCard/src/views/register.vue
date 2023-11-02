<script setup>
import { ref, watch, onMounted } from 'vue'

const email = ref('')
const password = ref('')
const name = ref('')
const pin = ref('')

const msgInvalid = ref('')
const flag_msgInvalid = ref(false)
const flag_ValidateEmail = ref(false)


const validateFields = () => {

    if(name.value != '' || email.value != '' || password.value != ''){
        flag_ValidateEmail.value = true
        flag_msgInvalid.value = false
        return
    }
    flag_msgInvalid.value = true
    msgInvalid.value = 'Please fill in all fields'
    
}

const register = () => {

    if(pin.value != ''){    
          
        flag_msgInvalid.value = false

        //validar pin
        /*if(){ 
            //routing
        }*/
        return //enquanto nao tiver a verificação feita
    }
    
    flag_msgInvalid.value = true
    msgInvalid.value = "Please fill the pin field"
}

</script>



<template>
    <form>
        <div class="form-wrapper">

            <div v-if="flag_msgInvalid" class="alert alert-danger" role="alert">
                {{ msgInvalid }}
            </div>

            <h2 class="mb-4">REGISTER</h2>
            <div class="form-outline mb-4">
                <label class="form-label">Name</label>
                <input v-model="name" style="border-width: 2px; border-color: black;" class="form-control" />
            </div>
            
            <div class="form-outline mb-4">
                <label class="form-label">Email address</label>
                <input v-model="email" style="border-width: 2px; border-color: black;" class="form-control" />
            </div>

            <div class="form-outline mb-4">
                <label class="form-label">Password</label>
                <input v-model="password" style="border-width: 2px; border-color: black;" type="password" class="form-control" />
            </div>

            <button @:click="validateFields" type="button" class="btn btn-primary btn-block mb-4">Sign in</button>
        </div>

        <div class="form-wrapper" v-if="flag_ValidateEmail">

            <h4 class="mb-4">Validate e-mail</h4>
            <div class="form-outline mb-4">
                <label class="form-label">PIN</label>
                <input v-model="pin" style="border-width: 2px; border-color: black;" class="form-control" />
            </div>
            <button @:click="register" type="button" class="btn btn-primary btn-block mb-4">Validate</button>
        </div>
        
    </form>
</template>



<style scoped>

.form-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
