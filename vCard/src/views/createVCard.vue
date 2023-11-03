<script setup>
import { ref, watch, onMounted } from 'vue'
import Menu from '../components/menu.vue'

const flag_msgInvalid = ref(false)
const msgInvalid = ref('')
const flag_ValidateEmail = ref(false)
const vcard = ref({
    name: '',
    email: '',
    phone: '',
    photo: '',
    password: '',
    pin: ''
})


const validate_fields = () => {

    if(vcard.value.name != '' && vcard.value.email != '' && vcard.value.phone != '' && vcard.value.password != ''){
        flag_ValidateEmail.value = true
        flag_msgInvalid.value = false
        return true
    }

    msgInvalid.value = 'Please fill in all fields'
    flag_msgInvalid.value = true
    return false
}

const validate_email = () => {

    if(validate_fields() && vcard.value.pin != ''){
        
        //post para validar email no server e se sim criar vcard

    }else{
        msgInvalid.value = 'Please fill in all fields'
        flag_msgInvalid.value = true
    }
}

function handlePhotoUpload(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.match('image/*')) {
        vcard.value.photo = selectedFile;
        return 
    }
    msgInvalid.value = 'Please select a valid photo'
    flag_msgInvalid.value = true
}

</script>




<template>

    <Menu> </Menu>

    <div class="container mt-5">
        <h2 class="mb-4">Create a VCard</h2>
        <form>

            <div v-if="flag_msgInvalid" class="alert alert-danger" role="alert">
                {{ msgInvalid }}
            </div>

            <div class="mb-3">
                <label class="form-label">Name</label>
                <input v-model="vcard.name" type="text" class="form-control" placeholder="Enter your Name">
            </div>
            <div class="mb-3">
                <label class="form-label">E-mail</label>
                <input v-model="vcard.email" type="text" class="form-control" placeholder="Enter your E-mail">
            </div>
            <div class="mb-3">
                <label class="form-label">Phone Number</label>
                <input v-model="vcard.phone" type="text" class="form-control" placeholder="Enter your Phone Number">
            </div>
            <div class="mb-3">
                <label class="form-label">Photo</label>
                <input @change="handlePhotoUpload" type="file" class="form-control" placeholder="Enter your name">
                <div class="form-text">Optional</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="vcard.password" type="password" class="form-control" placeholder="Enter your password">
            </div>

            <button @:click="validate_fields" type="button" class="btn btn-primary">Create</button>

            <div style="margin-top: 50px;" v-if="flag_ValidateEmail">
                <h4 class="mb-4">Validate e-mail</h4>
                <div class="form-outline mb-4">
                    <label class="form-label">PIN</label>
                    <input v-model="vcard.pin" style="border-width: 2px; border-color: black;" class="form-control" />
                </div>
                <button @:click="validate_email" type="button" class="btn btn-primary btn-block mb-4">Validate</button>
            </div>
        </form>
    </div>

</template>




<style scoped>



</style>