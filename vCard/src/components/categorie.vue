<script setup>
import { defineProps } from 'vue';
import { useCategoriesStore } from '@/stores/categories'

const categoriesStore = useCategoriesStore()
const props = defineProps({
    isDefaultCategory: {
        type: Boolean,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
})

const categoryDelete = async (id) => {
    if(props.isDefaultCategory){
        await categoriesStore.deleteCategorie(id)
        await categoriesStore.fetch()
    }else{
        await categoriesStore.deleteMyCategorie(id)
        await categoriesStore.fetchMyCategories()
    }
}

</script>

<template>

    <tbody>
    <tr>
        <th scope="row">{{ props.id }}</th>
        <td>
        <div class="d-flex align-items-center">
            {{ props.name }}
        </div>
        </td>
        <td>
        <div v-if="props.type == 'D'" class="d-flex align-items-center"> Debit </div>
        <div v-if="props.type == 'C'" class="d-flex align-items-center"> Credit </div>
        </td>
        <td>
            <div class="d-flex align-items-center">
                <button class="btn btn-outline-danger" style="max-width: 10rem;" @click="categoryDelete(props.id)">Delete</button>
            </div>
        </td>
    </tr>
    </tbody>


</template>

<style scoped>

</style>
