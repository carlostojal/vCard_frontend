<script setup>
import { onMounted, ref } from 'vue';
import Menu from '@/components/menu.vue'
import { useUsersStore } from '@/stores/users'
import User from '@/components/user.vue'

const users = useUsersStore();
const admins = ref(null)


onMounted(async () => {
    await users.fetchAdmins()
    admins.value = users.admins
})

</script>


<template>
<Menu> </Menu>
    <div class="container">
        <div class="row justify-content-center">
            <div style="margin-top:3rem" >
                <h2 class="margens">Admins</h2>
            </div>

            <div class="transactions">
                <div class="transactions-list">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Criado</th>
                            <th scope="col">Alterado</th>
                            </tr>
                        </thead>
                        
                        <User v-for="admin in admins" @getAdmins="admins = users.admins" :id="admin.id" :showButton="showButton" :name="admin.name" :email="admin.email" :created_at="admin.created_at.slice(0,10)" :updated_at="admin.updated_at.slice(0,10)"/>
                        
                    </table>

                    <router-link class="btn btn-outline-secondary addAdmin" to="/addAdmin">Add Admin </router-link>

                </div>
            </div>

        </div>
    </div>
</template>


<style scoped>
.addAdmin{
    max-width: 10rem;
    margin-right: auto;
    margin-top: 2rem;
}
.margens{
    margin-bottom: 2rem;
}
</style>