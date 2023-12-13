<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user'
import { useTransactionsStore } from '@/stores/transactions'
const userStore = useUserStore();
const transactionsStore = useTransactionsStore();
const isAuthenticated = ref(false);
isAuthenticated.value = userStore.token != null;

const extractPDF = async () => {
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    await transactionsStore.extractPDF(month, year);
}

</script>


<template>
    <nav v-show="!isAuthenticated" class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="./home">VCard</a>
        </div>
    </nav>

    <nav v-show="isAuthenticated" class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="nav-item mx-2"></div>
        <div class="container-fluid">
            <router-link class="navbar-brand" to="home">VCard</router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="home">Home</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Services</a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link to="/transfer" class="dropdown-item">Transfer Money</router-link>
                            <router-link to="/myTransactions" class="dropdown-item">Transactions List</router-link>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">ADMIN</a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link to="/admins" class="dropdown-item">Admins</router-link>
                            <router-link to="/vcards" class="dropdown-item">VCards</router-link>
                            <router-link to="/allTransactions" class="dropdown-item">Transactions</router-link>
                            <router-link to="/allCategories" class="dropdown-item">Categories</router-link>
                            <router-link to="/addAdmin" class="dropdown-item">Add Admin</router-link>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" @:click="extractPDF">Monthly Extract </a>
                    </li>

                </ul>
                     <div class="nav-item dropdown">
                        <!-- <img v-if="userStore.avatar" :src="userStore.avatar" alt="User Avatar" class="avatar " /> -->
                        <!-- <img v-else src="/src/assets/avatar.png" alt="User Avatar" class="avatar" /> -->
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img v-if="userStore.avatar" :src="userStore.avatar" alt="User Avatar" class="avatar " />
                            <img v-else src="/src/assets/avatar.png" alt="User Avatar" class="avatar" />
                        </a>
                        <!-- <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{FormatUtil.formatFirstLastName(userStore.name)}}</a> -->
                        <ul class="dropdown-menu" id="profileToggle" aria-labelledby="navbarDropdown">
                             <router-link class="dropdown-item" to="profile">Change Profile</router-link> 
                            <button @:click="userStore.logout()" class="dropdown-item">Logout</button>
                        </ul>
                    </div>
                <div class="nav-item mx-4"></div>
            </div>
        </div>
    </nav>
</template>


<style scoped>
.dropdown-menu-right {
   right: 0 !important;
   left: auto !important;
}
@media (min-width: 991px) {
    #profileToggle {
        right: 0 !important;
        left: auto !important;
    }   
}


.user-profile-dropdown {
  position: relative;
  display: inline-block;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.dropdown-content {
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #f9f9f9;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;
}

.dropdown-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-content li {
  padding: 8px;
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
<style scoped>
router-link {
    text-decoration: none;
}

.logout {
    cursor: pointer;
}
</style>
