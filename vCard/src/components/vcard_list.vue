<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import { useVcardsStore } from '@/stores/vcards'
import { useToast } from 'vue-toastification'

const vcardsStore = useVcardsStore();
const toast = useToast()
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    blocked:{
        type: Number,
        required: true
    },
    balance:{
        type: String,
        required: true
    },
    max_debit:{
        type: String,
        required: true
    },
    showButton:{
        type: Boolean,
        default: false
    }
})

const atual_block = ref('')
const isChange = ref(false)
const old_block = ref('')
const editFlag = ref(false)
const editInputValue = ref('')

onMounted(() => {
    if(props.blocked == 1){
        atual_block.value = 1
    }else{
        atual_block.value = 0
    }
})

const changeBlock = () => {
    //CHANGE BLOCK

    old_block.value = atual_block.value

    if(atual_block.value == 1){
        atual_block.value = 0
    }else{
        atual_block.value = 1
    }

    //APLY BTN
    if(atual_block.value != old_block.value){
        isChange.value = true
    }else{
        isChange.value = false
    }
}

const applyChanges = async (phone_number, atual_block) => {
    //APPLY CHANGES
    console.log("APPLY CHANGES", phone_number, atual_block)
    isChange.value = false
    await vcardsStore.changeBlock(phone_number, atual_block)
}

const vcardDelete = async (phone_number) => {
    await vcardsStore.deleteVcard(phone_number)
}

//watch ao props.blocked para paginate
watch(() => props.blocked, (newValue) => {
    atual_block.value = newValue    
});

//watch a todas as linhas para quando paginate não acartar com o valor do novo block para a página seguinte
watch(() => props.phone, (newValue) => {
    isChange.value = false
    atual_block.value = props.blocked
});

const saveChanges = () => {
    if(editInputValue.value == null || editInputValue.value == ''){
        toast.error("Fill the max debit field")
        return
    }

    vcardsStore.editMaxDebit(props.phone, editInputValue.value)
    editFlag.value = false
    editInputValue.value = ''
}

</script>

<template>

    <tbody>
        <tr @mouseover="showButton = true" @mouseleave="showButton = false">
        <td>{{ props.name }}</td>
        <td>{{ props.phone }}</td>
        <td>{{ props.email }}</td>

        <td v-if="atual_block == 1"><button class="btn btn-warning buttons" @click="changeBlock" > Blocked </button></td>
        <td v-else><button class="btn btn-info buttons" @click="changeBlock"> Unblocked </button></td>
        
        <td>€{{ props.balance }}</td>
        <td>€{{ props.max_debit }}</td>

        <td style="text-align: center; vertical-align: middle;"> 
            <button class="btn btn-second" @click="editFlag = true"> <img src="public/icons/edit.png" alt="Edit" width="32" height="32"> </button>
        </td>
        
        <td v-if="isChange"> <button class="btn btn-second" @:click="applyChanges(props.phone, atual_block)"> Apply </button> </td>
        
        <td v-if="showButton && props.balance==0">
            <div class="d-flex align-items-center">
                <button class="btn btn-outline-danger" style="max-width: 10rem;" @click="vcardDelete(props.phone)">Delete</button>
            </div>
        </td>

<!-- POPUP EDIT -->
        <div v-if="editFlag">
            <div class="overlay" @click="editFlag = false"></div>
            <div class="popup">
                <h2>Edit Max Debit</h2>
                <label for="editInput">New value:</label>
                <input v-model="editInputValue" type="text" id="editInput">
                <button style="margin-bottom: 1rem;" @click="saveChanges">Save Changes</button>
                <button @click="editFlag = false">Cancel</button>
            </div>
        </div>

        </tr>
    </tbody>

</template>

<style scoped>
.overlay {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.popup {
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  flex-direction: column;

}

.popup label {
  display: block;
  margin-bottom: 10px;
}

.popup input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
}

.popup button {
  padding: 10px;
  border: none;
  cursor: pointer;
}
    .buttons { 
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}
</style>
