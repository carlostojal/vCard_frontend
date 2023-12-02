<script setup>
import { defineProps, ref } from 'vue';
import { useUsersStore } from '@/stores/users'
import router from '../router';
import { useToast } from 'vue-toastification'


const toast = useToast()
const usersStore = useUsersStore();
const newAdminPassword = ref(null)

const props = defineProps({
    newAdminName: {
        type: String,
        required: true
    },
    newAdminEmail: {
        type: String,
        required: true
    },
})

const addAdmin = async () => {
    let res = await usersStore.addUser(props.newAdminName, props.newAdminEmail, newAdminPassword.value)
    
    router.replace('/admins')

}

</script>

<template>

    <form @submit.prevent="addAdmin" class="mt-4">
      <div>
        <div class="margens">
          <label for="newAdminName">Name</label>
          <input type="text" v-model="props.newAdminName" class="form-control" id="newAdminName" readonly>
        </div>
        <div class="margens ">
          <label for="adminEmail">Email</label>
          <input type="email" v-model="props.newAdminEmail" class="form-control" id="adminEmail" readonly>
        </div>
        <div class="margens ">
          <label for="adminPassword">Email</label>
          <input type="password" v-model="newAdminPassword" class="form-control" id="adminPassword" placeholder="Enter password">
        </div>
      </div>
      <button type="submit" class="btn btn-primary margens">Add Admin</button>
        <br>
      <button @click="router.replace('/admins')" class="btn btn-secondary margens" style="margin-top: 2rem;">Admins List</button>

    </form>

</template>

<style scoped>
.margens{
    margin-bottom: 1rem;
    min-width: 25rem;
}
</style>