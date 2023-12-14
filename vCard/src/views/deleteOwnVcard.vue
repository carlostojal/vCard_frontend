<script setup>
import router from '../router';
import Menu from '@/components/menu.vue'
import { ref } from 'vue';
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const isPasswordCorrect = ref(false)
const password = ref(null)
const pin = ref(null)

const verifyPassword = async () => {
    const res = await user.verifyPassword(password.value)
    if(res){
        isPasswordCorrect.value = true
    }
}

const verifyPin = async () => {
    const res = await user.verifyPin(pin.value)
    if(res){
        deleteOwnVcard()
    }
}

const deleteOwnVcard = async () => {
    await user.deleteOwnVcard(password.value, pin.value)
    router.replace('/login')
}

</script>


<template>

    <Menu>  </Menu>

    <h2 class="container mt-5 d-flex justify-content-center">Delete Vcard</h2>

    <div class="container mt-5 d-flex justify-content-center">

        <form @submit.prevent="verifyPassword" class="mt-4 text-center">
            <div>
                <div class="margens">
                    <label>Password</label>
                    <input type="password" v-model="password" class="form-control" >
                </div>
            </div>

            <button v-if="!isPasswordCorrect" type="submit" class="btn btn-warning margens">DELETE</button>
        </form>
    </div>
    
    <div class="container mt-5 d-flex justify-content-center">
        <form v-show="isPasswordCorrect" @submit.prevent="verifyPin" class="mt-4 text-center">
            <div>
                <div class="margens">
                    <label>Pin</label>
                    <input type="password" v-model="pin" class="form-control">
                </div>
            </div>

            <button type="submit" class="btn btn-warning margens">DELETE</button>
        </form>
    </div>



    


</template>

<style scoped>
    .margens {
        margin-bottom: 1rem;
    }
</style>