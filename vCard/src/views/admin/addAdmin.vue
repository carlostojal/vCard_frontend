<script setup>
import AdminForm from '@/components/adminForm.vue'
import Menu from '@/components/menu.vue'
import { ref, onMounted } from 'vue';
import { useUsersStore } from '@/stores/users'

const users = useUsersStore();
const admins = ref(null)
const newAdminName = ref(null)
const newAdminEmail = ref(null)

onMounted(async () => {
    await users.fetchAdmins()
    admins.value = users.admins

    let lastAdminId = parseInt(admins.value[admins.value.length-1].id)

    newAdminName.value = "Administrator " + (lastAdminId+1)
    newAdminEmail.value = "a" + (lastAdminId+1) + "@mail.pt"
})

</script>


<template>

    <Menu>  </Menu>

    <h2 class="container mt-5 d-flex justify-content-center">Add Admin</h2>
    <div class="container mt-5 d-flex justify-content-center">
            <AdminForm :newAdminName="newAdminName" :newAdminEmail="newAdminEmail"> </AdminForm>
    </div>


</template>


<style scoped>


</style>