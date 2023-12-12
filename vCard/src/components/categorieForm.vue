<script setup>
import { ref } from 'vue';
import router from '../router';
import { useCategoriesStore } from '@/stores/categories'
import { useToast } from 'vue-toastification';

const categoriesStore = useCategoriesStore();
const name = ref(null)
const type = ref(null)
const toast = useToast()

const addCategory = async () => {

    if(name.value == null || type.value == null){
        toast.error('Fill all the fields')
        return
    }

    await categoriesStore.addCategorie(name.value, type.value)
    
    router.replace('/allCategories')
}

</script>

<template>

    <form @submit.prevent="addCategory" class="mt-4">
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
      
      <button type="submit" class="btn btn-primary margens">Add Category</button>
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