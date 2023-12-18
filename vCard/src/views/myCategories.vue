<script setup>
import Menu from '@/components/menu.vue'
import { onMounted } from 'vue';
import { useCategoriesStore } from '@/stores/categories'
import Categorie from '@/components/categorie.vue'
import Paginate from '@/components/paginate.vue'
import Search from '@/components/search.vue'

const categoriesStore = useCategoriesStore();

onMounted(async () => {
    await categoriesStore.fetchMyCategories()
})


</script>


<template>
<Menu> </Menu>
    <div class="container">
        <div class="row justify-content-center">
            <div style="margin-top:3rem" >
                <h2 class="margens">Categories</h2>
            </div>

            <div style="margin-top: 2rem; margin-bottom: 2rem;" class="d-flex">
                <router-link class="btn btn-outline-secondary" to="/addCategoryVcard">Add Categorie </router-link>
            </div>

            <div class="categories">
                <div class="categories-list">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Type</th>
                            </tr>
                        </thead>
                        
                        <Categorie v-for="categorie in categoriesStore.myCategories" :id="categorie.id" :name="categorie.name" :type="categorie.type" :isDefaultCategory="false" />
                        
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>


<style scoped>

.addCategorie{
    max-width: 10rem;
    margin-right: auto;
    margin-top: 2rem;
}
</style>