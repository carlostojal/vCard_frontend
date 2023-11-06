<script setup>
import { ref, watch, onMounted } from 'vue'
import Menu from '../components/menu.vue'
import axios from 'axios'
import ConfigUtil from '../utils/ConfigUtil';

const flag_msgInvalid = ref(false)
const msgInvalid = ref('')
const vcard = ref({
    name: '',
    email: '',
    phone_number: '',
    photo_url: '',
    password: '',
    confirmation_code: ''
})


const validate_fields = async () => {

    if(vcard.value.name != '' && vcard.value.email != '' && vcard.value.phone_number != '' && vcard.value.password != '' && vcard.value.confirmation_code != ''){
        flag_msgInvalid.value = false
        
        console.log(vcard.value)
        const response = await axios.post(`${ConfigUtil.getApiUrl()}/vcards`,
        {
            vcard
        })
            
        
    }else{
        msgInvalid.value = 'Please fill in all fields'
        flag_msgInvalid.value = true
    }  
    return 
}


function handlePhotoUpload(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile){ //Se n houver ficheiro selecionado
        vcard.value.photo_url = null
    }else if(selectedFile.type.match('image/*')){ //Se o ficheiro selecionado for uma imagem
        vcard.value.photo = selectedFile;
    }else{
        msgInvalid.value = 'Please select a valid photo'
        flag_msgInvalid.value = true
    }
    return 
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
                <input v-model="vcard.phone_number" type="text" class="form-control" placeholder="Enter your Phone Number">
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
            <div class="mb-3">
                <label class="form-label">Pin to VCard</label>
                <input v-model="vcard.confirmation_code" type="text" class="form-control" placeholder="Enter your pin">
            </div>

            <button @:click="validate_fields" type="button" class="btn btn-primary">Create</button>

            
        </form>
    </div>

</template>




<style scoped>



</style>