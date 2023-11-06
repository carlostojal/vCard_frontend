<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import Menu from '../components/menu.vue'
import ConfigUtil from '../utils/ConfigUtil';

const email = ref('')
const password = ref('')
const name = ref('')
const url_login = ref('./login')

const msgInvalid = ref('')
const flag_msgInvalid = ref(false)

const register = async () => {

    if(name.value != '' && email.value != '' && password.value != ''){
        flag_msgInvalid.value = false

        const response = await axios.post(`${ConfigUtil.getApiUrl()}/users`,
        {
            name: name.value,
            email: email.value,
            password: password.value
        })
        if(response.data.status == "sucess"){
            window.location.href = url_login.value
        }else{
            flag_msgInvalid.value = true
            msgInvalid.value = response.data.message
        }
    }else{
        flag_msgInvalid.value = true
        msgInvalid.value = 'Please fill in all fields'
    }
    
    return
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

            <button @click.prevent="register" type="button" class="btn btn-primary btn-block mb-4">Sign in</button>
            <button href="./login" type="button" class="btn btn-outline-secondary">Go to Login</button>
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
