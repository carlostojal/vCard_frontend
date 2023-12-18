<script setup>
import { onMounted, ref } from 'vue';
import { useUsersStore } from '@/stores/users'
import Menu from '@/components/menu.vue'
import User from '@/components/user.vue'
import Paginate from '@/components/paginate.vue'

const users = useUsersStore();

onMounted(async () => {
    await users.fetchAdmins(null)
})

</script>


<template>

    <Menu> </Menu>

    <div class="container">
        <div class="row justify-content-center">

            <div style="margin-top:3rem" >
                <h2 class="margens">Administrators</h2>
            </div>

            <div class="transactions">
                <div class="transactions-list">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Created</th>
                            <th scope="col">Updated</th>
                            </tr>
                        </thead>
                        
                        <User v-for="admin in users.admins" @getAdmins="admins = users.admins" :id="admin.id" :showButton="showButton" :name="admin.name" :email="admin.email" :created_at="admin.created_at.slice(0,10)" :updated_at="admin.updated_at.slice(0,10)"/>
                        
                    </table>

                    <Paginate v-if="users.lastPage > 1" :type="'admins'" :totalPages="users.lastPage" :currentPage="1"> </Paginate>

                    <div class="d-flex justify-content-center">
                        <router-link class="btn btn-outline-secondary addAdmin" to="/addAdmin">Add Administrator </router-link>
                    </div>
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
