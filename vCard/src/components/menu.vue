<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user'
import FormatUtil from '../utils/FormatUtil'

const userStore = useUserStore();
const isAuthenticated = ref(false);
isAuthenticated.value = userStore.token != null;
const showDropdown = ref('');
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
</script>


<template>
    <nav v-show="!isAuthenticated" class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="./home">VCard</a>
        </div>
    </nav>

    <nav v-show="isAuthenticated" class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" to="home">VCard</router-link>
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
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Services</a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link to="/transfer" class="dropdown-item">Transfer Money</router-link>
                            <router-link to="/transactions" class="dropdown-item">Transactions List</router-link>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">ADMIN</a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link to="/admins" class="dropdown-item">Admin List</router-link>
                            <router-link to="/vcards" class="dropdown-item">VCard List</router-link>
                        </ul>
                    </li>

                    <li  class="nav-item" id="logoutBtn" >
                        <a class="nav-link logout" @:click="userStore.logout()" >Logout</a>
                    </li>
                </ul>
            </div>
            <div class="user-profile-dropdown">
    <div @click="toggleDropdown">
      <!--<img :src="user.avatar" alt="User Avatar" class="avatar" />-->
      <span>{{ FormatUtil.formatFirstLastName(userStore.name) }}</span>
    </div>
    <transition name="fade">
      <div v-if="showDropdown" class="dropdown-content">
        <!-- Dropdown content goes here -->
        <ul>
          <li @click="handleChangeProfile"><router-link class="nav-link" to="profile">Change Profile</router-link></li>
          <li class="nav-item" id="logoutBtn">
              <a class="nav-link logout" @:click="userStore.logout()">Logout</a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
  </div>
    </nav>
</template>


<style scoped>
/* Add your styles here */
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
