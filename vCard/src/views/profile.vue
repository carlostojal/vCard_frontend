<script setup>
import { ref, onMounted } from 'vue';
import Menu from '../components/menu.vue'
import { useUserStore } from '@/stores/user';
import FormatUtil from '../utils/FormatUtil';
import router from '../router';
import { useToast } from 'vue-toastification'

const user = useUserStore();



const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const toast = useToast();
const editEmail = ref(false);
const editName = ref(false);
const newPhoneNumber = ref("");
const newEmail = ref("");
const newName = ref("");

const oldPassword = ref("");
const oldPin = ref("");
const newPassword = ref("");
const newPin = ref("");

onMounted(() => {
    newName.value = user.name;
    newPhoneNumber.value = user.phone;
    newEmail.value = user.email;
});

const save_newName = async () => {
  console.log("New Name:", newName.value);

  await user.changeName(user.phone, newName.value);
  editName.value = !editName.value;
};

const save_newEmail = async () => {
  console.log("New Email:", newEmail.value);

  await user.changeEmail(user.phone, newEmail.value);
  editEmail.value = !editEmail.value;
};

const verifyOldPassword = async () => {
  
  const response = await user.verifyPassword(oldPassword.value);

  if(newPassword.value == ''){
    toast.error("Please enter new password");
  }else{
    if(response){
    user.updatePassword(user.phone, newPassword.value, oldPassword.value);
    router.replace('/home');
    }
  }
  
};

const verifyOldPin = async () => {

  const response = await user.verifyPin(oldPin.value);
  console.log(newPin.value)
  if(newPin.value == ''){
    toast.error("Please enter new password");
  }else{
    if(response){
      user.updatePin(user.phone ,newPassword.value, oldPassword.value);
    }
  }
};

</script>
<template>
  <Menu />
  <div class="user-profile">
    <div class="editable-field">
        <h3><label for="Name">Name:</label></h3>

        <div v-if="!editName">
          <span>{{ newName }}</span>
          <span class="edit-icon" @click="editName = !editName">&#9998;</span>
        </div>
        <div v-else>
          <input type="text" id="phoneNumber" v-model="newName" placeholder="Enter Name" />
          <span class="edit-icon" @click="save_newName">&#10004;</span>
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
        <h3><label for="email">Email:</label></h3>

        <div v-if="!editEmail">
          <span>{{ newEmail }}</span>
          <span class="edit-icon" @click="editEmail = !editEmail;">&#9998;</span>
        </div>
        <div v-else>
          <input type="email" id="email" v-model="newEmail" placeholder="Enter email" />
          <span class="edit-icon" @click="save_newEmail">&#10004;</span>
        </div>
        
      </div>

      <div class="password-change" style="margin-top:2rem">
            <h3><label>Change Password</label></h3>
          
            <label>Old Password:</label>
            <input type="password" v-model="oldPassword" class="password-input" placeholder="Enter old password" />
          
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" v-model="newPassword" class="password-input" placeholder="Enter new password" />

            <button class="button1" @click="verifyOldPassword">Save</button>
          
      </div>

      <div class="pin-change" style="margin-top:2rem">
          <h3><label>Change Pin</label></h3>

          <label>Old Pin:</label>
          <input type="password" v-model="oldPin" class="password-input" placeholder="Enter old pin" />

          <label for="newPin">New Pin:</label>
          <input type="password" id="newPin" v-model="newPin" class="password-input" placeholder="Enter new pin" />

          <button class="button1" @click="verifyOldPin">Save</button>
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
  