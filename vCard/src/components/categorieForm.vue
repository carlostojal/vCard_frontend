<script setup>
import { ref } from 'vue';
import router from '../router';
import { useToast } from 'vue-toastification'
import { useCategoriesStore } from '@/stores/categories'

const toast = useToast()
const categoriesStore = useCategoriesStore();
const name = ref(null)
const type = ref(null)

const addAdmin = async () => {

    if(name.value == null || type.value == null){
        toast.error('Fill all the fields')
        return
    }

    await categoriesStore.addCategorie(name.value, type.value)
    
    toast.success('Categorie added successfully')

    router.replace('/allCategories')

}

</script>

<template>

    <form @submit.prevent="addAdmin" class="mt-4">
      <div>
        <div class="margens ">
          <label for="name">Name</label>
          <input type="text" v-model="name" class="form-control" id="name" placeholder="Enter name">
        </div>
        <div class="margens">
            <label for="type">Type</label>
            <select v-model="type" class="form-control" id="type">
                <option value="D">Debit</option>
                <option value="C">Credit</option>
            </select>
        </div>

      </div>
      <button type="submit" class="btn btn-primary margens">Add Categorie</button>
        <br>
      <button @click="router.replace('/allCategories')" class="btn btn-secondary margens" style="margin-top: 2rem;">Categories List</button>

    </form>

</template>

<style scoped>
.margens{
    margin-bottom: 1rem;
    min-width: 25rem;
}
</style>