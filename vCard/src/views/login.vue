<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')

const msgInvalid = ref('')
const flag_msgInvalid = ref(false)

const login = async () => {
    console.log(email.value, password.value)

    if(email.value != '' || password.value != ''){
        flag_msgInvalid.value = false

        //validar login
        const response = await axios.post('http://localhost:80/api/login',
        {
            email: email.value,
            password: password.value
        })

        console.log(response.data.status)
        if(response.data.status == "sucess"){ // login valido
          flag_msgInvalid.value = false
          //routing -> pagina inicial com os dados do user (USAR PINIA)
          console.log(response.data)
        }else{ // login invalido
        msgInvalid.value = 'Invalid credentials'
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
    <form>
      <div class="form-wrapper">

        <div v-if="flag_msgInvalid" class="alert alert-danger" role="alert">
            {{ msgInvalid }}
        </div>

        <h2 class="mb-4">LOGIN</h2>
        <div class="form-outline mb-4">
          <label class="form-label">Email address</label>
          <input v-model="email" style="border-width: 2px; border-color: black;" id="form2Example1" class="form-control" />
        </div>

        <div class="form-outline mb-4">
          <label class="form-label">Password</label>
          <input v-model="password" style="border-width: 2px; border-color: black;" type="password" id="form2Example2" class="form-control" />
        </div>

        <button @click="login" type="button" class="btn btn-primary btn-block mb-4">Sign in</button>

        <div class="text-center">
          <p>Not a member? <a href="#!">Register</a></p> <!-- ROUTING -> to: /register -->
        </div>
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
