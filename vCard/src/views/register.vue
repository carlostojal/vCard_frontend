<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import Menu from '../components/menu.vue'

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

const register = async () => {

    if(pin.value != ''){    
          
        flag_msgInvalid.value = false

        //validar pin

        //if(){   ->    Se o pin for valido

            const response = await axios.post('http://localhost:80/api/users',
            {
                name: name.value,
                email: email.value,
                password: password.value
            })

            console.log(response.data.status)
            if(response.data.menssage == "sucess"){
                console.log(response.data)
            }else{
                console.log(response.data)
            }

            //routing -> login page 
        //}
        return
    }
    
    flag_msgInvalid.value = true
    msgInvalid.value = "Please fill the pin field"
}

</script>



<template>
    <Menu> </Menu>
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
  max-width: 400px; /* Set the maximum width here */
  margin: 0 auto; /* Center the form horizontally */
  margin: 100px auto 0;
}
</style>
