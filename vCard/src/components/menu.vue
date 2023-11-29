<script setup>
    import { ref } from 'vue';
    import { useUserStore } from '@/stores/user'
    const userStore = useUserStore(); 
    const isAuthenticated = ref(false);
    isAuthenticated.value = userStore.token != null;
</script>


<template>
    <nav v-show="!isAuthenticated" class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
                <a class="navbar-brand" href="./home">VCard</a>
        </div>
    </nav>

    <nav v-show="isAuthenticated" class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" to="home" >VCard</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="home">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="register">Register</router-link>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Services</a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link to="/transfer" class="dropdown-item">Transfer Money</router-link>
                            <router-link to="/transactions" class="dropdown-item">Transactions List</router-link>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">ADMIN</a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link to="/admins" class="dropdown-item">Admin List</router-link>
                        </ul>
                    </li>

                    <li  class="nav-item" id="logoutBtn" >
                        <a class="nav-link logout" @:click="userStore.logout()" >Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>



<style scoped>
    router-link {
        text-decoration: none;
    }
    .logout{
        cursor: pointer;
    }
</style>
