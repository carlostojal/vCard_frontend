<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Menu from '../components/menu.vue'
import ConfigUtil from '../utils/ConfigUtil';
import router from '../router';
import { useUserStore } from '@/stores/user'
import { useNotificationsStore } from '@/stores/notifications'

const userStore = useUserStore();
const email = ref('')
const password = ref('')
const url_home = ref('/admin/home')

const notificationsStore = useNotificationsStore();

const msgInvalid = ref('')
const flag_msgInvalid = ref(false)

const login = async () => {

    if(email.value != '' || password.value != ''){
        flag_msgInvalid.value = false

        try {
            const response = await axios.post(`${ConfigUtil.getApiUrl()}/users/login`,
            {
                email: email.value,
                password: password.value
            })
            if(response.data.status == "success"){ 
                flag_msgInvalid.value = false
                userStore.setToken(response.data.data.access_token)
                router.replace(url_home.value);
            }else{                 
                msgInvalid.value = 'Invalid credentials, '+response.data.message
                flag_msgInvalid.value = true
            }
        }catch(error) {
            flag_msgInvalid.value = true
            msgInvalid.value = error.response.data.message;
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
          <input v-model="email" style="border-width: 2px; border-color: black;" id="form2Example1" class="form-control" autocomplete="username" />
        </div>

        <div class="form-outline mb-4">
          <label class="form-label">Password</label>
          <input v-model="password" style="border-width: 2px; border-color: black;" type="password" id="form2Example2" class="form-control" autocomplete="current-password"/>
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
