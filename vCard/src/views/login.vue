<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import Menu from '../components/menu.vue'
import ConfigUtil from '../utils/ConfigUtil';
import router from '../router';
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();
const email = ref('')
const password = ref('')
const url_home = ref('./home')

const msgInvalid = ref('')
const flag_msgInvalid = ref(false)

const login = async () => {

    if(email.value != '' || password.value != ''){
        flag_msgInvalid.value = false

        console.log(`${ConfigUtil.getApiUrl()}/login`);

        //validar login
        try {
            const response = await axios.post(`${ConfigUtil.getApiUrl()}/users/login`,
            {
                email: email.value,
                password: password.value
            })

            console.log(response.data.status)
            if(response.data.status == "success"){ // login valido
              flag_msgInvalid.value = false
              console.log(response.data.message)
              msgInvalid.value = 'Admin Dashboard doesnt exists yet, '+response.data.message
              flag_msgInvalid.value = true
              userStore.setToken(response.data.data.access_token)
              router.replace(url_home);
            }else{ // login invalido
                msgInvalid.value = 'Invalid credentials, '+response.data.message
                flag_msgInvalid.value = true
            }
        }catch(error) {
            console.log(error)
            // msgInvalid.value = 'Invalid credentials, '+error.response.message
            msgInvalid.value = error.response.data.message;
            flag_msgInvalid.value = true
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


    <div class="container">
    <form>
      <div class="form-wrapper">

        <div v-if="flag_msgInvalid" class="alert alert-danger" role="alert">
            {{ msgInvalid }}
        </div>

        <h2 class="mb-4">Admin Login</h2>
        <div class="form-outline mb-4">
          <label class="form-label">Email address</label>
          <input v-model="email" style="border-width: 2px; border-color: black;" id="form2Example1" class="form-control" />
        </div>

        <div class="form-outline mb-4">
          <label class="form-label">Password</label>
          <input v-model="password" style="border-width: 2px; border-color: black;" type="password" id="form2Example2" class="form-control" />
        </div>

        <button @click.prevent="login" type="button" class="btn btn-primary btn-block mb-4">Log in</button>

        <!-- <div class="text-center"> -->
          <!-- <p>Not a member? <a href="./register">Register</a></p>  -->
        <!-- </div> -->
      </div>
    </form>
    </div>
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

    .container {
        background: yellow;
    }
</style>
