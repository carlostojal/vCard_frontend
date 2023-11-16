<script setup>
import axios from 'axios'

import Menu from '../components/menu.vue'
import ConfigUtil from '../utils/ConfigUtil'
import router from '../router'
import { ref, watch, onMounted } from 'vue'

import { useUserStore } from '@/stores/user'

const phone_number = ref('')
const password = ref('')
const url_home = ref('/home')

const msgInvalid = ref('')
const flag_msgInvalid = ref(false)

const userStore = useUserStore()

onMounted(() => {
  document.getElementById('loginForm').onsubmit = function (e) {
    e.preventDefault() // prevent refreshing the page
    login()
  }

  const login = async () => {
    if (phone_number.value != '' || password.value != '') {
      flag_msgInvalid.value = false

      //validar login
      try {
        const response = await axios.post(`${ConfigUtil.getApiUrl()}/vcards/login`, {
          phone_number: phone_number.value,
          password: password.value
        })

        console.log(response.data.status)
        if (response.data.status == 'success') {
          // login valido
          flag_msgInvalid.value = false
          //routing -> pagina inicial com os dados do user (USAR PINIA)
          console.log(response.data)
          userStore.name = 'Fred'
          // userStore.init("fake", 100, phone_number, response.data.access_token);
          // console.log(response.data[0].access_token)
          // router.go(url_home);
          router.replace(url_home.value)
        } else {
          // login invalido
          msgInvalid.value = 'Invalid credentials, ' + response.data.message
          flag_msgInvalid.value = true
        }
      } catch (error) {
        console.log(error)
        msgInvalid.value = error.response.data.message
        flag_msgInvalid.value = true
      }
    } else {
      flag_msgInvalid.value = true
      msgInvalid.value = 'Please fill in all fields'
    }
    return
  }
})
</script>

<template>
  <Menu> </Menu>

  <form id="loginForm">
    <div class="form-wrapper">
      <div v-if="flag_msgInvalid" class="alert alert-danger" role="alert">
        {{ msgInvalid }}
      </div>

      <h2 class="mb-4">LOGIN</h2>
      <div class="form-outline mb-4">
        <label class="form-label">Phone Number</label>
        <input
          v-model="phone_number"
          style="border-width: 2px; border-color: black"
          maxlength="9"
          id="form2Example1"
          class="form-control"
        />
      </div>

      <div class="form-outline mb-4">
        <label class="form-label">Password</label>
        <input
          v-model="password"
          style="border-width: 2px; border-color: black"
          type="password"
          id="form2Example2"
          class="form-control"
        />
      </div>

      <!-- TODO: handle the login as a form action, preventing the default -->
      <input type="submit" class="btn btn-primary btn-block mb-4" value="Login" />

      <div class="text-center">
        <p>Not a member? <a href="./register">Register</a></p>
        <!-- ROUTING -> to: /register -->
      </div>
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
