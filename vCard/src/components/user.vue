<script setup>
import { defineProps, ref } from 'vue';
import { useUsersStore } from '@/stores/users'

const showButton = ref(false)

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    id:{
        type: Number,
        required: true
    },
    created_at:{
        type: String,
        required: true
    },
    updated_at:{
        type: String,
        required: true
    },
    showButton:{
        type: Boolean,
        default: false
    }
})


const emit = defineEmits(['getAdmins']);

const userStore = useUsersStore();

const adminDelete = async (id) => {
    console.log(id)

    await userStore.deleteAdmin(id)
    await userStore.fetchAdmins()
    emit('getAdmins', true)
}


</script>

<template>

<tbody>
  <tr @mouseover="showButton = true" @mouseleave="showButton = false">
    <th scope="row">{{ props.id }}</th>
    <td>
      <div class="d-flex align-items-center">
        {{ props.name }}
      </div>
    </td>
    <td>
      <div class="d-flex align-items-center">
        {{ props.email }}
      </div>
    </td>
    <td>
      <div class="d-flex align-items-center">
        {{ props.created_at }}
      </div>
    </td>
    <td>
      <div class="d-flex align-items-center">
        {{ props.updated_at }}
      </div>
    </td>
    <td v-if="showButton">
      <div class="d-flex align-items-center">
        <button class="btn btn-outline-danger" style="max-width: 10rem;" @click="adminDelete(props.id)">Delete</button>
      </div>
    </td>
  </tr>
</tbody>


</template>

<style scoped>

</style>
