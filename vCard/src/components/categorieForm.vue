<script setup>
import { ref } from 'vue';
import router from '../router';
import { useCategoriesStore } from '@/stores/categories'
import { useToast } from 'vue-toastification';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
const categoriesStore = useCategoriesStore();
const name = ref(null)
const type = ref(null)
const toast = useToast()

const addCategory = async () => {

    if(name.value == null || type.value == null){
        toast.error('Fill all the fields')
        return
    }

    if(userStore.isAdmin){
      await categoriesStore.addCategorie(name.value, type.value)
      router.replace('/allCategories')
    }else{
      await categoriesStore.addMyCategorie(name.value, type.value)
      router.replace('/myCategories')
    }
        
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
      
      <button v-if="userStore.isAdmin" @click="router.replace('/allCategories')" class="btn btn-secondary margens" style="margin-top: 2rem;">Categories List</button>
      <button v-else @click="router.replace('/myCategories')" class="btn btn-secondary margens" style="margin-top: 2rem;">Categories List</button>

    </form>

</template>

<style scoped>
.margens{
    margin-bottom: 1rem;
    min-width: 25rem;
}
</style>