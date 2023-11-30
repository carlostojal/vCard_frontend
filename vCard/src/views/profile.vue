<script setup>
import { ref, Transition } from 'vue';
import Menu from '../components/menu.vue'
import { useUserStore } from '@/stores/user';
import FormatUtil from '../utils/FormatUtil';

const user = useUserStore();

const showPasswordField = ref(false);
const showPinField = ref(false);
const newPassword = ref("");
const newPin = ref("");

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const editPhoneNumber = ref(false);
const editEmail = ref(false);
const editName = ref(false);

const toggleEditPhoneNumber = () => {
  editPhoneNumber.value = !editPhoneNumber.value;
};

const toggleEditEmail = () => {
  editEmail.value = !editEmail.value;
};


const changePassword = () => {
  // Logic for changing the password goes here
  // For now, let's just log the new password to the console
  console.log("New Password:", newPassword.value);
  // Optionally, you can reset the password field and hide it after changing the password
  newPassword.value = "";
  showPasswordField.value = false;
};
const changePin = () => {
  // Logic for changing the password goes here
  // For now, let's just log the new password to the console
  console.log("New Password:", newPin.value);
  // Optionally, you can reset the password field and hide it after changing the password
  newPin.value = "";
  showPinField.value = false;
};
</script>
<template>
  <Menu />
  <div class="user-profile">
    <div class="editable-field">
        <h3><label for="Name">Name:</label></h3>
        <div v-if="!editName">
          <span>{{ user.name }}</span>
          <span class="edit-icon" @click="editName = !editName">&#9998;</span>
        </div>
        <div v-else>
          <input type="text" id="phoneNumber" v-model="user.name" placeholder="Enter Name" />
          <span class="edit-icon" @click="editName = !editName">&#10004;</span>
        </div>
      </div>
    <div class="dropdown" v-show="showDropdown">
      <ul>
        <li @click="changeProfile">Change Profile</li>
        <li @click="logout">Logout</li>
      </ul>
    </div>
    <div class="profile-details">
      <div class="editable-field">
        <h3><label for="phoneNumber">Phone Number:</label></h3>
        <div v-if="!editPhoneNumber">
          <span>{{ user.phone }}</span>
          <span class="edit-icon" @click="toggleEditPhoneNumber">&#9998;</span>
        </div>
        <div v-else>
          <input type="number" id="phoneNumber" v-model="user.phone" placeholder="Enter phone number" />
          <span class="edit-icon" @click="toggleEditPhoneNumber">&#10004;</span>
        </div>
      </div>
      <div class="editable-field">
        <h3><label for="email">Email:</label></h3>
        <div v-if="!editEmail">
          <span>{{ user.email }}</span>
          <span class="edit-icon" @click="toggleEditEmail">&#9998;</span>
        </div>
        <div v-else>
          <input type="email" id="email" v-model="user.email" placeholder="Enter email" />
          <span class="edit-icon" @click="toggleEditEmail">&#10004;</span>
        </div>
      </div>
      <div class="password-change">
        <button class="button1" @click="showPasswordField = !showPasswordField">Change Password</button>
        <div :class="{ 'show': showPasswordField }" class="password-field-container">
          <label for="newPassword">New Password:</label>
          <input type="password" id="newPassword" v-model="newPassword" class="password-input"
            placeholder="Enter new password" />
          <button class="button1" @click="changePassword">Save</button>
        </div>
      </div>
      <div class="pin-change">
        <button class="button1" @click="showPinField = !showPinField">Change Pin</button>
        <div :class="{ 'show': showPinField }" class="password-field-container">
          <label for="newPin">New Password:</label>
          <input type="password" id="newPin" v-model="newPin" class="password-input" placeholder="Enter new password" />
          <button class="button1" @click="changePin">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  margin: -10px auto;
  border: 1px solid #ddd;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 20px;
}

.profile-header img {
  border-radius: 50%;
  margin-bottom: 10px;
}

.profile-details {
  margin-top: 30px;
}

.button1 {
  cursor: pointer;
  background: #3498db;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-top: 10px;
}

.button2 {
  cursor: pointer;
  background: #3498db;
  color: #fff;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 10px;
}

.password-change {
  margin-top: 20px;
}

.password-change button {
  cursor: pointer;
}

.password-field-container {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.password-field-container.show {
  max-height: 200px;
  /* Adjust to the desired height */
}

.password-field-container label,
.password-field-container input,
.password-field-container button {
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.password-field-container.show label,
.password-field-container.show input,
.password-field-container.show button {
  opacity: 1;
  transform: translateY(0);
}

.password-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.editable-field {
  display: flex;
  flex-direction: column; /* Align children in a vertical column */
  margin-bottom: 15px;
}

.editable-field label {
  margin-bottom: 5px;
}

.editable-field span,
.editable-field input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  min-width: 100px; /* Set a minimum width to prevent collapsing */
}

.edit-icon {
  cursor: pointer;
  margin-top: 5px; /* Add spacing between the input and edit icon */
  margin-left: 5px;
  font-size: 18px;
}
</style>
  