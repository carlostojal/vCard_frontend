<script setup>
import { ref } from 'vue'
import Menu from '../components/menu.vue'
import axios from 'axios'
import ConfigUtil from '../utils/ConfigUtil';
import { useToast } from 'vue-toastification'
import { useUserStore } from '@/stores/user'
import router from '../router';


const flag_msgInvalid = ref(false)
const msgInvalid = ref('')

const toast = useToast()
const user = useUserStore();

const vcard = ref({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmation_code: '',
})
const photo = ref(null)


const validation = () => {
    //se o phone_number nao comecar com 9
    if(vcard.value.phone_number[0] != 9){
        msgInvalid.value = 'The phone number must start with 9'
        flag_msgInvalid.value = true
        return false
    }

    //Se o pin != 4 digitos
    if(vcard.value.confirmation_code.length != 4){
        msgInvalid.value = 'The pin must have 4 digits'
        flag_msgInvalid.value = true
        return false 
    }

    //se o email nao for valido
    if(vcard.value.email.indexOf('@') == -1){
        msgInvalid.value = 'Invalid email'
        flag_msgInvalid.value = true
        return false
    }
}

const validate_fields = async () => {

    const isEmpty = Object.values(vcard.value).some(value => value === '');
    if(!isEmpty){
        flag_msgInvalid.value = false

        if(validation() != false){
            
            const response = await user.createVCard(vcard.value.name, vcard.value.email, vcard.value.phone_number, vcard.value.password, vcard.value.confirmation_code)
  
            if(response == 'success'){
                toast.success("VCard created successfully")
                flag_msgInvalid.value = false
                router.replace('/login')
            }


            /*
            if(response.data.status == "sucess"){
                flag_msgInvalid.value = false
                //routing -> pagina inicial com os dados do user (USAR PINIA)
            }else if(response.data.status == "error"){
                msgInvalid.value = response.data.message
                flag_msgInvalid.value = true 
            }
            */
        }
    }else{
        msgInvalid.value = 'Please fill in all fields'
        flag_msgInvalid.value = true
    }  
}


function handlePhotoUpload(event) {
    const selectedFile = event.target.files[0];

    if(selectedFile != null){
        if (selectedFile.type.match('image/*')){ //Se o ficheiro selecionado for uma imagem
            photo.value = selectedFile;
        }else{ 
            msgInvalid.value = 'Please select a valid photo'
            flag_msgInvalid.value = true
        }
    }
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

            <button @:click.prevent="validate_fields" type="button" class="btn btn-primary">Create</button>

            
        </form>
    </div>

</template>




<style scoped>



</style>